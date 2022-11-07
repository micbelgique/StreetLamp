FROM node:alpine
WORKDIR /app
COPY package.json /app
COPY package-lock.json /app
COPY . /app
RUN npm i
EXPOSE 3000
CMD ["npm", "run", "start"]