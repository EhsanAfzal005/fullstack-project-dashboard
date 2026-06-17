FROM node:18-bullseye-slim

WORKDIR /app

# Copy the backend code
COPY backend ./backend

# Set working directory to the backend folder
WORKDIR /app/backend

# Install dependencies
RUN npm install

# Expose the application port
EXPOSE 5000

# Start the backend server
CMD ["npm", "start"]
