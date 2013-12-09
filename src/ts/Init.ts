///<reference path='../definitions/JQuery.d.ts'/>
///<reference path='../definitions/VideoJS.d.ts'/>
///<reference path='IVideo.ts'/>
///<reference path='MapAnnotationToOverlay.ts'/>
///<reference path='MapEndOfVideoOptionsToOverlay.ts'/>
///<reference path='MapHotspotsToOverlays.ts'/>
///<reference path='MapLogoToOverlay.ts'/>
///<reference path='MapPauseCallToActionsToOverlay.ts'/>
///<reference path='MapTitleToPoster.ts'/>
///<reference path='../../bower_components/videojs-plugin-components/vjsplugincomponents.d.ts'/>
///<reference path='../../bower_components/videojs-poster-plugin/vjsposterplugin.d.ts'/>
module AtlantisJS {

    export function BuildOverlays(video: IVideo) {
        var videoOverlays: VjsPluginComponents.IOverlaySpecification[] = [];

        if (typeof (video.endOfVideoOptions) !== "undefined") {
            videoOverlays.push(MapEndOfVideoOptionsToOverlay(video.endOfVideoOptions));
        }

        if (typeof (video.hotspots) !== "undefined") {
            videoOverlays = videoOverlays.concat(MapHotSpotsToOverlays(video.hotspots));
        }

        if (typeof (video.annotation) !== "undefined") {
            videoOverlays.push(MapAnnotationToOverlay(video.annotation));
        }

        if (typeof (video.pauseCallToAction) !== "undefined") {
            videoOverlays.push(MapPauseCalltoActionsToOverlay(video.pauseCallToAction));
        }

        for (var i = 0; i < videoOverlays.length; i++) {
            if (typeof videoOverlays[i].events["onCreate"] === "undefined") {
                videoOverlays[i].events["onCreate"] = [];
            }

            videoOverlays[i].events["onCreate"].push((args) => {
                window["SelectorQueries"].addElements([args.overlay.layer.container[0]]);
            });
        }

        return videoOverlays;
    }

    export function ChangeVideo(player, video: IVideo) {
        jQuery(player.el()).children(".vjs-tech").attr("poster", "");
        var newVideo = new VjsPluginComponents.Video(video.sources, function (src) { return player.changeSrcResetTime(src) });
        newVideo.overlays = BuildOverlays(video);
        newVideo.id = video.id;
        player.setVideo(newVideo);
    }

    export function CreateChangeVideoByIdFunc(player, videos: IVideo[]) {
        return function (id:string) {
            var video = jQuery.grep(videos, (elem, i) => {
                return elem.id == id;
            })[0];

            ChangeVideo(player, video);
        }
    }

    export function Init(input: IPlayerInput) {
        var video: IVideo = input.videos[0];
        var playerPosters: Poster.IPosterSpecification[] = [];
        var playerOverlays: VjsPluginComponents.IOverlaySpecification[] = [];

        if (typeof (video.title) !== "undefined") {
            playerPosters.push(MapTitleToPoster(video.title));
        }

        if (typeof (input.options) !== "undefined" && typeof (input.options.logo) !== "undefined") {
            playerOverlays.push(MapLogoToOverlay(input.options.logo));
        }

        var plugins = {
                    'googleAnalyticsPlugin': {
                    },
                    'resolutionSwitchingPlugin': {
                    },
                    'overlayPlugin': {
                        videoOverlays: BuildOverlays(video),
                        playerOverlays: playerOverlays
                    },
                    'posterPlugin': {
                        posters: playerPosters
                    }
                };

        if (typeof (input.options) === "undefined" 
            || typeof (input.options.socialSharing) === "undefined"
            || input.options.socialSharing === true) 
        {
            plugins['sharingPlugin'] = {};
        } 

        var player = new VjsPluginComponents.Player(
            _V_(video.id, {
                'plugins': plugins
            }));

        player.getVideo().aspectRatio = video.aspectRatio;

        player["changeVideo"] = ChangeVideo;
        var changeByIdFunc = CreateChangeVideoByIdFunc(player, input.videos);
        player["changeVideoById"] = changeByIdFunc;

        VjsPluginComponents.ApplySingleService(player)("changeVideoByIdFunc")(() => { return changeByIdFunc; });

        var durationHasBeenSet = false;
        player.one("durationset", function () {
            durationHasBeenSet = true;
        });

        player.one("play", function () {
            var videosrc = player.currentSrc();
            if (durationHasBeenSet === false && player._player["ia"] && player._player["ia"] === "Html5") {
                player.src(videosrc + "?a=1");
            }
        });

        return player;
    }
}