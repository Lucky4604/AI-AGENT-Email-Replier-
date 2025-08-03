import { ImapFlow } from "imapflow";
import { simpleParser } from "mailparser";

export async function fetchUnreadEmails() {
  const client = new ImapFlow({
    host: process.env.EMAIL_HOST || '',
    port: parseInt(process.env.EMAIL_PORT || ''),
    secure: true,
    auth: {
      user: process.env.EMAIL_USER || '',
      pass: process.env.EMAIL_PASSWORD 
    }
  });
console.log(process.env.EMAIL_HOST,process.env.EMAIL_PORT,process.env.EMAIL_USER,process.env.EMAIL_PASSWORD);
  try {
    await client.connect();
    console.log("Connected to email server");
    
    await client.mailboxOpen('INBOX');
    console.log("Mailbox opened");

    const unreadEmails: {
      count: number;
      subject: string;
      from: string;
      to: string;
      messageId: string;
      body: string;
      source: string;
      uid: number;
    }[] = [];

    let count = 0;

    console.log(`🔍 Fetching unread emails with seen: false filter...`);
    // Use a more specific query to avoid race conditions
    for await (let message of client.fetch({ seen: false }, {
      envelope: true,
      flags: true,
      source: true,
      uid: true,
    })) {
      console.log(`📧 Found message UID: ${message.uid}, flags: ${Array.from(message.flags || [])}`);
      // Double-check that the message is still unread
      if (!message.flags?.has('\\Seen') && message.envelope && message.source && message.uid) {
        count++;

        try {
          // Parse the raw message source to get body
          const parsed = await simpleParser(message.source);

          const emailData = {
            count: count,
            subject: parsed.subject || 'No Subject',
            from: parsed.from?.text || 'Unknown Sender',
            to: Array.isArray(parsed.to)
              ? parsed.to.map(addr => (addr as any).text || (addr as any).address || '').join(', ')
              : (parsed.to?.text || (parsed.to as any)?.address || 'Unknown Recipient'),
            messageId: parsed.messageId || 'No Message ID',
            body: parsed.text || 'No Body',
            uid: message.uid,
          };

          unreadEmails.push({ ...emailData, source: message.source.toString() });

          // Print email details
          console.log(`\n--- Unread Email #${count} (UID: ${message.uid}) ---`);
          console.log(`Subject: ${emailData.subject}`);
          console.log(`From: ${emailData.from}`);
          console.log(`To: ${emailData.to}`);
          console.log(`Message ID: ${emailData.messageId}`);
          console.log("Body=>", emailData.body?.replace(/\r?\n|\r/g, ' '));
        } catch (parseError) {
          console.error(`Error parsing email with UID ${message.uid}:`, parseError);
          // Still include the email but with basic info
          unreadEmails.push({
            count: count,
            subject: message.envelope.subject || 'No Subject',
            from: message.envelope.from?.[0]?.address || 'Unknown Sender',
            to: message.envelope.to?.[0]?.address || 'Unknown Recipient',
            messageId: message.envelope.messageId || 'No Message ID',
            body: 'Error parsing email body',
            source: message.source.toString(),
            uid: message.uid,
          });
        }
      }
    }

    console.log(`Total unread emails found: ${unreadEmails.length}`);
    return unreadEmails;
  } catch (error) {
    console.error('Error fetching unread emails:', error);
    throw error;
  } finally {
    try {
      await client.logout();
      console.log("Disconnected from email server");
    } catch (logoutError) {
      console.error('Error during logout:', logoutError);
    }
  }
}

export async function markEmailAsRead(uid: number) {
  const client = new ImapFlow({
    host: process.env.EMAIL_HOST || 'imap.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '993'),
    secure: true,
    auth: {
      user: process.env.EMAIL_USER || 'abhirajput6727@gmail.com',
      pass: process.env.EMAIL_PASSWORD || 'ujugdkfdegrsrphk' 
    }
  });

  try {
    console.log(`🔗 Connecting to mark email ${uid} as read...`);
    await client.connect();
    console.log(`📁 Opening INBOX to mark email ${uid} as read...`);
    await client.mailboxOpen('INBOX');
    
    // Mark the email as seen by adding the \Seen flag
    console.log(`🏷️ Adding \\Seen flag to email ${uid}...`);
    await client.messageFlagsAdd(uid, ['\\Seen']);
    console.log(`✅ Successfully marked email ${uid} as read`);
    
    // Wait a moment for Gmail to process the flag change
    console.log(`⏳ Waiting 2 seconds for Gmail to process flag change...`);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Verify the flag was set correctly
    console.log(`🔍 Verifying flag was set correctly...`);
    const message = await client.fetchOne(uid, { flags: true });
    if (message && typeof message !== 'boolean' && message.flags?.has('\\Seen')) {
      console.log(`✅ Verification successful - email ${uid} is marked as read`);
    } else {
      const flags = typeof message !== 'boolean' ? Array.from(message?.flags || []) : [];
      console.log(`⚠️ Warning - email ${uid} flags: ${flags}`);
    }
    
    await client.logout();
    console.log(`🔌 Disconnected after marking email ${uid} as read`);
  } catch (error) {
    console.error(`❌ Error marking email ${uid} as read:`, error);
    throw error; // Re-throw to let caller handle it
  }
}
