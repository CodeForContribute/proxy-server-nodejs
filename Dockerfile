# use the official node.js image from docker hub
FROM node:20-alpine

#Create and change to the app directory
WORKDIR /app

# copy application dependency manifests to the container image
COPY package*.json ./

# Install dependencies
RUN npm install

#Copy the local code to the container image
COPY . .

#Expose port 3000
EXPOSE  3000

#Run the app
CMD ["node","index.js"]