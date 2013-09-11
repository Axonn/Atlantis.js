///<reference path='../definitions/JQuery.d.ts'/>
///<reference path='../definitions/VideoJS.d.ts'/>
///<reference path='IVideo.ts'/>
///<reference path='../../bower_components/videojs-plugin-components/vjsplugincomponents.d.ts'/>
///<reference path='../../bower_components/videojs-poster-plugin/vjsposterplugin.d.ts'/>
module AtlantisJS {
    export function MapTitleToPoster(title: ITitle) {
        var template = typeof title.template !== 'undefined' ? title.template : "ajsTitleDefault";

        var poster: Poster.IPosterSpecification = {
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

        return poster;
    }
}