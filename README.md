![Atlantis.js](http://atlantisjs.s3.amazonaws.com/test/atlantisjs/v0.9.1/atlantisLogo.png)
==========================================================================================

[![Build Status](https://travis-ci.org/Axonn/Atlantis.js.png?branch=master)](https://travis-ci.org/Axonn/Atlantis.js)

Atlantis.js = video.js + plugins + content marketing centric embed code

Atlantis.js is a video player designed specifically for content marketing gurus and growth hackers alike. With a whole host of features such as call to actions and analytics tracking it is our goal to provide a simple to use video player for marketers.

Another video player? Why not just use video.js + plugins?
----------------------------------------------------------

Video.js is a fantastic piece of work and continues to grow and improve every day. While video.js is great for expansion and fiddling we found after developing a few websites that we needed something simple yet powerful. A single source file, a more declarative sytax, and a single platform brings us these things.

Narrowing the scope to content marketing also helps us greatly. Being able to use phrases such as 'call to action' and 'hotspots' allow us to convey ideas without confusing anyone. Atlantis.js is opinionated for better or for worse.

At ReelContent we have developed as much functionality as possible to work as plugins for video.js so if you don't want everything on offer here you're very much welcome free to go and use that functionality without using our player.

## Quick Start

 The quickest way to get started with AtlantisJS to create a webpage and insert the latest

 Insert the necessary scripts:

	$ <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    $ <script src="http://atlantisjs.s3.amazonaws.com/atlantisjs/v0.9.1/atlantis.js" type="text/javascript"></script>
    $ <link rel="stylesheet" href="../build/js/atlantisjs.css" type="text/css" />

 Add the relevant source code to your webpage:

    $ <video id="vid1" class="ajs-default-skin atlantis-js" controls preload="auto" width="640" height="266"
    $    poster="http://video-js.zencoder.com/oceans-clip.png"> 
    $    <source src="http://video-js.zencoder.com/oceans-clip.ogv" type='video/ogg' data-resolution="240p">	
    $    <source src="http://video-js.zencoder.com/oceans-clip.mp4" type="video/mp4" data-resolution="240p">
    $    <source src="http://video-js.zencoder.com/oceans-clip.mp4" type='video/mp4' data-resolution="480p">
    $    <source src="http://video-js.zencoder.com/oceans-clip.webm" type='video/webm' data-resolution="240p">
    $    <source src="http://video-js.zencoder.com/oceans-clip.webm" type='video/webm' data-resolution="480p">
    $ </video>
	