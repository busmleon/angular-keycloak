FROM node:lts-alpine AS node
USER root
ENV PATH /app/node_modules/.bin:$PATH
WORKDIR /app
COPY . /app/
RUN npm install -g @angular/cli
RUN npm install
RUN ng build --prod --output-path=../release-build/
FROM nginxinc/nginx-unprivileged
WORKDIR /usr/share/nginx/html
COPY --from=node /release-build ./
EXPOSE 8080