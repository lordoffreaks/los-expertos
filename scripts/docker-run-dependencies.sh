#!/bin/bash

docker-compose stop mongo
docker-compose up -d mongo
docker-compose run --rm --no-deps wait-mongo
