///<reference path='../definitions/JQuery.d.ts'/>
///<reference path='../definitions/VideoJS.d.ts'/>
///<reference path='IVideo.ts'/>
///<reference path='../../bower_components/videojs-plugin-components/vjsplugincomponents.d.ts'/>
///<reference path='../../bower_components/videojs-poster-plugin/vjsposterplugin.d.ts'/>
module AtlantisJS {
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
}