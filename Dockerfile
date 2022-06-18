FROM node:18-alpine3.15 AS development

WORKDIR /app

ADD package.json /app/package.json

RUN npm config set registry http://registry.npmjs.org

RUN npm install

ADD . /app

EXPOSE 3002

CMD ["npm", "run", "start"]