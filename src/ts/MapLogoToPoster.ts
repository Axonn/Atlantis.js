///<reference path='../definitions/JQuery.d.ts'/>
///<reference path='../definitions/VideoJS.d.ts'/>
///<reference path='IVideo.ts'/>
///<reference path='../../bower_components/videojs-plugin-components/vjsplugincomponents.d.ts'/>
///<reference path='../../bower_components/videojs-poster-plugin/vjsposterplugin.d.ts'/>
module AtlantisJS {
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
}