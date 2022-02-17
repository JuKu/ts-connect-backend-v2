FROM node:17-alpine3.15 AS development

# Update npm
RUN npm install -g npm@latest
RUN npm install -g rimraf
RUN npm install -g @nestjs/cli

# see also: https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install --only=development
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# build and transpile to dist directory
RUN npm run build

FROM node:17-alpine3.15 AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ARG APP_TYPE=web-api
ENV APP_TYPE=${APP_TYPE}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

RUN chmod -R 777 /usr/src/app/logs

VOLUME ["/usr/src/app/config"]
VOLUME ["/usr/src/app/logs"]
VOLUME["/config"]
VOLUME["/logs"]

EXPOSE 3000

#CMD [ "npm", "run", "start-prod" ]
CMD ["node", "dist/main"]
