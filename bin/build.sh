#!/usr/bin/env bash

# Update the external docker-images we use
docker pull node:9

# Remove unused containers
docker-compose rm --force

# Build docker image
docker-compose build

# Install dependencies
docker-compose run app yarn install
