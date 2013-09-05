///<reference path='../definitions/JQuery.d.ts'/>
///<reference path='../definitions/VideoJS.d.ts'/>
///<reference path='IVideo.ts'/>
///<reference path='../../bower_components/videojs-plugin-components/vjsplugincomponents.d.ts'/>
module AtlantisJS {
    export function MapEndOfVideoOptionsToOverlay(endOfVideoOptions: IEndOfVideoOptions) {
        var template = typeof endOfVideoOptions.template !== 'undefined' ? endOfVideoOptions.template : "ajsEndOfVideoDefault";

        var overlay: VjsPluginComponents.IOverlaySpecification = {
            template: {
                name: template
            },
            model: endOfVideoOptions,
            displayTimes: [{
                type: "switch",
                start: (duration) => duration ,
                end: (duration) => duration
            }],
            events: {}
        }

        return overlay
    }

    export function MapHotSpotToOverlay(hotspot: IHotspot, index: number) {
        var onCreateFuncs = [];
        if (hotspot.linkTarget === "player") {
            onCreateFuncs.push((args) => {
                args.overlay.layer.container.children().click(() => {
                    args.player.pause();
                    var splashOverlay: VjsPluginComponents.IOverlay = args.overlays.getEntityByName("hotspotSplashPage" + index);
                    splashOverlay.layer.container.addClass("vjsVisible")
                });
            });
        };

        var template = typeof hotspot.template !== 'undefined' ? hotspot.template : "ajsHotspotDefault";

        var overlay: VjsPluginComponents.IOverlaySpecification = {
            name: ("hotspot" + index),
            template: {
                name: template
            },
            model: {
                top: hotspot.top,
                left: hotspot.left,
                height: hotspot.height,
                width: hotspot.width,
                linkTarget: hotspot.linkTarget,
                linkUrl: hotspot.linkUrl
            },
            displayTimes: [{
                type: "switch",
                start: function () { return hotspot.start },
                end: function () { return hotspot.end }
            }],
            events: {
                "onCreate": [function (args) {
                    jQuery('input.css3button').click(function () {
                        args.player.trigger("action", { name: "calltoactionclick" });
                    });
                }]
            }
        }

        return overlay
    }

    export function MapSplashPageToOverlay(hotspot: IHotspot, index: number) {
        var template = typeof hotspot.linkTemplate !== 'undefined' ? hotspot.linkTemplate : "ajsHotspotSplashPageDefault";

        var overlay: VjsPluginComponents.IOverlaySpecification = {
            name: ("hotspotSplashPage" + index),
            template: {
                name: template
            },
            model: hotspot.linkSplashData,
            displayTimes: [],
            events: {}
        }

        return overlay
    }

    export function MapHotSpotsToOverlays(hotspots: IHotspot[]) {
        var overlays: VjsPluginComponents.IOverlaySpecification[] = [];
        for (var i = 0; i < hotspots.length; i++) {
            overlays.push(MapHotSpotToOverlay(hotspots[i], i));
            overlays.push(MapSplashPageToOverlay(hotspots[i], i));
        }
        return overlays;
    }

    export function MapAnnotationToOverlay(annotation: IAnnotation) {
        var template = typeof annotation.template !== 'undefined' ? annotation.template : "ajsAnnotationDefault";

        var overlay: VjsPluginComponents.IOverlaySpecification = {
            template: {
                name: template
            },
            model: {
                annotation: annotation.text
            },
            displayTimes: [{
                type: "switch",
                start: function () { return 0 },
                end: function (duration) { return duration - 0.1; }
            }],
            events: {}
        }

        return overlay
    }

    export function MapLogoToOverlay(logo: ILogo) {
        var template = typeof logo.template !== 'undefined' ? logo.template : "ajsLogoDefault";

        var overlay: VjsPluginComponents.IOverlaySpecification = {
            template: {
                name: template
            },
            model: {
                url: logo.url
            },
            displayTimes: [{
                type: "switch",
                start: function () { return 0 },
                end: function (duration) { return duration - 0.1; }
            }],
            events: {}
        }

        return overlay
    }

    export function MapTitleToOverlay(title: ITitle) {
        var template = typeof title.template !== 'undefined' ? title.template : "ajsTitleDefault";

        var overlay: VjsPluginComponents.IOverlaySpecification = {
            template: {
                name: template
            },
            model: {
                title: title.text
            },
            displayTimes: [{
                type: "switch",
                start: function () { return 0 },
                end: function (duration) { return duration - 0.1; }
            }],
            events: {}
        }

        return overlay
    }

    export function MapPauseCalltoActionsToOverlay(callToAction: IPauseCallToAction) {
        var template = typeof callToAction.template !== 'undefined' ? callToAction.template : "ajsPauseCallToActionDefault";

        var overlay: VjsPluginComponents.IOverlaySpecification = {
            template: {
                name: template
            },
            model: {
                text: callToAction.text
            },
            displayTimes: [],
            events: {
                onCreate: [function (args) {
                    args.poster.container.addClass("vjsInvisible");
                    args.poster.container.children().click(function () {
                        args.player.trigger("action", { name: "PauseCallToActionClick" });
                    });

                    args.poster.container.click(function () {
                        args.player.play();
                    });
                    args.player.on("pause", function () {
                        args.poster.container.children().addClass("vjsVisible");
                        args.poster.container.removeClass("vjsInvisible");
                    });
                    args.player.on("play", function () {
                        args.poster.container.addClass("vjsInvisible");
                        args.poster.container.children().removeClass("vjsVisible");
                    });
                }]}
        }

        return overlay;
    }

    export function Init(videos: IVideo[], options: IPlayerOptions) {
        var video: IVideo = videos[0];
        var videoOverlays: VjsPluginComponents.IOverlaySpecification[] = [];
        var playerOverlays: VjsPluginComponents.IOverlaySpecification[] = [];

        videoOverlays.push(MapEndOfVideoOptionsToOverlay(video.endOfVideo));
        videoOverlays = videoOverlays.concat(MapHotSpotsToOverlays(video.hotspots));
        videoOverlays.push(MapAnnotationToOverlay(video.annotation));
        videoOverlays.push(MapTitleToOverlay(video.title));
        videoOverlays.push(MapPauseCalltoActionsToOverlay(video.pauseCallToAction));

        playerOverlays.push(MapLogoToOverlay(options.logo));

        return new VjsPluginComponents.Player(
            _V_(video.id,{
                'plugins': {
                    'googleAnalyticsPlugin': {
                    },
                    'resolutionSwitchingPlugin': {
                    },
                    'sharingPlugin': {
                    },
                    'overlayPlugin': {
                        videoOverlays: videoOverlays,
                        playerOverlays: playerOverlays
                    }
                }
            }));	
    }
}