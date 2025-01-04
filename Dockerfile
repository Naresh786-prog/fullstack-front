FROM node:18-alpine
WORKDIR /app
COPY package.jshon package-locl-json ./
COPY . .
RUN npm run build
EXPOSE 3000