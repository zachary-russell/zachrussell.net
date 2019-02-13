---
title: 'Moving from OS X to Windows for Web Development'
categories:
  - Tools
date: '2018-06-19'
---

I have been a Mac user for most of my life and use a MacBook Pro as my daily driver for web development and general business tasks. Apple was a no brainier because of the superior build quality, integrated UNIX and app ecosystem. Since 2013 I used a 15" MacBook Pro and was absolutely thrilled with it. After 4 years of very heavy use it started to crap out (battery life sucked, graphics were glitching, etc..). So, I took it to the Apple store and looked to see what it would take to get repaired. After a diagnostic, they said they would need to _literally_ replace everything but the hard drive and that would cost something around $600. That price was reasonable to me, the only issue is I would be 3-5 business days without a computer, which is not an option since I run my business from it. So I decided to get a maxed out 13" MacBook Pro to try out while it was getting repaired, as I could sell my 15" if I liked the new 13" version.

I ended up liking the new 13". Not loving, but just liking. I got in a car accident a few years ago and injured my back and am still dealing with daily pain. The 13" is significantly lighter than my 4.5lb 15" and that was enough of a motivation to keep it. I did note, however, that the 13" was _significantly_ less powerful than my 15" from 4 years ago even though both cost about $3,000. Realistically as someone who does web development, I don't need a super powerful machine, so I was OK with the trade-off.

Fast forward a month and I go to open my MacBook after lunch one day and the screen is black. I press the power and get nothing, so I figure it's dead and I go to charge it. Still nothing. I think it might be my charger so I borrow a colleague's. Still nothing. Now I'm annoyed thinking my new computer is broken, but I reluctantly take it to the apple store. They verify that it is a hardware failure and offer to perform a warranty repair. I do it but am now frustrated as I'm going to be 3-5 days without a laptop which is why I purchased the new MacBook Pro in the first place.

After some thought, I decided to install Linux (Ubuntu) on my desktop PC that I rarely use. This wasn't a huge deal for me as I use vim as my primary editor anyway and prefer working from the command line when possible. I then hit a snag. I have a 3 monitor "tie fighter" setup where I have a 27" 4k monitor in the center and two 22" 1080p monitors to each side, inverted on a 90-degree angle. Since I am pretty much unable (comfortably) to read 4k text at the native resolution I need to upscale that display. This is fine on OS X and Windows, but for Ubuntu per-display scaling is not working properly. This meant that if I wanted to upscale my 4k I needed to run each of the 1080s at 720p which makes all of the apps look janky or be completely unusable. With that being said, I didn't have much of a choice so I used that until my MacBook came back.

After about another month, it broke again. This time the OS wouldn't boot. I couldn't even get to recovery mode. So another trip the Apple store and another 3-5 days out for repairs. Back to Ubuntu.

Then it broke again in January. The sound stopped functioning and other oddities. I went back to the Apple store visibly upset. This was now the third time I had to take it in for repairs and the lost productivity is costly. The people at the store were very helpful and offered to give me a brand new laptop (basically allowing me to return my old one and purchase a new one). I was grateful for this and used my new MacBook happily for a few months. I also purchased Apple Care _$269_ because I knew that the reliability of this device was now questionable.

I had the issues that everyone does with keys sticking, and I had occasional crashes and screen failures, but overall it worked. This served me pretty well until May. Then, I came into the office and opened up my laptop and started to wipe off the screen. That is when I noticed a small crack in the black bar below the screen next to the "MacBook Pro" logo. I was taken abash by this as I take extremely good care of my hardware. It's been in a case since day 1, stays mostly on my desk, and I never dropped it or closed the lid with something left in between. After some research, I found this <a href="https://discussions.apple.com/thread/7995345" target="_blank" rel="noopener">forum thread with over 10 pages of complaints</a> about similar issues.

![Laptop Crack](/images/laptop-crack.jpg)

At this point, I am beyond frustrated with Apple as they have just accepted mediocrity as the norm. I will no longer be a customer nor recommend Apple products to anyone I know.

## Windows to the Rescue!

I have been keeping an eye on Windows for a couple of years now and have been keenly interested in them ever since they released their Windows Subsystem for Linux (WSL) previously known as Bash on Windows. I tried using it a few times in the past but ran into many issues getting my development environment set up. For a while, I had CYGWIN installed and SSH'd into an Ubuntu VM and that worked swimmingly. The issue with that is that if I was running this setup on a laptop, running a VM 24/7 would kill the battery life and degrade performance to an extent.

I am happy to say that WSL now works exactly as I need it to and I really don't have any complaints. Some things I discovered and/or noticed:

### You can run multiple distributions simultaneously

This is really cool. Being able to run Ubuntu + anything else in a non virtualized environment is awesome. Microsoft even [created a useful](https://docs.microsoft.com/en-us/windows/wsl/wsl-config) tool wslconfig.exe that allows for easy configuration management/switching between distributions. This means you can test things without having to break your environment (see my next point).

### Ubuntu 18.04 is still buggy

I am still running 16.04 as I found that the latest LTS is not working for whatever reason. Basically, I cannot get NGINX to properly pass to PHP (getting timeouts) and I am having issues accessing MySQL. I wouldn't even call this an annoyance because I can operate on 16.04 without any issues. I look forward to running 18.04 when it's stable.

### You can use 3rd party terminals

Microsoft's default terminal is pretty crappy. It gets the job done, but doesn't have any of the niceties that I've come accustomed to. I like to heavily modify my color scheme and change the fonts - neither of which have an easy configuration in the default terminal. The good news is that there are a lot of terminal emulators available. Here are a couple that I liked:

- [WSLTTY](https://github.com/mintty/wsltty) - This is my main driver and does everything I need.
- [WSL Terminal](https://github.com/goreliu/wsl-terminal) - I like this because it's based on MinTTY which is what I ran on Cygwin so I'm used to the configuration.
- [Hyper](https://hyper.is/) - This is an interesting choice. While I'm hesitant to use a terminal that is an Electron app, I do have to say that the interface and configuration is refreshingly simple.

### You can edit/share files between WSL and Windows

This used to not always be the case. Previously it was warned that if you edited a WSL file on Windows you risked corrupting your system. This meant if I wanted to edit a WSL file in a GUI text editor it was not possible. Thankfully, this is no longer the case. The only caveat is that the file you're editing can't be in the WSL home directory. What this practically means for me is that I have my webroot set to a place in my windows user directory (`/mnt/c/Users/zach/www/html`) and everything works fine.

### VS Code has WSL support?!

I have to say that I'm pretty impressed by Microsoft with this one. VS Code now has first-class support for files from WSL, so no more having to worry about line ending issues. It also has native support to run bash & debug NodeJS applications on WSL from within the editor. I now seriously considering trying out VS Code as my primary editor.

### Docker works

I have been using containers more and more and I'm happy to know that Docker works on WSL. All you need to do is install Docker for Windows and then follow this [official guide](https://blogs.msdn.microsoft.com/commandline/2017/12/08/cross-post-wsl-interoperability-with-docker/) to connect to the Windows Docker Daemon from WSL. I haven't experimented with Kubernetes on WSL yet, but that's up next.

## Conclusion

The takeaway here is that OS X is not the only viable machine for web development. With the huge drop in quality of their hardware and software it may be worth considering other options. Microsoft has been making _huge_ strides to satisfy the developer community's needs by creating WSL and making it intuitive and useful. Bravo Microsoft!

What are your thoughts? Have you tried creating a development environment in windows?
