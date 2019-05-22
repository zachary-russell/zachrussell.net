---
title: 'Brotli Test'
subtitle: "Does your website support Google's latest compression algorithm?"
seo_title: "Brotli Test: Does your site use Google's Brotli Compression"
date: 2019-05-22T11:48:32-04:00
---

## Brotli Compatability Test

Enter your website's URL to test if your server or CDN supports Brotli.

{{< brotli_checker >}}

## What is Brotli, anyway?

Brotli is a compression algorithm (like zip and gzip) that reduces the size of your static files (HTML, CSS and JavaScript). Typically, compressed files are sent from your webserver to the Client's web browser where it is then decompressed and parsed.

## How do I install Brotli on my server?

Please stay tuned for an upcoming guide on how to set up Brotli with Nginx on Ubuntu.

## Why should I use Brotli?

Put simply, Brotli is more efficient than gzip (the most common copression format on the web). With less data being transfered you can reduce latency and reduce cost of a Content Delivery Network (CDN). After enabling Brotli compression you should expect the following size improvements _on top of gzip_:

- **HTML:** 21% smaller than gzip.
- **JavaScript:** 14% smaller than gzip.
- **CSS:** 17% smaller than gzip.

**Note:** Brotli should only be used to compress text-based files. Formats like JPEG and MP4 have their own built-in compression algorithms and Brotli would actually make the file sizes bigger than they natively are.

## Brotli FAQs

**What browsers currently support Brotli?**

According to <a href="https://caniuse.com/#feat=brotli" target=_blank>Caniuse</a> Brotli is supported by over 90% of users. All modern web browsers support Brotli compression:

- Microsoft Edge
- Mozilla Firefox
- Google Chrome
- Safari

_Note:_ Internet Explorer does not support Brotli, however, when configured you can configure your webserver to support multiple encodings (like gzip).
