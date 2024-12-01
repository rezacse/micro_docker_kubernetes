DOCKER

- run container ->
  ```
  docker run [IMAGE_NAME]
  ```
  = `docker create [IMAGE_NAME] + docker start [OPTIONAL -a] [CONTAINER_ID]`  
  -a show the output
- can not change the default command of an existing CONTAINER, need to delete & start again
- list running container -> `docker ps`
- list all container -> `docker ps -a` //--all
- to delete all containers with unused cache -> `docker system prune`
- start container -> `docker start [CONTAINER_ID]`
- stop container (10s then call kill) -> `docker stop [CONTAINER_ID]`
- kill container (stutdown right now) -> `docker kill [CONTAINER_ID]`
- check logs -> `docker logs [CONTAINER_ID]`
- remove container -> `docker rm [CONTAINER_ID]`
- pull images -> `docker pull [NAME:VERSION]`
- run inside container -> `docker exec -it [CONTAINER_ID] redis-cli` //it -> -i + -t (-t to format the input)
- sh -> `docker run -it [CONTAINER_ID] sh`
  // to exit -> CTRL + D or type exit
- to see build progress `docker build --progress=plain .`
- to disable cache `docker build --no-cache --progress=plain .`
- `apk add --update redis` // to get redis on alpine

- build image ->

  ```
  docker build -t [DOCKER_ID]/[NAME]:latest .
  ```

- run image ->

  ```
  docker run -p [SRC_PORT:DOCKER_PORT] [IMG_NAME]
  ```

- generate new IMAGE for reuse like AMI, open the container use sh to do something like install redis

  ```
  docker commit -c "CMD 'redis-server'" CONTAINERID

  docker commit -c 'CMD ["redis-server"]' CONTAINERID
  ```

- tag build image [IMG_ID]
  `docker tag [IMG_ID] [NAME]`

- ```
  docker build --progress=plain -t
  rezacse08/mircro-dk .
  ```

  - `docker-compose up` // to build
  - `docker-compose up -d` // -d - optional to run on background
  - `docker-compose up -d --build` --build to rebuild
  - `docker-compose down` to stop container
