FROM node:7.9.0

RUN mkdir -p /tam/lib

COPY package.json /tam
COPY package-lock.json /tam

WORKDIR /tam

RUN npm install --quiet || cat npm-debug.log

VOLUME /tam/src
VOLUME /tam/uploads

EXPOSE 3000

CMD ["npm", "start"]
