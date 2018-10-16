---
title: 'Getting started with Kubernetes on GKE'
date: '2018-05-30'
categories:
  - Google Cloud
---

**Note:** This article is a companion article to May's GDG Cloud Philly meetup [event](https://www.meetup.com/gdgcloud-philly/events/250685961/). This article should still serve as a standalone guide to Kubernetes. If i'm missing something, contact me.

Kubernetes is undoubtedly one of the most trending technologies of 2018\. With all major clouds adding support for the platform and increased investments from large companies, Kubernetes is slated to take over the web. You may be asking,

"What is Kubernetes?" [Kubernetes](https://kubernetes.io/) is an open source production ready container orchestration platform. Put simply, it lets you easily manage containerized applications at scale. Kubernetes was created by Google and applies lessons learned from running billions of containers a week in production for over 15 years. It is built to run anywhere from your laptop, to a Raspberry Pi, to cloud VMs.

## Why Use Kubernetes?

The first question you may be asking is, "Why should I use Kubernetes?" There are many reasons for someone to use Kubernetes that varies by use case and business type. For Example:

### Enterprises & Large Businesses

Large businesses can benefit from Kubernetes

#### Run on bare metal hardware

While Kubernetes was designed to run in a cloud native environment, utilizing VMs, it does come at a performance cost. For example:

- Hypervisor overhead - this is the host operating system that creates and manages virtual machines
- Guest OS overhead - each VM you run has it's own baseline storage, CPU, and memory needs.
- Storage overhead - block storage is network based so there is latency as well as a hard limit on IOPS (really important for high read/write database or file operations

When running Kubernetes on bare metal you can have complete control over the hardware and can even configure different applications run on different machines (like have a database run on a server with an NVMe SSD or ECC memory).

#### Vendor Neutral Infrastructure

Many of the products and services that cloud providers offer are useful, but come at a cost. This cost is both financial (pay for what you use) as well as operational. For example, if you use Amazon's Simple Queuing Service (SQS) for message queues and want to migrate to Google Cloud you'd need to modify your application logic to switch to Google's equivalent Cloud PubSub. Instead you can just deploy a RabbitMQ pod within Kubernetes and not have to be concerned about changing clouds.

This also introduces the ability to have a multi-cloud or hybrid cloud infrastructure for extra redundancy in the case of something like a cloud-wide outage - which happens from time to time.

#### Variable Capacity

In many business cases, your computing needs does not stay the same on a day-to-day or year-to-year basis. Instead your capacity needs can change dramatically for things like traffic spikes, regularly ran jobs (like ETLs), or for long-running processes. With Kubernetes you have the ability to auto scale the cluster by adding new nodes when you need the increased capacity to and delete nodes when you don't.

#### Multi Tennancy

It is dead simple to run multiple applications or microservices from the same cluster. Gone is the day where you need to maintain separate groups of infrastructure for each part of your application stack.

**Possibility to add Preemptible/Spot instances for temporary capacity**

Both Google and AWS offer instances that live for a "short" time at a steep discount from standard rates (up to 70% off!). This allows them to utilize excess capacity when it's not being used. The catch is that instances can be deleted at any time (with 30 seconds notice) and can live for a maximum of 24 hours. If you have variable workloads it is possible to implement an architecture that can utilize these instances to optimize for cost or process things more quickly.

### SMBs and Startups

#### Streamline DevOps and Production Engineering workflows

While large companies typically have separate production and DevOps teams, small businesses and startups likely do not. With Kubernetes it is easy to meld these workflows together to speed up the releases and make development workflows streamlined and predictable.

#### Multi Tennancy

Like with large businesses, small businesses can benefit from multi tenancy as well. Specifically, you can host internal and external applications on the same cluster (like a website, CI/CD suite, source control software, CRM, etc...) instead of having to create and manage these services separately.

#### Infrastructure can grow with your needs

This is especially important for growth trajectory startups. Kubernetes gives you the ability to start with a relatively small cluster and grow as usage and application complexity increases.

#### Modularity

Kubernetes is modular, so you have the ability to only scale the applications that you need to. If you need to add more front end services you can without also having to also scale back end services.

#### Cost Optimizations

If you are using GKE you have the ability to easily optimize pricing with committed use discounts. The basic logic is that you agree to pay for servers for a specified length of time (1 year or 3 years) and you get a heavy discount of up to 57%. Unlike other services where you have to commit to a specific machine type for a period of time, Google Cloud allows you to to commit to usage at a CPU core and memory level and can deploy it to any type of server you'd like. This allows you to resize instances as needed without having to worry about being stuck in a contract for the previous one.

## Why use Google Kubernetes Engine?

I think the general selling points of Kubernetes are pretty compelling, but why would you want to use a managed Kubernetes service  like GKE instead of managing the cluster yourself?

The first reason is that configuring your own cluster is hard and tedious process. In my first exposure to Kubernetes, which was at a training event, it took several hours of work to get the test cluster set up and that was with provisioning scripts being provided to us. It is highly recommended not to manage your own clusters. If you are interested in learning more about setting up your own clusters, I recommend Kelcey Hightower's [Kubernetes the Hard Way](https://github.com/kelseyhightower/kubernetes-the-hard-way) course.

In GKE, the Kubernetes cluster is fully managed by Google and is constantly monitored and maintained by their Service Reliability Engineering (SRE) team. Members of this team literally wrote the book on Service Reliability Engineering and there is arguably no other team more qualified to keep a service up and running than Google's.

GKE also gives you the ability to auto scale and auto upgrade your clusters.

You also have the ability to use Google's Container Optimized OS which is specifically made to run containers and Kubernetes and is optimized to be minimalist and performant. With Container Optimized OS you no longer need to worry about OS updates as they auto update themselves.

GKE gives you the ability (in beta) to use GPUs to run AI workloads.

Google gives you the ability to run GKE in [regional clusters](https://cloud.google.com/kubernetes-engine/docs/concepts/multi-zone-and-regional-clusters#regional) (currently in beta). This allows you to have extra redundancy in both the Kubernetes master and nodes to hedge against zonal outages and hardware failures.

Best of all running Kubernetes on Google Cloud is **FREE!** You obviously pay the standard rates for compute instances but there are zero charges for running them in Kubernetes Engine.

## Understanding the basics of Kubernetes

**Kubernetes Master.** This is a collection of three processes that run on a single node in your cluster, which is designated to be the master node

**Nodes.** Individual servers in your cluster that are controlled by Kubernetes.

**Deployments.** A deployment in kubernetes provides declarative updates for pods and replica sets. A deployment object is used to describe the desired state and the deployment controller changes the state to your desired state.

**Kubectl.** Kubectl is a utility to control Kubernetes clusters from the command line.

**Pods.** A pod the smallest deployable object in Kubernetes. They represent the running processes in your cluster. Pods can either run a single container or multiple containers that need to work together.

**Services.** A service is a grouping of pods that are running on your Kubernetes cluster. If you have experience with object oriented programming, you can think of a service being an object with deployments being it's class.

## Run Kubernetes on GKE

### Install Google Cloud SDK

Google Cloud SDK is the easiest way of managing Google Cloud. It is a set of command line utilities that can do anything that you can do from within their web control panel - including configuring Kubernetes. You can install the Google Cloud SDK for your operating system by following the installation instructions [here](https://cloud.google.com/sdk/).

### Install kubectl

`gcloud components install kubectl`. This can also be installed via [homebrew](https://brew.sh/) if you're on a Mac.

### Create a cluster

To create a cluster, type in the following command. This will create a standard cluster with 3 nodes. `gcloud container clusters create gke-test` We then need to get authorization credentials to be able to access/modify the cluster `gcloud container clusters get-credentials gke-test`

### Create a deployment

`kubectl run hello-server --image gcr.io/google-samples/hello-app:1.0 --port 8080`

### Scale your service

You may want to scale your service so when traffic goes to the site it is balanced between 3 pods: `kubectl scale deployment hello-server --replicas=3`

### Expose the service

`kubectl expose deployment hello-server --type "LoadBalancer"` You can now access your service from a web browser

### Delete your service

Now when we're done make sure you delete your service to clean up any load balancing forwarding rules. `kubectl delete service hello-server`

#### Delete Cluster

Once you're done with Kubernetes, make sure you delete your cluster. `gcloud container clusters delete [cluster_name]`
