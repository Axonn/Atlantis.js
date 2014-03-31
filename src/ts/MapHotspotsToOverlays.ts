///<reference path='../definitions/JQuery.d.ts'/>
///<reference path='../definitions/VideoJS.d.ts'/>
///<reference path='IVideo.ts'/>
///<reference path='MapHotspotSplashPageToOverlay.ts'/>
module AtlantisJS {
    export function ComputeHotspotPositionFromFunctions(timeFuncs, start) {
        return function (time: number) {
            var t = (time < start) ? start : time;
            var cumulativeTime = start;
            var fraction;
            for (var i = 0; i < timeFuncs.length; i++) {
                fraction = (t - cumulativeTime) / timeFuncs[i].duration;
                cumulativeTime += timeFuncs[i].duration;
                if (t < cumulativeTime) {
                    return timeFuncs[i].path(fraction);
                }
            }

            return timeFuncs[i - 1].path(1);
        }
    }

    export function MapHotSpotToOverlay(hotspot: IHotspot, index: number) {
        var onCreateFuncs = [];

        var positionCalc = ComputeHotspotPositionFromFunctions(hotspot.position, hotspot.start);

        var scaleToPlayerSize = (percentage: { x: number; y: number; }, offset, player) => {
            var playerWidth = parseFloat(jQuery(player.el()).css("width").slice(0, -2));
            var playerHeight = parseFloat(jQuery(player.el()).css("height").slice(0, -2));

            var videoWidth = playerWidth - 2 * offset.x;
            var videoHeight = playerHeight - 2 * offset.y;
            var x = percentage.x * videoWidth;
            var y = percentage.y * videoHeight;
            return { x: x, y: y };
        }

        var percentageToPixel = (percentage: { x: number; y: number; }, player: VjsPluginComponents.IPlayer) => {
            var offset = player.getVideoOffset();

            var scaledPosition = scaleToPlayerSize(percentage, offset, player);
            var x = scaledPosition.x + offset.x;
            var y = scaledPosition.y + offset.y;
            return { x: x, y: y }
        }

        if (hotspot.linkTarget === "splash") {
            onCreateFuncs.push((args) => {
                args.overlay.layer.container.children().click(() => {
                    args.player.pause();
                    var splashOverlay: VjsPluginComponents.IOverlay = args.overlays.getEntityByName("hotspotSplashPage" + index);
                    splashOverlay.layer.container.addClass("vjsVisible")
                });
            });
        };

        var updatePosition = (args, time) => {
            var position = positionCalc(time);
            var pixelPosition = percentageToPixel(position, args.player);
            var hotspotElement = jQuery(args.overlay.layer.container.children()[0])

            hotspotElement.css("left", pixelPosition.x + "px");
            hotspotElement.css("top", pixelPosition.y + "px");
        }

        var updateSize = (args) => {
            var newSize = scaleToPlayerSize({ x: hotspot.width, y: hotspot.height }, args.player.getVideoOffset(), args.player);
            var hotspotElement = jQuery(args.overlay.layer.container.children()[0]);

			//var scaleElements = hotspotElement.find(".ajs-scale-text-80");
			var oldWidth = parseInt(hotspotElement.css("width").slice(0, -2));
			var oldHeight = parseInt(hotspotElement.css("height").slice(0, -2));

			var ratiox = newSize.x / oldWidth;
			var ratioy = newSize.y / oldHeight;

			hotspotElement.css("-ms-transform", "scale(" + ratiox + "," + ratioy + ")");
            hotspotElement.css("-webkit-transform", "scale(" + ratiox + "," + ratioy + ")");
			hotspotElement.css("transform", "scale(" + ratiox + "," + ratioy + ")");
            hotspotElement.css("-webkit-transform-origin", "top left");



            hotspotElement.find(".ajs-parent-height").css("height", newSize.y + "px");
            hotspotElement.find(".ajs-half-negative-parent-margin-bottom").css("margin-bottom",  (- newSize.y / 2) + "px");
        }

        onCreateFuncs.push(function (args) {
            jQuery('input.css3button').click(function () {
                args.player.trigger("action", { name: "hotspotclick" });
            });

            updatePosition(args, hotspot.start);
            updateSize(args);

            args.player.on("fullscreenchange", () => {
				setTimeout(()=>{
                updatePosition(args, args.player.currentTime());
                updateSize(args)
				},100);
            });

        });

        var template = typeof hotspot.template !== 'undefined' ? hotspot.template : "ajsHotspotDefault";

        var hotspotEnd = hotspot.start;
        for (var i = 0; i < hotspot.position.length; i++) {
            hotspotEnd += hotspot.position[i].duration;
        }

        var overlay: VjsPluginComponents.IOverlaySpecification = {
            name: ("hotspot" + index),
            template: {
                name: template
            },
            model: {
                top: hotspot.position[0].path(0).y,
                left: hotspot.position[0].path(0).x,
                linkTarget: hotspot.linkTarget,
                linkUrl: hotspot.linkUrl,
                text: hotspot.text
            },
            displayTimes: [{
                type: "switch",
                start: () => { return hotspot.start; },
                end: () => { return hotspotEnd; }
            }],
            events: {
                "onCreate": onCreateFuncs,
                "afterShow": [function (args) {
                    var nextPosition;
                    var oldTime;
                    

                    args.player.on("timeupdate", () => {
                        var time = args.player.currentTime();
                        var timeDifference = 0.25;
                        var position = percentageToPixel(positionCalc(time), args.player);
                        var nextPosition = percentageToPixel(positionCalc(time + timeDifference), args.player);
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
}