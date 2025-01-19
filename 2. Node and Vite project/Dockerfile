FROM node:23.6-alpine AS build

WORKDIR /app

#RUN ls -l && echo "Listing of current directory:"
#RUN echo -e $(ls)

COPY package.json /
COPY package-lock.json /



RUN npm install

COPY . .

RUN npm run build

# --

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

# both ARG + ENV are required to have the environment variable set in the container. Docker rubbish logic.
ARG VERSION 
ENV VITE_UI_VERSION=$VERSION

CMD ["nginx", "-g", "daemon off;"]

