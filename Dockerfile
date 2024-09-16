# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# OPTIONAL: Debugging steps
RUN ls -la /usr/src/app  # Check if files are copied correctly
RUN npm --version        # Ensure npm is installed
RUN node --version       # Ensure Node.js is installed

# Run the build (make sure there's a "build" script in package.json)
RUN npm run build || echo "Skipping build, no build script found"

# Expose the port the app runs on
EXPOSE 3001


# Start the app
CMD ["node", "server.js"]

RUN ls -al

RUN npm --version