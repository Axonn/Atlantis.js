<p align="center">
  <img src="http://p.ninjacdn.co.uk/atlantisjs/v0.9.2/atlantisLogo.png" alt="AtlantisJS"/>
</p>

==========================================================================================

[![Build Status](https://travis-ci.org/Axonn/Atlantis.js.png?branch=master)](https://travis-ci.org/Axonn/Atlantis.js)

Atlantis.js = video.js + plugins + content marketing centric video embed code

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
    $ <script src="http://p.ninjacdn.co.uk/atlantisjs/v0.9.1/atlantis.js" type="text/javascript"></script>
    $ <link rel="stylesheet" href="../build/js/atlantisjs.css" type="text/css" />

 Add the relevant source code to your webpage:

    $ <video id="video1" class="ajs-default-skin atlantis-js" controls preload="auto" width="640" height="266"
    $    poster="http://video-js.zencoder.com/oceans-clip.png"> 	
    $    <source src="http://media.reelcontent.co.uk/9e4c69c5ae2c215d/old-website/ReelContentVideoContentMarketing.mp4" type="video/mp4" data-resolution="240p">
    $ </video>
	
 Include the following javascript:

```
     var atlantisVideo = AtlantisJS.Init({
				videos: [{
					id: "video1",
					title: { text: "AtlantisJS" },
					aspectRatio: "320:133",
					sources: [{
						resolution: "240", 
						type: "video/mp4", 
						src:"http://media.reelcontent.co.uk/9e4c69c5ae2c215d/old-website/ReelContentVideoContentMarketing.mp4"
					}],
					endOfVideoOptions: {
						callToAction: {
							title: "78% of people watch online video every week",
							subtitle: "Shouldn't you be engaging the growing audience?",
							buttonText: "Press play on your marketing"
						},
						relatedVideos: {
							linkTarget:"player",
							title: "Related Videos",
							items: [
								{	
									img: "<?= $base ?>assets/video_poster/StudioSmall.jpg", 
									title: "Studio Videos",
									linkId: "related-studio"
								},
								{	
									img: "<?= $base ?>assets/video_poster/OnLocationSmall.jpg", 
									title: "On Location Videos",
									linkId: "related-on-location"
									
								},
								{	
									img: "<?= $base ?>assets/video_poster/AnimatedSmall.jpg", 
									title: "Animation Videos",
									linkId: "related-animation"
								}
							]
						}
					},
					hotspots: [{
						start: 5,
						position: [{
								duration: 4,
								transition: AtlantisJS.CubicBezier(0,0, 0,1, 1, 0, 0, 0)
							},
							{
								duration: 0.1,
								transition: AtlantisJS.Static(0,0)
							},
							{
								duration: 3,
								transition: AtlantisJS.Linear(0,0, 0,0.9)
							},
							{
								duration: 0.5,
								transition: AtlantisJS.Linear(0,0.9, 0.45,0.45)
							},
							{
								duration: 2,
								transition: AtlantisJS.Static(0.45,0.45)
							},
							{
								duration: 0.5,
								transition: AtlantisJS.Linear(0.45,0.45, 0.9,0.9)
							}],
						height: 0.1,
						width: 0.1,
						linkTarget: "splash",
						linkSplashData: {
							title: "<span>Atlantis</span>JS",
							subtitle: "Web Video Player",
							url: "https://github.com/Axonn/Atlantis.js",
							button1Text: "GitHub",
							button2Text: "Back to Video"
						}
					}],
					annotation: {
						text: "Example Video"
					},
					pauseCallToAction: {
						text: "Read our white paper <a href='http://www.reelcontent.co.uk/resources/white-papers/maximising-muccess-with-online-video'>Maximising Success with Online Video</a>"
					}
				}],
				options: {
					logo: {
						url: "http://www.reelcontent.co.uk/assets/reelcontent/logo.png"
					}
				}
			});
     </video>
	 
```