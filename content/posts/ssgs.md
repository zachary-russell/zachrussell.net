---
title: Why I'm Switching to a Static Site Generator and you should too.
date: 2019-01-22
categories:
- Development
slug: switching-to-static-site-generators
description: After years of using traditional CMSs like WordPress i'm switching to
  using SSGs more often. Learn why i'm making the switch
seo_title: Why I switched from WordPress to Hugo | Static Site Generators
header_image: "/images/productivity.jpg"

---
For almost the past decade my go-to tool for building a website has been WordPress. WordPress is an amazing platform for building websites with a diverse ecosystem of themes & plugins along with a vibrant community. A few months ago I started to experiment with Static Site Generators (SSGs). I really enjoyed working with them. I have since moved several of my personal and professional sites over to [Hugo](https://gohugo.io) and plan on relying on them much more moving forward.

## Challenges & Limitations with WordPress

While WordPress is great, there are _definitely_ a lot of challenges and frustrations that I have with the platform.

### Performance

Out of the box, WordPress is not very performant. Every single page is completely dynamic requiring a server to run PHP, make dozens of queries to a database, generate HTML, then send it back to the visitor. As you add more complexities to your site (plugins and other dynamic features) it will slow down your performance, especially when there are multiple visitors on your site.

Of course, the logical solution to this is caching. There are several great caching plugins with varying levels of complexity to set up, but they all measurably help performance. Caching, in a nutshell, will save previously ran dynamic queries for a period of time so they don't need to be run on every page load. This performance boost, however, comes at a tradeoff; your site is no longer dynamic.

#### Latency

The other performance issue is that your site is limited by the geographic proximity to the server. When I'm on my computer here in Philadelphia and I go to load a site that is hosted in Texas (a popular location for data centers) that information has to travel over a thousand miles to go from the server to my computer. While most of the network backbone is on fiber-optic (and thus travels at the speed of light) there are network hops that occur that can add a delay to your request. This is known as _latency_. While it may only be a few hundred milliseconds across the United States, what if the visitor is in Australia or in a developing country that doesn't have an advanced network infrastructure?

There is no real solution to dealing with latency in WordPress. The best thing that can be done is to implement a Content Delivery Network (CDN) to serve your static assets. By static assets, I mean things like CSS, JavaScript, and images. With a CDN, your static assets are distributed to a global network of servers. When a visitor requests a static asset, the image is sent to them from the server that is geographically closest to them which can have a significant reduction in latency. The problem is that you cannot add the initially generated HTML from WordPress to a CDN, so that initial request will always be the bottleneck.

### Updates & Security

WordPress is constantly getting updates for both new features and to plug security vulnerabilities. Realistically this means that you should be updating your site _at least_ weekly. If there is a security vulnerability it is your responsibility to know that it exists and that there is a patch available to fix it. WordPress does have support for things like auto-updating minor releases, which helps, but it isn't the answer to all the issues. What if this update breaks the site?

## The benefits of a Static Site Generator

### Speed

Static sites by nature are static which means there is no need to run PHP or a backing database. This also means that the entire site can easily be distributed to a CDN for a speed boost.

### Scalability

A common issue with WordPress sites is something that I call "The Shark Tank Effect". It's very common when a company is featured on Shark Tank that the site gets inundated with traffic and will crash. This is _much_ less likely to happen with a static site because you're only serving static files.

### Security

A static site is extremely secure because there is nothing for attackers to exploit. Things like plugin and core vulnerabilities simply do not exist.

### Use with a CMS (When needed)

One of the biggest issues that critics have with SSGs is that it is harder to manage content. For a non-developer, I can definitely sympathize with that logic. As a developer myself, I actually prefer writing in markdown as it takes away a lot of the business of a CMS. There are now a few tools out there that give you the functionality of a CMS within a Static Site Generator. This gives you the best of both worlds. Two popular options are:

* <a href="https://www.netlifycms.org/">Netlify CMS</a> (Open Source)
* <a href="https://forestry.io/">Forstry.io</a>

### Hosting with Netlify

The _best_ thing that I discovered about hosting static websites is Netlify. They are a hosting company that specializes in hosting static websites. Out of the box, Netlify will distribute your website to its ultra-fast global CDN for the fastest speed possible. In my tests, it means this website loads in well under a second from anywhere in the world.

![Netlify Speed](/images/netlify-speed.png)

Along with blazing speeds here are other things I love about Netlify:

**Deep Git Integration with Automatic Deploys:** This is by far my favorite feature. When creating a site, you connect it to a Git repository (GitHub, GitLab or BitBucket). Whenever you push to that repository, it will trigger Netlify to automatically rebuild and deploy your changes.

**Useful Dynamic Features:** Netlify includes a bunch of really useful dynamic features that are simple to bake into your site. Things like Forms, Identity (login), and even functions via AWS Lambda.

**Branch Deploys:** Branch deploys allow you to commit your changes to a separate branch and preview them on a separate website (like <branch-name>.yoursite.com).

**A/B Testing:** Similar to branch deploys, Netlify's A/B testing allows you to split your traffic between two different branches. You can even control what percentage of traffic goes to what branch.

**It's Free**: There is no catch. Everything mentioned above is provided to you at no charge. All of the dynamic features do have a paid tier, but their free version should be more than enough for most websites. Reading the fine print their "Unlimited" traffic is a 100GB _soft_ limit, which is several thousand times what any normal site will realistically use.

Seriously go check out [Netlify](https://netlify.com) they are awesome (note: I am not affiliated with Netlify in any way, I just love their services).