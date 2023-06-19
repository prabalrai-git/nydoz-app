FROM node:19

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Build the React app
RUN npm run build

ENV NODE_ENV=production

EXPOSE 4200

CMD [ "npm", "start" ]



