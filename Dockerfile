# Use official Node.js LTS version
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json /app
RUN npm install

# Copy the rest of the application code
COPY . /app

# Expose the port that the app will run on
EXPOSE 3000

# Command to run the app
CMD ["npm", "start"]
