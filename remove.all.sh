#!/usr/bin/env bash

# Stop and remove all containers:
CONTAINERS=$(docker ps -a -q)
if [ "$CONTAINERS" ]; then
  echo "Removing containers: ${CONTAINERS}"
  docker stop $CONTAINERS
  docker rmi -f $CONTAINERS
fi

# Remove all images
IMAGES=$(docker images -q)
if [ "$IMAGES" ]; then
  echo "Removing images: ${IMAGES}"
  docker rmi -f $IMAGES
fi


docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)#!/usr/bin/env bash

# Stop and remove all containers:
CONTAINERS=$(docker ps -a -q)
if [ "$CONTAINERS" ]; then
  echo "Removing containers: ${CONTAINERS}"
  docker stop $CONTAINERS
  docker rmi -f $CONTAINERS
fi

# Remove all images
IMAGES=$(docker images -q)
if [ "$IMAGES" ]; then
  echo "Removing images: ${IMAGES}"
  docker rmi -f $IMAGES
fi


docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)