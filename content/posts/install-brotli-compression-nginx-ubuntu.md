---
title: 'Install Brotli Compression Nginx Ubuntu'
date: 2019-06-20T08:44:36-04:00
draft: true
---

## What is Brotli, anyway?

Brotli is a compression algorithm that was created at Google and open-sourced for the world to use.

## Install Nginx w/ Brotli support

### Step 1: Backup Nginx Configs

It is possible/likely that your Nginx configuration files will get overwritten when adding Brotli support so it is _extemely important_ that we make a backup first. To do so:

`sudo cp -R /etc/nginx /etc/nginx.bak`

### Step 2: Install Build Dependencies

```
sudo apt update
sudo apt install dpkg-dev build-essential zlib1g-dev libpcre3 libpcre3-dev unzip
```

### Step 3: Install Nginx with the ngx_brotli module

**Add Nginx Repository**

```
sudo add-apt-repository ppa:nginx/stable
```

Edit your nginx PPA source at `/etc/apt/sources.list.d/

**Download Nginx and nginx_brotli source files**

```
cd /usr/local/src
sudo apt source nginx
```

**Install build dependencies for Nginx**
`sudo apt build-dep nginx -y`

**Clone ngx_brotli source from GitHub**
`git clone --recursive https://github.com/google/ngx_brotli.git`

**Compile and build the Nginx package**
`sudo dpkg-buildpackage -b -uc -us`

**Install Nginx**
`sudo dpkg -i *.deb`
