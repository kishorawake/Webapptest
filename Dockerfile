# Use Node.js LTS base image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the app source
COPY . .

# Ensure Azure can assign the listening port
ENV PORT=3000

# Expose the correct port
EXPOSE 3000

# Start the app — Azure will respect this CMD
CMD ["npm", "start"]
