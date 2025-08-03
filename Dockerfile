# Use Node.js base image
FROM node:22

# Create app directory
WORKDIR /app

# Copy only package.json and lock file first (better cache)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port NestJS runs on
EXPOSE 3000

# Run the NestJS application
CMD ["npm", "run", "start:dev"]