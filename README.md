<p align="center">
  <img src="http://p.ninjacdn.co.uk/atlantisjs/v0.9.2/atlantisLogo.png" alt="AtlantisJS"/>
</p>

==========================================================================================

[![Build Status](https://travis-ci.org/Axonn/Atlantis.js.png?branch=master)](https://travis-ci.org/Axonn/Atlantis.js)

Atlantis.js = video.js + plugins + content marketing centric video embed code

Atlantis.js is a video player designed specifically for content marketing gurus and growth hackers alike. With a whole host of features such as call to actions and analytics tracking it is our goal to provide a simple to use video player for marketers. We still have a way to go.

Another video player? Why not just use video.js + plugins?
----------------------------------------------------------

[Video.js](http://www.videojs.com/) is a fantastic piece of work and continues to grow and improve every day. While video.js is great for expansion and fiddling we found after developing a few websites that we needed something simple yet powerful. A single source file, a more declarative sytax, and a single platform brings us these things.

Narrowing the scope to content marketing also helps us greatly. Being able to use phrases such as 'call to action' and 'hotspots' allow us to convey ideas without confusing anyone. Atlantis.js is opinionated for better or for worse.

At ReelContent we have developed as much functionality as possible to work as plugins for video.js so if you don't want everything on offer here you're very much free to use that functionality without using our player.

## Features

+ Resolution Switching
+ Social Media sharing
+ Related Videos
+ Video Switching
+ Call-to-Actions
+ Google Analytics Integration
+ Hotspots

## Quick Start

Insert the necessary scripts:
```
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script src="http://p.ninjacdn.co.uk/atlantisjs/v0.9.4/atlantis.js" type="text/javascript"></script>
<link rel="stylesheet" href="http://p.ninjacdn.co.uk/atlantisjs/v0.9.4/atlantisjs.css" type="text/css" />
```
Add the relevant source code to your webpage:
```
<video id="video1" class="ajs-default-skin atlantis-js" controls preload="auto" width="640" height="360" poster="http://p.ninjacdn.co.uk/atlantisjs/v0.9.4/atlantisLogoSplash.png"> 	
    <source src="http://media.reelcontent.co.uk/9e4c69c5ae2c215d/old-website/ReelContentVideoContentMarketing360.mp4" type="video/mp4" data-resolution="360p">
	<source src="http://media.reelcontent.co.uk/9e4c69c5ae2c215d/old-website/ReelContentVideoContentMarketing360p.ogg" type="video/ogg" data-resolution="360p">
</video>
```	
Include the following javascript embed code at some point lower down the page:
```
<script>
	var atlantisVideo = AtlantisJS.Init({
		videos: [{
			id: "video1"
		}]
	});
</script>
```

## Going Further

We are currently working on writing more documentation for AtlantisJS. If you wish to see how to use the myriad of features Atlantis provides, the best thing would be to check out the example in examples/example.htm.
