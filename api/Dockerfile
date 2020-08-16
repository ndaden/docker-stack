FROM node:13.13-alpine3.10
EXPOSE 3000
ENV NODE_ENV development
RUN npm install -g webpack
RUN mkdir -p /opt/node_app && chown node:node /opt/node_app
WORKDIR /opt/node_app

#USER node
COPY package*.json ./
RUN npm install --no-optional && npm cache clean --force
COPY . .
CMD [ "npm", "start" ]