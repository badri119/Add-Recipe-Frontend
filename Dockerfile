FROM node:19-alpine

WORKDIR /usr/src/frontend

COPY package.json /usr/src/frontend/
COPY package-lock.json /usr/src/frontend/

RUN npm install

COPY . /usr/src/frontend/

CMD ["npm", "start"]