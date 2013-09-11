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
}