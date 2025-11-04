#!/bin/bash

set -e
set -x

# start queues
mosquitto -c ./alerts_raw_queue.conf &
mosquitto -c ./alerts_processed_queue.conf &

# start dispositivos service
(cd dispositivo_CRUD && mvn spring-boot:run &)

# start alerts service
(cd alertasV1 && ./mvnw spring-boot:run &)

# start user service
(cd dispositivos_usuarios && ./mvnw spring-boot:run &)


# start gateway
(cd api-gateway && node --watch index.js &)

(cd cliente-dispositivos && npm run dev &)

wait
