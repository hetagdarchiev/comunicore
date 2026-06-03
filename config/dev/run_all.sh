#!/bin/bash

set -e

/usr/local/bin/docker-entrypoint.sh postgres &
/usr/sbin/nginx -g 'daemon on; master_process on;'

while ! nc -z -v localhost 5432;
do
    echo "Waiting for PostgreSQL to start..."
    sleep 1
done
sleep 2

./migrate --config server-config.toml
./comunicore --config server-config.toml &
/bin/bash
