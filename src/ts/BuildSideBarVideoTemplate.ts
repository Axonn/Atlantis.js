///<reference path='../definitions/JQuery.d.ts'/>
///<reference path='../definitions/VideoJS.d.ts'/>
module AtlantisJs {
    export function Init(videos, options) {
        //return _V_(videos[0].title,
        var vjsOptions = {};

            {
                'plugins': {
                    'googleAnalyticsPlugin': {
                    },
                    'resolutionSwitchingPlugin': {
                    },
                    'sharingPlugin': {
                    },
                    'overlayPlugin': {
                    overlays: ajsBuildVideoOverlays(ajsVideos["marketingVideo"])
                    },
                    'posterPlugin': {
                    posters: [
                        {
                            template: {
                                name: "test"
                            },
                            model: {
                                "class": "video-poster-mask",
                                name: ""
                            },
                            events: {
                                onCreate: [function (args) {
                                    args.poster.container.click(function () {
                                        args.player.play();
                                    });
                                }]
                            }
                        },
                        {
                            template: {
                                name: "test"
                            },
                            model: {
                                "class": "video-pause-toggle",
                                name: "<span class='video-pause-call-to-action'>Read our white paper <a href='http://www.reelcontent.co.uk/resources/white-papers/maximising-muccess-with-online-video'>Maximising Success with Online Video</a></span>"
                            },
                            events: {
                                onCreate: [function (args) {
                                    args.poster.container.addClass("vjsInvisible");
                                    args.poster.container.children(".video-pause-toggle").click(function () {
                                        args.player.trigger("action", { name: "videopausecalltoactionclick" });
                                    });

                                    args.poster.container.click(function () {
                                        args.player.play();
                                    });
                                    args.player.on("pause", function () {
                                        args.poster.container.children(".video-pause-toggle").addClass("vjsVisible");
                                        args.poster.container.removeClass("vjsInvisible");
                                    });
                                    args.player.on("play", function () {
                                        args.poster.container.addClass("vjsInvisible");
                                        args.poster.container.children(".video-pause-toggle").removeClass("vjsVisible");
                                    });
                                }]
                            }
                        },
                        {
                            template: {
                                name: "test"
                            },
                            model: {
                                "class": "video-poster-title",
                                name: "Why Video Content Marketing?"
                            }
                        }
                    ]
                    }
            }
            });
    }
}