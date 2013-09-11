///<reference path='../definitions/JQuery.d.ts'/>
///<reference path='../definitions/VideoJS.d.ts'/>
///<reference path='IVideo.ts'/>
///<reference path='../../bower_components/videojs-plugin-components/vjsplugincomponents.d.ts'/>
///<reference path='../../bower_components/videojs-poster-plugin/vjsposterplugin.d.ts'/>
module AtlantisJS {
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
}