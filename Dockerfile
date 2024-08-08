# Use the official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package.json ./
COPY .env ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React application
RUN npm run build

# Install a simple HTTP server to serve the static files
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["serve", "-s", "build"]

# Explanation:
  ##  Base Image: We use the official Node.js image with version 18.
  ##  Working Directory: The working directory inside the container is set to /usr/src/app.
  ##  Copy Dependencies: package.json and .env are copied to the working directory.
  ##  Install Dependencies: Dependencies are installed using npm install.
  ##  Copy Application Code: The rest of the application code is copied to the working directory.
  ##  Build Application: The React application is built using npm run build.
  ##  Install Serve: A simple HTTP server (serve) is installed globally to serve the static files.
  ##  Expose Port: The port 3000 is exposed for the application.
  ##  Run Application: The serve command is used to serve the built application.