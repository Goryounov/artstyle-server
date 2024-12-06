FROM node:18-alpine AS build

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

FROM node:18-alpine AS production

WORKDIR /app

COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist

RUN npm install --only=production

EXPOSE 8000

CMD ["npm", "run", "start:prod"]

