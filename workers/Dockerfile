FROM node:13.13-alpine3.10
EXPOSE 3001
ENV NODE_ENV development
RUN npm install -g webpack
RUN mkdir -p /opt/worker_app && chown node:node /opt/worker_app
WORKDIR /opt/worker_app

#USER node
COPY package*.json ./
RUN npm install --no-optional && npm cache clean --force
COPY . .
CMD [ "npm", "start" ]