FROM node:20 as deps
RUN apt-get update \
  && apt-get install default-jre -y
ENV NODE_ENV=production
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build -w packages/backend
EXPOSE 8080
CMD ["npm", "run", "start:prod", "-w", "packages/backend"]
