FROM node:7.9.0

RUN mkdir -p /tam/lib

COPY package.json /tam
COPY package-lock.json /tam

WORKDIR /tam
RUN npm install -g create-react-app
RUN chown node:node -R .
RUN npm install --quiet || cat npm-debug.log

VOLUME /tam/public
VOLUME /tam/src
VOLUME /tam/uploads

RUN ls -la /tam

CMD ["npm", "start"]
