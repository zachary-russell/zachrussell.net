---
title: 'Google Cloud for Bootstrapped Businesses'
---

Lets face it, Google is everywhere. Google Cloud Platform, which is it's competitor to AWS has been growing aggressively over the past several years to become a leader in the space. If you run, or are thinking about creating a bootstrapped business, you should seriously consider using Google Cloud as your technology partner.

## The technical requirements of a bootstrapped business

Bootstrapped businesses do not have the same needs as a startup or a small business.

- You need the ability to ship quickly to focus on sales.
- Control costs. You need to be able to understand how much it will cost to run your business.
- Start small, but have the ability to grow with the business.
- You need reliability.

### Why GCP is the best choice

There are many reasons why Google Cloud is the best choice for bootstrapped businesses. Here are a few really important ones:

#### Predictable, fair pricing

GCP has what I would argue to be the fairest pricing model of all the public clouds. They have your standard "on-demand" pricing for servers, but offer automatic discounts as well as the ability to reserve instances for a longer period of time in exchange for a hefty discount.

##### Sustained Use Discounts

Google Cloud offers sustained use discounts on servers that are ran consistently. This discount is automatic, and scales linearly with 0% discount at 1 hour used per month, to a 30% discount at 720 hours used per month. This can also be applied to 1 or more servers that you have running if you have different machines running at different times.

##### Committed Use Discounts

GCP also offers committed use discounts. Essentially, you commit to using resources for a fixed period of time (1 year or 3 years) and Google gives you a discount on your monthly price of up to 57%. You only commit to using a certain amount of cores/memory and it can be applied to any server configuration you desire. Unlike Amazon where you commit to using a specific server type for 1-3 years, Google allows you to start off with a minimal server and resize it as your business grows without having to worry about penalties. This means that you don't have to worry about future capacity.

##### Preemptible Instances

Google Cloud Platform also offers preemptible instances, which are servers that can be terminated by Google at any time - but is done so with heavy discounts of up to 80%. Not all businesses can benefit from these, but if you have short lived tasks, or batch jobs it may make sense to run these on preemptible instances.

### Dead Simple Security

Google Cloud provides dead simple security, no longer do you have to worry about setting up complex IAM roles and manage keys. For most services, you are able to define what other services it can interact with at runtime. For example, when you spin up a Compute Engine virtual machine, you can select what other services it is allowed to interact with on the same project (i.e. a database or a caching service). Adding new users to a project is also easy, all you need to do is add their email address and select which services/roles they have permission to access.

### Best In Class Reliability

GCP offers reliability that no other cloud can come close to. Google has a lot of experience running infrastructure and services reliably. Their SRE team literally [wrote the book](https://landing.google.com/sre/book.html) on Site Reliability Engineering.

### Other Useful Services

Google also offers a plethora of other services that you can choose to use. Many of these services can help speed up your development processes, but come at a cost (meaning you pay for what you use).

- **Cloud SQL -** Google offers both MySQL and PostgreSQL in both single node and high availability configurations.
- **Apps Engine -** A heroku-like PaaS (Platform as a Service) that allows for easy deployments with 0 infrastructure management
- **Cloud Functions** - Host serverless functions in the cloud to easily handle and scale one-off tasks.
- **Cloud Datastore -** A fully-managed serverless NoSQL database, great for storing non relational data with great performance.
- **Stackdriver -** Built in logging and monitoring solution.

## Conclusion

Google Cloud Platform is a great choice for a public cloud, but don't take my word for it. GCP offers a $300 credit and a free tier to try out their services without risk, [take a look today](https://cloud.google.com/free/)!
