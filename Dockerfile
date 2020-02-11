# build the site using node container
FROM node:8
WORKDIR /build
# RUN npm install -g yarn
COPY package.json yarn.lock ./
RUN yarn install --pure-lockfile
COPY . .
RUN yarn build

# distribute much smaller alpine image
FROM nginx:alpine
WORKDIR /app
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=0 /build/build /usr/share/nginx/html
