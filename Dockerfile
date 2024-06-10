FROM node:20 as deps
WORKDIR /app
ENV NODE_ENV=production
COPY . .
RUN apt-get update \
  && apt-get install default-jre -y
RUN npm ci --only=production

FROM node:20 as builder
WORKDIR /app
COPY package*.json ./
COPY . .
RUN apt-get update \
  && apt-get install default-jre -y
RUN npm ci
RUN npm run build -w packages/backend

FROM node:20
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/packages/backend/dist ./packages/backend/dist
COPY --from=builder /app/packages/database ./packages/database
COPY --from=builder /app/packages/backend/package.json ./packages/backend/package.json
COPY --from=builder /app/package.json ./package.json
EXPOSE 8080
RUN npx -w packages/database prisma migrate deploy
CMD ["npm", "run", "start:prod", "-w", "packages/backend"]
