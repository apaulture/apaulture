docker rm -f $(docker container ls -aq)
docker rmi -f $(docker images -aq)
docker volume rm $(docker volume ls -q)
docker system prune -a