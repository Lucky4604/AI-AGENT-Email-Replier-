
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GeminiService {
    private genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

    async generateResponse(subject: string, body: string): Promise<string> {
        const model = this.genAI.getGenerativeModel({
             model: "gemini-2.0-flash" ,
             generationConfig:{
                maxOutputTokens:1000,
                temperature: 0.7,
                topP: 0.8,
                topK: 40,
             }
            })

const prompt = `You are writing a professional email reply that will be sent as plain text. Follow these rules:

EMAIL TO REPLY TO:
Subject: ${subject}
Body: ${body}

FORMATTING RULES:
- Write in plain text format only
- No markdown, no asterisks, no special formatting
- Use simple dashes (-) for lists, not asterisks
- No bold or italic formatting
- Keep sentences natural and flowing

Write a professional email reply with greeting, main content, and closing:`;

        try {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            
            // Log the full response to debug
            // console.log('Full Gemini response:', response.text());
            return response.text();
        } catch (error) {
            console.error('Error generating response:', error);
            throw error;
        }
    }
}