FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install -g npm@11.4.2

RUN npm cache clean --force

RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY package.json package-lock.json ./

EXPOSE 3000

ENV NODE_ENV=production

CMD ["npm", "run", "start:prod"]

FROM build AS test

WORKDIR /app

CMD ["npm", "run", "test"]