# Issues

## Cannot find module 'tslib'

[Link](https://github.com/nrwl/nx/issues/2625)

`"importHelpers": false` in `tsconfig.base.json`

## Use minikube docker registry

[Link (udemy course)](https://www.udemy.com/course/microservices-with-node-js-and-react/learn/lecture/23494884#overview)

```
Minikube Users:

If you are using a vm driver, you will need to tell Kubernetes to use the Docker daemon running inside of the single node cluster instead of the host.

Run the following command:

eval $(minikube docker-env)
```

## Cannot access service from another pod in the cluster

[Link](https://minikube.sigs.k8s.io/docs/drivers/virtualbox/)

Solution: use minikube virtualbox driver

## Add ingress

https://minikube.sigs.k8s.io/docs/handbook/addons/ingress-dns/#Linux

Follow 'Linux OS with systemd-resolved'

## Persistent volumes not surviving minikube restart

Locate under /mnt/sda1/data

## Tanstack virtual table with sticky header

https://github.com/TanStack/virtual/issues/640
