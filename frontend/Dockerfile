FROM node:23
WORKDIR /frontend
COPY package*.json .
RUN npm i
COPY . .
CMD ["npm", "run", "dev"]
