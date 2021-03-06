///<reference path='../definitions/JQuery.d.ts'/>
///<reference path='../definitions/VideoJS.d.ts'/>
///<reference path='IVideo.ts'/>
///<reference path='../../bower_components/videojs-plugin-components/vjsplugincomponents.d.ts'/>
///<reference path='../../bower_components/videojs-poster-plugin/vjsposterplugin.d.ts'/>
module AtlantisJS {

    export function MapEndOfVideoOptionsToOverlay(endOfVideoOptions: IEndOfVideoOptions) {
        var template;

        if (typeof endOfVideoOptions.template !== 'undefined') {
            template = endOfVideoOptions.template;
        } else if (typeof endOfVideoOptions.relatedVideos == 'undefined') {
            template = "ajsEndOfVideoCallToActionDefault";
        } else if (typeof endOfVideoOptions.callToAction == 'undefined') {
            template = "ajsEndOfVideoRelatedVideosDefault";
        } else {
            template = "ajsEndOfVideoDefault";
        }

        var overlay: VjsPluginComponents.IOverlaySpecification = {
            template: {
                name: template
            },
            model: endOfVideoOptions,
            displayTimes: [{
                type: "switch",
                start: (duration) => { return duration - 0.1 },
                end: (duration) => { return duration + 0.1 }
            }],
            events: {
                onCreate: [(args) => {
                    args.overlay.layer.container.find('a[data-video-change]').click(function() {
                        var id = jQuery(this).attr("data-video-change");
                        VjsPluginComponents.GetService(args.player, "changeVideoByIdFunc")(id);
                    });
                }]
            }
        }

        return overlay
    }
}