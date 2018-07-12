


## Starting the servers locally

start `docker-compose up --build`

rebuild a particular container  `docker-compose build --no-cache CONTAINER`
note: this won't install new npm dependencies

recreate all containers and start `docker-compose up --force-recreate`


## Connecting to a started server

Its useful to connect to already running servers to run migrations that may have failed or manually install new node deps

1) Run `docker ps` to check the names of things
2) Run `docker exec -it greenhouse-controller_api_1 /bin/bash` (insert correct controller)



## Expected Behavior of node_modules

* You should not have to have done a `yarn install` on your local checkout in order to run `docker-compose up`
* If you have done a local `yarn install` the installed modules will not be copied to the containers
* The `node_modules` folder in containers should be cached from build to build
* We have to manually copy the shared dependency(s) into containers since they run in isolation, hoisting will not work, and they're not valid packages for a `yarn install`



## Running Tests

Instead of just running `up` using `run` allows up to specify a command to the api server

`docker-compose run api npm run test`

`docker-compose run` - run
`api` - the name of the container
`npm run test` the command to run




## Connecting to the DB

`psql -h 127.0.0.1 -p 5433 -U greenhouse`

display tables `\dt`




## Docker Cleanup


kill all running containers with `docker kill $(docker ps -q)`

delete all stopped containers with `docker rm -v $(docker ps -a -q)`

delete all images with `docker rmi $(docker images -q)`

warning: this deletes databases!
force delete all images: `docker rmi -f $(docker images -q)`

warning: this deletes databases!
prune volumes: `docker volume prune`

nuke from orbit: `docker system prune -a`



## nginx info

### Config Errors

#### host not found in upstream

Solution: set fail_timeout=5s max_fails=5 to allow server to come up
https://stackoverflow.com/questions/33639138/docker-networking-nginx-emerg-host-not-found-in-upstream




## Resources

https://blog.codeship.com/using-docker-compose-for-nodejs-development/

https://medium.com/@nickpeleh/dockerizing-a-node-js-web-app-with-redis-and-postgresql-60ddc697b44

https://codeforgeek.com/2015/07/using-redis-to-handle-session-in-node-js/

https://www.codementor.io/mayowa.a/how-to-build-a-simple-session-based-authentication-system-with-nodejs-from-scratch-6vn67mcy3
