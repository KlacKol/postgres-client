FROM node:14.8.0-alpine
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . /app
EXPOSE 80
CMD ["npm","start"]

#FROM node:14.8.0-alpine as build
#WORKDIR /app
#COPY package*.json ./
#RUN npm i
#COPY . /app
#RUN npm run build
#FROM nginx:1.19.2-alpine
#COPY ./nginx/nginx.conf /etc/nginx/conf
#RUN rm -rf /usr/share/nginx/html/*
#COPY --from=build /app/build /usr/share/nginx/html
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]