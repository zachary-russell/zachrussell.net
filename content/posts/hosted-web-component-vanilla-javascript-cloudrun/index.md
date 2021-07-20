---
title: 'Create a hosted embeddable web component w/ Vanilla JavaScript and CloudRun'
seo_title: Create Embeddable Web Component w/ Vanilla JavaScript and CloudRun 
slug: create-web-component-vanilla-javascript-cloudrun
description: 'Learn how to map caps lock to control in Windows 10 & Windows 11' 
date: 2021-07-18
categories:
- Development
resources:
- src: keyboard.jpg
  name: header
header_image: "keyboard.jpg"
---

## What is a Web Component?

## Why is a Web Component Useful?

## Why use CloudRun?

Many of the projects I have been working on lately are using Satic Site Generators (SSGs) at their core. Many of these projects require certain dynamic features to be embedded. Cloud Run enables me to deploy scalable services without having to manage any underlying infrastucture. For example, one client wanted the ability to create embeddable contact forms that can be customized when they are being invoked. Using Cloud Run will enable me to deploy these services at scale without having to manage underlying infrastructure.

Unlike Cloud Functions, Cloud Run can take advantage of parallel requests which results in more scalability at a lower cost (though realistically, I have yet to incur a cost for a Cloud Run service).

I also really like that CloudRun is really just a thin layer on top of Docker (it's based on kNative) meaning that it can run any docker image that exposes port 8080. That makes anything I write for Cloud Run ultra portable in the case I need to move it somewhere else.


## Create Docker Image

First create our `Dockerfile`

{{< highlight Docker >}}
FROM node:14-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "node", "index.js"]

{{< / highlight >}}

Then build our docker image

## Deploy Docker Image to CloudRun

### Enable CloudRun and CloudBuild


`gcloud builds submit --tag gcr.io/zachrusselldotnet-320419/custom-component`

## See it in action!

The custom web component can now be embedded in any web page, including this one. Using the following embed code:
{{< highlight html>}}
<script src="https://custom-component-vt3fkh3bzq-ue.a.run.app/component.js"></script>
<custom-component></custom-component>
{{< / highlight >}}

Will result in the following being rendered dynamically:


<script src="https://custom-component-vt3fkh3bzq-ue.a.run.app/component.js"></script>
<custom-component></custom-component>
