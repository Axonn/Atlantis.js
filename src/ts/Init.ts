///<reference path='../definitions/JQuery.d.ts'/>
///<reference path='../definitions/VideoJS.d.ts'/>
///<reference path='IVideo.ts'/>
///<reference path='../../bower_components/videojs-plugin-components/vjsplugincomponents.d.ts'/>
///<reference path='../../bower_components/videojs-poster-plugin/vjsposterplugin.d.ts'/>
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
                start: (duration) => { return duration } ,
                end: (duration) => { return duration }
            }],
            events: {}
        }

        return overlay
    }

    export function ComputeHotspotPositionFromBezier(curve, start, end) {
        return function (time: number) {
            var boundedtime = (time < start) ? start : time;
            var boundedtime = (boundedtime > end) ? end : boundedtime;
            var t = (boundedtime - start) / (end - start);

            var bezierCubic = function (a0, a1, a2, a3) {
                return ((1 - t) * (1 - t) * (1 - t) * a0) + (3 * (1 - t) * (1 - t) * t * a1) + (3 * (1 - t) * t * t * a2) + (t * t * t * a3);
            }

            var position = {
                x: bezierCubic(curve.p0.x, curve.p1.x, curve.p2.x, curve.p3.x),
                y: bezierCubic(curve.p0.y, curve.p1.y, curve.p2.y, curve.p3.y)
            };
        
            return position
        }
    }

    export function MapHotSpotToOverlay(hotspot: IHotspot, index: number) {
        var onCreateFuncs = [];
        if (hotspot.linkTarget === "splash") {
            onCreateFuncs.push((args) => {
                args.overlay.layer.container.children().click(() => {
                    args.player.pause();
                    var splashOverlay: VjsPluginComponents.IOverlay = args.overlays.getEntityByName("hotspotSplashPage" + index);
                    splashOverlay.layer.container.addClass("vjsVisible")
                });
            });
        };

        onCreateFuncs.push(function (args) {
            jQuery('input.css3button').click(function () {
                args.player.trigger("action", { name: "hotspotclick" });
            });

            var position = positionCalc(hotspot.start);
            var hotspotElement = jQuery(args.overlay.layer.container.children()[0])

            hotspotElement.css("left", position.x + "px");
            hotspotElement.css("top", position.y + "px");
        });

        var template = typeof hotspot.template !== 'undefined' ? hotspot.template : "ajsHotspotDefault";

        var positionCalc = ComputeHotspotPositionFromBezier({
            p0: {
                x: 50,
                y: 50
            },
            p1: {
                x: 75,
                y: 40
            },
            p2: {
                x: 600,
                y: 400
            },
            p3: {
                x: 550,
                y: 25
            }
        }, hotspot.start, hotspot.end);

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
                linkUrl: hotspot.linkUrl,
                text: hotspot.text
            },
            displayTimes: [{
                type: "switch",
                start: () => { return hotspot.start },
                end: () => { return hotspot.end }
            }],
            events: {
                "onCreate": onCreateFuncs,
                "afterShow": [function (args) {
                    var nextPosition;
                    var oldTime;
                    

                    args.player.on("timeupdate", () => {
                        var time = args.player.currentTime();
                        var timeDifference = 0.25;
                        var position = positionCalc(time);
                        var nextPosition = positionCalc(time + timeDifference);
                        var hotspotElement = jQuery(args.overlay.layer.container.children()[0])
                        hotspotElement.clearQueue();
                        
                        hotspotElement.css("left", position.x + "px");
                        hotspotElement.css("top", position.y + "px");
                        var paused = args.player.paused();
                        if (!args.player.paused()) {
                            hotspotElement.animate({ top: nextPosition.y, left: nextPosition.x }, timeDifference * 1000, "linear");
                        }
                        oldTime = time;
                    });
                    args.player.on("pause", () => {
                        var hotspotElement = jQuery(args.overlay.layer.container.children()[0])
                        hotspotElement.stop();
                    });


                    //var defaultAngle = Math.atan((hotspot.top - 110) / (hotspot.left - 540));

                    //jQuery(args.overlay.layer.container.children()[0]).animate({
                    //    path: new jQuery.path.bezier({
                    //        start: {
                    //            x: hotspot.left,
                    //            y: hotspot.top,
                    //            angle: defaultAngle,
                    //            length: 0.3333
                    //        },
                    //        end: {
                    //            x: 540,
                    //            y: 110,
                    //            angle: defaultAngle,
                    //            length: 0.3333
                    //        }
                    //    }),
                    //}, (hotspot.end - hotspot.start) * 1000)
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
            events: {
                onCreate: [(args) => {
                    args.overlay.layer.container.find('.ajs-continue-video').click(() => {
                        args.overlay.layer.container.removeClass("vjsVisible");
                        args.player.play();
                    });
                }]
            }
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
                start: function () { return 0.1 },
                end: function (duration) { return duration - 0.1; }
            }],
            events: {}
        }

        return overlay
    }

    export function MapLogoToPoster(logo: ILogo) {
        var template = typeof logo.template !== 'undefined' ? logo.template : "ajsLogoDefault";

        var overlay: Poster.IPosterSpecification = {
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

    export function MapTitleToPoster(title: ITitle) {
        var template = typeof title.template !== 'undefined' ? title.template : "ajsTitleDefault";

        var overlay: Poster.IPosterSpecification = {
            template: {
                name: template
            },
            model: {
                title: title.text
            },
            events: {
                onCreate: [function (args) {
                    args.poster.container.addClass("vjsVisible");
                    
                    args.player.on("play", function () {
                        args.poster.container.addClass("vjsInvisible");
                        args.poster.container.removeClass("vjsVisible");
                    });
                }]
            }
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
            displayTimes: [{
                type: "switch",
                start: function (duration) { return duration + 1; },
                end: function (duration) { return duration + 1; }
            }],
            events: {
                onCreate: [function (args) {
                    args.overlay.layer.container.addClass("vjsInvisible");
                    args.overlay.layer.container.children().click(function () {
                        args.player.trigger("action", { name: "PauseCallToActionClick" });
                    });

                    args.overlay.layer.container.click(function () {
                        args.player.play();
                    });
                    args.player.on("pause", function () {
                        args.overlay.layer.container.children().addClass("vjsVisible");
                        args.overlay.layer.container.removeClass("vjsInvisible");
                    });
                    args.player.on("play", function () {
                        args.overlay.layer.container.addClass("vjsInvisible");
                        args.overlay.layer.container.children().removeClass("vjsVisible");
                    });
                }]}
        }

        return overlay;
    }

    export function Init(input: IPlayerInput) {
        var video: IVideo = input.videos[0];
        var videoOverlays: VjsPluginComponents.IOverlaySpecification[] = [];
        var playerPosters: Poster.IPosterSpecification[] = [];
        var playerOverlays: VjsPluginComponents.IOverlaySpecification[] = [];

        videoOverlays.push(MapEndOfVideoOptionsToOverlay(video.endOfVideoOptions));
        videoOverlays = videoOverlays.concat(MapHotSpotsToOverlays(video.hotspots));
        videoOverlays.push(MapAnnotationToOverlay(video.annotation));
        videoOverlays.push(MapPauseCalltoActionsToOverlay(video.pauseCallToAction));

        playerPosters.push(MapTitleToPoster(video.title));
        playerPosters.push(MapLogoToPoster(input.options.logo));

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
                    },
                    'posterPlugin': {
                        posters: playerPosters
                    }
                }
            }));	
    }
}