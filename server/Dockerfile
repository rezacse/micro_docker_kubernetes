# use an existing docker image as a base
FROM node:14-alpine
WORKDIR '/app'
COPY package.json  .
RUN npm install
COPY .  .
CMD ["npm", "run" "start"]


# # use an existing docker image as a base
# FROM alpine

# #download and install a dependency
# RUN apk add --update redis
# #RUN apk add --update gcc

# #Tell the image what to do when it starts as a container
# CMD ["redis-server"]