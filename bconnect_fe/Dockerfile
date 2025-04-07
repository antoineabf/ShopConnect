# Use an official Node.js runtime as a parent image
FROM node:14-alpine as build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React app for production
RUN npm run build

# Use Nginx as the web server for serving the React app
FROM nginx:alpine

# Copy the build output from the previous stage to the NGINX HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port the NGINX server listens on
EXPOSE 80

# Command to run NGINX
CMD ["nginx", "-g", "daemon off;"]
