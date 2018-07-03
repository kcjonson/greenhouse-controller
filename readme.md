


https://blog.codeship.com/using-docker-compose-for-nodejs-development/

https://medium.com/@nickpeleh/dockerizing-a-node-js-web-app-with-redis-and-postgresql-60ddc697b44



# Starting the servers locally

start `docker-compose up`

rebuild a particular container `docker-compose build --no-cache CONTAINER`

rebuild all containers and start `docker-compose up --force-recreate`




# Running Tests

Instead of just running `up` using `run` allows up to specify a command to the api server

`docker-compose run api npm run test`

`docker-compose run` - run
`api` - the name of the container
`npm run test` the command to run




# Connecting to the DB

`psql -h 127.0.0.1 -p 5433 -U greenhouse`

display tables `\dt`




# Docker Cleanup


kill all running containers with `docker kill $(docker ps -q)`

delete all stopped containers with `docker rm -v $(docker ps -a -q)`

delete all images with `docker rmi $(docker images -q)`

warning: this deletes databases!
force delete all images: `docker rmi -f $(docker images -q)`

warning: this deletes databases!
prune volumes: `docker volume prune`





# nginx info

## host not found in upstream

Solution: set fail_timeout=5s max_fails=5 to allow server to come up
https://stackoverflow.com/questions/33639138/docker-networking-nginx-emerg-host-not-found-in-upstream