FROM node:lts AS node
ENV PATH /app/node_modules/.bin:$PATH
WORKDIR /app
COPY . /app/
RUN npm install
RUN npm install -g @angular/cli
RUN ng build --prod --output-path=../release-build/
FROM nginx:stable as angularRelease
WORKDIR /usr/share/nginx/html
COPY --from=node /release-build ./
EXPOSE 80