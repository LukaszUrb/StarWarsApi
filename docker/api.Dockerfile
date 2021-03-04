# Build Stage 1
FROM node:10.15.2-alpine AS appbuild
WORKDIR /opt/app/api
COPY ["./api/package.json", "./api/package-lock.json*", "./api/tsconfig.json", "./"]
RUN npm install
COPY ./api/src ./src/
RUN npm run build

# Build Stage 2
FROM node:10.15.2-alpine
WORKDIR /opt/app/api
COPY ["./api/package.json", "./api/package-lock.json*", "./"]
RUN npm install --only=production 
RUN npm install pm2 -g
COPY ./api/.env ./
COPY --from=appbuild /opt/app/api/dist ./dist/
WORKDIR /opt/app/api/dist
CMD ["pm2-runtime", "index.js"]