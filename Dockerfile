FROM node:6.7

COPY package.json /usr/src/app/
WORKDIR /usr/src/app/
RUN npm install

COPY . /usr/src/app/

CMD ["npm", "start"]