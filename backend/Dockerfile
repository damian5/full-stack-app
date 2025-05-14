FROM node:20
WORKDIR /backend
COPY . .
RUN npm i
ENV SQLITE_DB_PATH=/app/queries.db
CMD ["npm", "run", "dev"]
