#!/bin/bash

docker-compose down
./scripts/docker-run-dependencies.sh
docker-compose build tests
docker-compose run --rm tests
