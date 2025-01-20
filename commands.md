# Commands

## Serve multiple

`pnpm nx run-many -p service1,service2 -t serve`

## Docker build

`docker build -t service2:alpha -f apps/service2/Dockerfile .`

## Docker run

`docker run -d -e PORT=5001 -e SERVICE2_URL=http://localhost:5000 --expose 5001 -p 5001:5001 service1:alpha`

## Run curl container in cluster

`kubectl run curl --image=radial/busyboxplus:curl -i --tty --rm`

## Run a temporary image

`kubectl run -it --rm --restart=Never alpine --image=alpine sh`

## Run db migration in kubernetes

`kubectl exec $(kubectl get pods -l app=product-inventory-service --no-headers | head -1 | awk '{print $1}') -- npx prisma migrate deploy`

## Build service and db migration images

`docker build --target service -t product-inventory-service:alpha -f apps/product-inventory-service/Dockerfile .`

`docker build --target db-migrate -t product-inventory-service-db-migrate:alpha -f apps/product-inventory-service/Dockerfile .`
