///<reference path='../definitions/JQuery.d.ts'/>
///<reference path='../definitions/VideoJS.d.ts'/>
///<reference path='IVideo.ts'/>
///<reference path='MapAnnotationToOverlay.ts'/>
///<reference path='MapEndOfVideoOptionsToOverlay.ts'/>
///<reference path='MapHotspotsToOverlays.ts'/>
///<reference path='MapLogoToPoster.ts'/>
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

        playerPosters.push(MapTitleToPoster(video.title));
        playerPosters.push(MapLogoToPoster(input.options.logo));

        var player = new VjsPluginComponents.Player(
            _V_(video.id, {
                'plugins': {
                    'googleAnalyticsPlugin': {
                    },
                    'resolutionSwitchingPlugin': {
                    },
                    'sharingPlugin': {
                    },
                    'overlayPlugin': {
                        videoOverlays: BuildOverlays(video),
                        playerOverlays: playerOverlays
                    },
                    'posterPlugin': {
                        posters: playerPosters
                    }
                }
            }));

        player.getVideo().aspectRatio = video.aspectRatio;

        player["changeVideo"] = ChangeVideo;
        player["changeVideoById"] = CreateChangeVideoByIdFunc(player, input.videos);

        return player;
    }
}