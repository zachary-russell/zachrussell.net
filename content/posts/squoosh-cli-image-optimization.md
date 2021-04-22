---
title: Bulk Optimize Images with Squoosh CLI
date: 2021-04-21
categories:
- Development
slug: bulk-optimize-images-with-squoosh-cli
description: After years of using traditional CMSs like WordPress i'm switching to
  using SSGs more often. Learn why i'm making the switch
seo_title: Bulk Optimize Images with Google's Squoosh CLI | Zach Russell
header_image: "/images/photo-optimization-demo-retina.jpg"

---
Google's search ranking algorithm updae that includes web vitals was just pushed back until mid June which gives everyone a bit more time to squeeze out a little bit more speed from their website. One optimization that everyone can do is serve the leanest images possible to your website's visitors. You can easily save 20%-50%+ of image sizes while barely having a noticible difference in image quality.

## Picking the right image format for the job

In the earlier days of the internet there weren't many options for what you can use for web safe image formats; PNG, GIF and JPEG. Now there are tons of new formats available and it can be a bit daunting to make sense of them all. At a high level these are the rules that I follow:

1. Pictures use WebP with a JPEG fallback.
2. For graphics use SVG

### The new(ish) WebP Image Format

WebP is an image format created by Google and is the counterpart to the WebM format for video. It is an open standard that has support in 94% of web browsers (or all web browsers not named Internet Explorer). WebP is interesting because it supports both lossless (i.e. like a PNG) and lossy (like a JPEG) and can even support transparency and animations. According to [Google](https://developers.google.com/speed/webp), here is how WebP compares to its predecessors:

- Lossless images are 26% smaller than their PNG counterparts ([source](https://developers.google.com/speed/webp/docs/webp_lossless_alpha_study#results))
- Lossy images are 25%-34% smaller than their JPEG counterparts ([source](https://developers.google.com/speed/webp/docs/webp_study))

## Testing out new image formats with Squoosh

Google released [squoosh.app](https://squoosh.app/) a few years ago to help website owners easily optimize images and test out new formats. Its a free, open source tool that is a really good example of an offline-first web app that uses web assembly.

For a quick test, and a common workflow for bloggers I went to Unsplash and downloaded a beautiful image to use for my post. In this case I choose [this image](https://unsplash.com/photos/guy5aS3GvgA) by ActionVance. Downloading this image you can see that it is over 8.7MBs which is way too large for a website. 

Uploading it to Squoosh you will see that it auto chooses the MozJPEG optimizer with a quality of 75%. This will result in a 47% decrease in file size without a discernable loss in image quality. The next step is to resize the image. Reducing the width from 5161px wide to a more reasonable (for the format of my blog) 900px wide yields a total of 99% reduction in size from 11.9MBs to 101KBs not too shabby!

![Optimized Photo](/images/photo-optimization-demo.jpg)

Here is a version that is saved at 1800px with for a total size of 349kb (96% savings):

![Optimized Photo Retina](/images/photo-optimization-demo-retina.jpg)


## Lets Automate

Now this is really cool and useful, however, this is quite a manual process. Luckily, Google has our backs and released the [Squoosh CLI](https://www.npmjs.com/package/@squoosh/cli) for us to use:

`npx @squoosh/cli <options...>`

For example here is how I would optimize this image programatically (without resizing)


{{< gist zachary-russell 7a2ab6f180f702e1b00e27712937e5c8 >}}


To bulk optimize, all you need to do as add a wildcard match on the end and set it to output to a new directory `-d output ./*`


{{< gist zachary-russell b6ed7baf728061991a83506e3f9d044a >}}

