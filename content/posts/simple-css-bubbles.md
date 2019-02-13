---
title: 'Simple Css Bubbles'
date: 2015-01-03
---

There are a lot of articles and generators out there on how to create CSS bubbles. Most of them are great, for 99% of the time. When I was creating arrows for one of my sites, [WP Improve](https://wpimprove.com), I ran into a lot of issues. I was using the Advanced Custom Fields WordPress plugin to allow for user defined colors for each section of my website, the arrow at the end of the section would then take on the same color as the section itself. Every tutorial & generator I used either didn't display the right color, or the arrow would not show up at all. It was time for me to come up with my own solution.

My HTML looked like this:

I am using inline CSS for colors because each section is defined dynamically in WordPress, so the easiest way to do this is to add it inline.

Next is the CSS for the arrows itself. This one of the finer points of CSS, we can take advantage of inheretence to make the color of the arrow the same color as the parent div, without having to code custom colors into each arrow:

The parent div needs to be relatively positioned. For the `:after` pseudo selector we do the following things:

1.  Absolutely Position The Element
2.  Create a 20px square
3.  Rotate it 45 degrees to create a diamond
4.  Position it 10px below the div (to get the "arrow" effect)
5.  Center it by making it left 50% then adding a -10px margin to compensate for half the width of the element.
6.  Adding a z-index to make sure the arrow is always on top

Here is an example of this working in action:

<p data-height="300" data-theme-id="21557" data-slug-hash="JGELXW" data-default-tab="html,result" data-user="protechig" data-pen-title="Fancy CSS Bubbles" class="codepen">See the Pen <a href="https://codepen.io/protechig/pen/JGELXW/">Fancy CSS Bubbles</a> by Zach Russell (<a href="https://codepen.io/protechig">@protechig</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

How do you prefer to make your CSS arrows?
