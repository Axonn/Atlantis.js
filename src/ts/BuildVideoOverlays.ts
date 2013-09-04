///<reference path='../definitions/JQuery.d.ts'/>

module AtlantisJs {
    export function BuildVideoOverlays(video) {
        var videoOverlays = [];
        if (typeof video.annotation !== "undefined") {
            videoOverlays.push({
                template: {
                    name: "test"
                },
                model: {
                    "class": "center-video-text",
                    name: "<span class='video-annotation'>" + video.annotation + "</span>"
                },
                displayTimes: [{
                    type: "switch",
                    start: function () { return 0 },
                    end: function (duration) { return duration - 0.1; }
                }]
            });
        }

        if (typeof video.eovCallToAction !== "undefined") {
            videoOverlays.push({
                template: {
                    name: "test"
                },
                model: {
                    "class": "calltoaction",
                    name: "<div class='calltoactioninsert'><h1>" + video.eovCallToAction.title + "</h1><p><span style='color:#FFFFF1;'>" + video.eovCallToAction.subtitle + "</span></p><form action='javascript:void(0);'><input class='css3button' type='submit' value='" + video.eovCallToAction.buttonText + "'></form></div>"
                },
                displayTimes: [{
                    type: "switch",
                    start: function (duration) { return duration - 0.1; },
                    end: function (duration) { return duration; }
                }],
                events: {
                    "onCreate": [function (args) {
                        jQuery('input.css3button').click(function () {
                            args.player.trigger("action", { name: "calltoactionclick" });
                            displayformrunEffect();
                        });
                    }]
                }
            });
        }

        if (typeof video.relatedVideos !== "undefined") {
            if (video.relatedVideos.linkTarget === "player") {
                videoOverlays.push(buildSideBarVideoTemplate(video.relatedVideos));
            } else if (video.relatedVideos.linkTarget === "newPage") {
                videoOverlays.push(buildRelatedVideoTemplate(video.relatedVideos));
            }
        }
        return videoOverlays;
    }
}