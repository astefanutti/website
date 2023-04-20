---
title: Developing a Kubernetes Admission Controller with Telepresence
date: 2021-12-21
published: true
slug: kubernetes-admission-controller
tags:
  - Kubernetes
# description: >
#   Admission webhook is a powerful extension mechanism, that enables to plug in admission controllers, dynamically into the Kubernetes API server, to intercept requests.
#   The following post demonstrates how to use Telepresence, to intercept requests from the API server to the admission webhook service, tunnel them to the admission controller running locally, and speed the development cycle up.
---

Admission webhook is a powerful extension mechanism, that enables to plug in admission controllers, dynamically into the Kubernetes [API access control](https://kubernetes.io/docs/concepts/security/controlling-access/#admission-control), to intercept requests.

The flexibility of admission webhook allows to address a large spectrum of use cases, like configuration management, governance, and security, as described in [Why do I need admission controllers?](https://kubernetes.io/blog/2019/03/21/a-guide-to-kubernetes-admission-controllers/#why-do-i-need-admission-controllers).

Two types of admission webhooks can be created, _mutating_ and _validating_ admission webhooks[^1].
Declaring a mutating (resp. validating) admission webhook is as simple as creating a `MutatingWebhookConfiguration` (resp. `ValidatingAdmissionWebhooks`) resource, e.g.:

```yaml
apiVersion: admissionregistration.k8s.io/v1
kind: MutatingWebhookConfiguration
metadata:
  name: webhook
webhooks:
  - name: webhook
    clientConfig:
      service:
        name: controller
        namespace: admission
        path: /mutate
    rules:
      - apiGroups: [""]
        apiVersions: ["v1"]
        resources: ["pods"]
        operations: ["CREATE", "UPDATE"]
```

[^1]: Conversion webhooks also exist, to convert custom resources between versions, and for which using Telepresence applies as well.

With that example, The API server makes an HTTPS POST request to the `https//controller.admission.svc/mutate` URL, with a JSON-encoded `AdmissionReview` in the request body, each time a _write_ request (POST, PUT or PATCH) to the [Pod endpoint](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.22/#pod-v1-core) is received by the API server.

The admission controller hosting the webhook endpoint must be accessible from within the cluster, exposed as a Service[^2].
This is diametrically opposed to _standard_ controllers, or [operators](https://operatorframework.io), that call the API server.

[^2]: It can also be deployed externally and referenced with the `URL` field, in which case the host should be an IP address, or resolved via an external DNS (`kube-apiserver` cannot resolve in-cluster DNS as that would be a layering violation).

That difference matters during the development cycle, as the controller, running locally, is not directly accessible from the API server.
The container image has to be built, push to a registry, and the controller deployment rolled out.

The following post demonstrates how to use [Telepresence](https://www.telepresence.io)[^3], to intercept requests from the API server to the admission webhook service, tunnel them to the admission controller running locally, and ultimately speed the [inner development loop](https://www.telepresence.io/docs/v2.4/concepts/devloop/) up.

[^3]: Telepresence is a CNCF sandbox project, that enables to connect a local machine seamlessly to a Kubernetes cluster, via a two-way proxying mechanism.

## Kubebuilder

First things first, let's create an admission controller project.

There is no unique way to implement an admission webhook.
The contract is ultimately defined by the [webhook REST API](https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/#webhook-request-and-response), that can be implemented with any stack.

That being said, the [Kubebuilder](https://github.com/kubernetes-sigs/kubebuilder) project provides tools that scafold projects, for implementing Kubernetes API and webhook.
So let's use it to create our admission controller...

1) Install the `kubebuilder` CLI:

```ps1
$ curl -L -o kubebuilder https://go.kubebuilder.io/dl/3.2.0/$(go env GOOS)/$(go env GOARCH)
$ chmod +x kubebuilder && mv kubebuilder /usr/local/bin/
```

2) Scafold the project:

```ps1
$ mkdir webhook && cd webhook
$ kubebuilder init --repo github.com/user/webhook
```

3) Define the `Hooked` CRD, and the associated mutating webhook:

```ps1
$ kubebuilder create api --version v1 --kind Hooked
$ kubebuilder create webhook --version v1 --kind Hooked --defaulting
$ make manifests
```

It's also possible to define webhooks for core types.
However, Kubebuilder does not support scafolding webhook in that case.
So the generated project must be modified manually, as documented in [admission webhook for core types](https://book.kubebuilder.io/reference/webhook-for-core-types.html).

4) Install the generated CRD manifest:

```ps1
$ kubectl apply -k config/crd
```

5) Create a namespace:

```ps1
$ kubectl create ns webhook
$ kubectl config set-context --current --namespace=webhook
```

6) Deploy the generated webhook manifests:

```ps1
$ $(cd config/webhook && kustomize edit set namespace webhook)
$ kubectl apply -k config/webhook
```

7) Create a sample `Hooked` resource:

```ps1
$ kubectl apply -f config/samples/_v1_hooked.yaml
  Error from server (InternalError): error when creating "config/samples/_v1_hooked.yaml":
  Internal error occurred: failed calling webhook "mhooked.kb.io":
    Post "https://webhook-service.webhook.svc:443/mutate-my-domain-v1-hooked?timeout=10s":
      no endpoints available for service "webhook-service"
```

The API server calls the service configured into the `MutatingWebhookConfiguration` resource.
This fails as expected, since we haven't deployed any endpoint yet, to actually serve the request.

In production, that endpoint is generally exposed by the admission controller, deployed in-cluster.
However, during the development phase, we want the requests to be processed by the admission controller, running locally.

## Telepresence

Thanks to Telepresence, it's possible to have the requests issued by the API server tunneled to the local machine.
Let's use it to intercept the requests received by the webhook service, deployed in the cluster, and tunnel them to the admission controller started locally.

1) Install the `telepresence` CLI:

```ps1
$ curl -fL https://app.getambassador.io/download/tel2/darwin/amd64/2.4.9/telepresence -o /usr/local/bin/telepresence
```

2) Connect Telepresence to the cluster, and check the status:

```ps1
$ telepresence connect
Launching Telepresence Root Daemon
Launching Telepresence User Daemon
$ telepresence status
Root Daemon: Running
  Version   : v2.4.9 (api 3)
  DNS       :
    Remote IP       : REDACTED
    Exclude suffixes: [.arpa .com .io .net .org .ru]
    Include suffixes: []
    Timeout         : 4s
  Also Proxy : (0 subnets)
  Never Proxy: (1 subnets)
User Daemon: Running
  Version           : v2.4.9 (api 3)
  Ambassador Cloud  : Logged out
  Status            : Connected
  Kubernetes server : REDACTED
  Kubernetes context: REDACTED
  Telepresence proxy: ON (networking to the cluster is enabled)
  Intercepts        : 0 total
```

3) Telepresence requires a `Deployment`, as interception target, so instead of relying on the real controller deployment, let's create a compatible mock:

```ps1
$ kubectl create deployment webhook --image=k8s.gcr.io/echoserver:1.10 --port 9443
$ kubectl set selector svc webhook-service app=webhook
```

4) Intercept the webhook service:

```ps1
$ telepresence intercept webhook --service webhook-service --port 9443

Using Deployment webhook
intercepted
    Intercept name    : webhook
    State             : ACTIVE
    Workload kind     : Deployment
    Destination       : 127.0.0.1:9443
    Volume Mount Error: sshfs is not installed on your local machine
    Intercepting      : all TCP connections
```

5) Generate the webhook server certificate, as the API server mandates HTTPS:

```ps1
# Generate the CA certificate
$ openssl req -new -x509 -nodes -days 365 -keyout ca.key -out ca.crt -subj "/CN=webhook"
# Generate the webhook server certificate
$ openssl req -nodes -new -sha256 -keyout tls.key -out tls.csr -subj "/CN=webhook-service.webhook.svc" \
-config <(cat /etc/ssl/openssl.cnf <(printf "[SAN]\nsubjectAltName=DNS:webhook-service.webhook.svc")) -reqexts SAN
# Sign the server certificate with the generated CA
$ openssl x509 -req -days 365 -in tls.csr -out tls.crt -CA ca.crt -CAkey ca.key -CAcreateserial \
-extfile <(cat /etc/ssl/openssl.cnf <(printf "[SAN]\nsubjectAltName=DNS:webhook-service.webhook.svc")) -extensions SAN
```

6) Patch the `MutatingWebhookConfiguration` resource, to set the `caBundle` field with the generated CA certificate:

```ps1
$ kubectl patch mutatingwebhookconfiguration mutating-webhook-configuration --type='json' \
-p="[{'op': 'add', 'path': '/webhooks/0/clientConfig/caBundle', 'value':'$(cat ca.crt | base64 | tr -d '\n')'}]"
```

7) Update the controller manager, to source certificates from the project directory:

```go title="main.go"
mgr, err := ctrl.NewManager(ctrl.GetConfigOrDie(), ctrl.Options{
	CertDir: ".",
	// ...
})
```

8) Start the admission controller:

```ps1
$ go run main.go
```

9) Create a sample `Hooked` resource:

```ps1
$ kubectl apply -f config/samples/_v1_hooked.yaml
hooked.my.domain/hooked-sample created
```

10) Check the admission controller output:

```json
2021-12-23T15:03:08.088+0100	DEBUG	controller-runtime.webhook.webhooks	received request	{"webhook": "/mutate-my-domain-v1-hooked", "UID": "528ccce7-6404-499d-8959-42e620a211a4", "kind": "my.domain/v1, Kind=Hooked", "resource": {"group":"my.domain","version":"v1","resource":"hookeds"}}
2021-12-23T15:03:08.088+0100	INFO	hooked-resource	default	{"name": "hooked-sample"}
2021-12-23T15:03:08.088+0100	DEBUG	controller-runtime.webhook.webhooks	wrote response	{"webhook": "/mutate-my-domain-v1-hooked", "code": 200, "reason": "", "UID": "528ccce7-6404-499d-8959-42e620a211a4", "allowed": true}
```

Hooray, the admission controller running locally is called!

Happy coding!
