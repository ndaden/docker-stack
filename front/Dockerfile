FROM node:13.13-alpine3.10
EXPOSE 9090
ENV NODE_ENV development

RUN mkdir -p /opt/react_app && chown node:node /opt/react_app
WORKDIR /opt/react_app

USER node
COPY package*.json ./
RUN npm install --no-optional && npm cache clean --force
COPY . .
CMD [ "npm", "start" ]