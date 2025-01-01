FROM node:18-alpine As development

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

USER node

COPY package*.json ./

RUN npm ci

COPY --chown=node:node . .

EXPOSE 5173

CMD [ "npm", "run", "dev" ]