///<reference path='../definitions/JQuery.d.ts'/>
///<reference path='../definitions/VideoJS.d.ts'/>
///<reference path='IVideo.ts'/>
///<reference path='../../bower_components/videojs-plugin-components/vjsplugincomponents.d.ts'/>
///<reference path='../../bower_components/videojs-poster-plugin/vjsposterplugin.d.ts'/>
module AtlantisJS {
    export function MapPauseCalltoActionsToOverlay(callToAction: IPauseCallToAction) {
        var template = typeof callToAction.template !== 'undefined' ? callToAction.template : "ajsPauseCallToActionDefault";

        var overlay: VjsPluginComponents.IOverlaySpecification = {
            template: {
                name: template
            },
            model: callToAction,
            displayTimes: [{
                type: "switch",
                start: function (duration) { return 0.5 },
                end: function (duration) { return duration - 0.5; }
            }],
            events: {
                onCreate: [function (args) {
                    args.overlay.layer.container.children().click(function () {
                        args.player.trigger("action", { name: "PauseCallToActionClick" });
                    });

                    args.overlay.layer.container.click(function () {
                        args.player.play();
                    });
                    args.player.on("pause", function () {
                        args.overlay.layer.container.children().removeClass("vjsInvisible");
                    });
                    args.player.on("play", function () {
                        args.overlay.layer.container.children().addClass("vjsInvisible");
                    });

					args.overlay.layer.container.find('.ajs-click-continue').click(() => {
                        args.overlay.layer.container.removeClass("vjsVisible");
                        args.player.play();
                    });

					if (typeof callToAction.containerClass !== 'undefined'){
						args.overlay.layer.container[0].className += (" " + callToAction.containerClass);
					}
                }]}
        }

        return overlay;
    }
}