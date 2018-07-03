FROM node:carbon

# Create app directory
WORKDIR /usr/src/greenhouse-controller-web

# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY yarn.lock ./

RUN yarn install --quiet
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

