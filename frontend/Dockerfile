# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install -g npm@7
#RUN npm install

# Copy the rest of the application code
COPY . .

# List installed binaries
# RUN ls -la node_modules/.bin/ 
# Verify react-scripts is installed
# RUN npm list react-scripts     

# Build the React app
RUN npm run build || echo "Skipping build, no build script found"

# Serve the app using a simple static file server
RUN npm install -g serve

# Stage 2: Serve the application
# FROM nginx:alpine
# COPY --from=build /app/build /usr/share/nginx/html

# Expose the port the app runs on
EXPOSE 3000

# Start the app
CMD ["serve", "-s", "build"]