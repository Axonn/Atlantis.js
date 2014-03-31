/// <reference path="../src/definitions/Jasmine.d.ts" />
/// <reference path="../src/ts/MapEndOfVideoOptionsToOverlay.ts" />
/// <chutzpah_reference path="../bower_components/jquery/jquery.min.js" />
/// <chutzpah_reference path="../bower_components/videojs-plugin-components/vjsplugincomponents.js" />
describe("MapEndOfVideoOptionsToOverlayTests", () => {
    it("Returns expected values for default input", () => {
        var annotationText = "Basic Annotation";
        var templateName = "Basic Annotation";
        var options: AtlantisJS.IEndOfVideoOptions = {
            callToAction: {
                title: "hello",
                subtitle: "world",
                button: {
                    text: "button",
                    link: "http://www.atlantis.js"
                }
            },
            relatedVideos: {
                title: "Related Videos",
                items: [{
                    title: "New Video",
                    img: "http://www.atlantis.js/img1.png"
                }]
            },
            template: templateName
        };


        var output = AtlantisJS.MapEndOfVideoOptionsToOverlay(options);

        expect(output.template.name).toBe(templateName);
        expect(output.model).toBe(options);
        expect(output.displayTimes[0].start(5)).toBe(4.9);
        expect(output.displayTimes[0].end(5)).toBe(5.1);
    });

    it("Returns expected values for no specified template all set", () => {
        var annotationText = "Basic Annotation";
        var options: AtlantisJS.IEndOfVideoOptions = {
            callToAction: {
                title: "hello",
                subtitle: "world",
                button: {
                    text: "button",
                    link: "http://www.atlantis.js"
                }
            },
            relatedVideos: {
                title: "Related Videos",
                items: [{
                    title: "New Video",
                    img: "http://www.atlantis.js/img1.png"
                }]
            },
        };


        var output = AtlantisJS.MapEndOfVideoOptionsToOverlay(options);

        expect(output.template.name).toBe("ajsEndOfVideoDefault");
        expect(output.model).toBe(options);
        expect(output.displayTimes[0].start(5)).toBe(4.9);
        expect(output.displayTimes[0].end(5)).toBe(5.1);
    });

    it("Returns expected values for no specified template all set", () => {
        var annotationText = "Basic Annotation";
        var options: AtlantisJS.IEndOfVideoOptions = {
            relatedVideos: {
                title: "Related Videos",
                items: [{
                    title: "New Video",
                    img: "http://www.atlantis.js/img1.png"
                }]
            },
        };


        var output = AtlantisJS.MapEndOfVideoOptionsToOverlay(options);

        expect(output.template.name).toBe("ajsEndOfVideoRelatedVideosDefault");
        expect(output.model).toBe(options);
        expect(output.displayTimes[0].start(5)).toBe(4.9);
        expect(output.displayTimes[0].end(5)).toBe(5.1);
    });

    it("Returns expected values for no specified template all set", () => {
        var annotationText = "Basic Annotation";
        var options: AtlantisJS.IEndOfVideoOptions = {
            callToAction: {
                title: "hello",
                subtitle: "world",
                button: {
                    text: "button",
                    link: "http://www.atlantis.js"
                }
            }
        };


        var output = AtlantisJS.MapEndOfVideoOptionsToOverlay(options);

        expect(output.template.name).toBe("ajsEndOfVideoCallToActionDefault");
        expect(output.model).toBe(options);
        expect(output.displayTimes[0].start(5)).toBe(4.9);
        expect(output.displayTimes[0].end(5)).toBe(5.1);
    });

    // it("adds video change functionality to related videos", () => {
        // var annotationText = "Basic Annotation";
        // var templateName = "Basic Annotation";
        // var options: AtlantisJS.IEndOfVideoOptions = {
            // callToAction: {
                // title: "hello",
                // subtitle: "world",
                // button: {
                    // text: "button",
                    // link: "http://www.atlantis.js"
                // }
            // },
            // relatedVideos: {
                // title: "Related Videos",
                // items: [{
                    // title: "New Video",
                    // img: "http://www.atlantis.js/img1.png",
                    // linkId: "videoA"
                // }]
            // },
            // template: templateName
        // };


        // var output = AtlantisJS.MapEndOfVideoOptionsToOverlay(options);
        // var doc = jQuery(document.body);
        // doc.append("<a id='testVideoChange' data-video-change='videoA'><div></div></a>");
        // var testElement = jQuery("#testVideoChange");
        // var childSpy = jasmine.createSpy("player.children");
        // childSpy["serviceName"] = "changeVideoByIdFunc";

        // output.events["onCreate"][0]({
            // overlay: {
                // layer: {
                    // container: doc
                // }
            // },
            // player: {
                // children: jasmine.createSpy("player.children").andReturn([ childSpy ])
            // }

        // });

        // testElement.trigger("click");
        // expect(childSpy).toHaveBeenCalledWith("videoA");
        // expect(output.template.name).toBe(templateName);
        // expect(output.model).toBe(options);
        // expect(output.displayTimes[0].start(5)).toBe(4.9);
        // expect(output.displayTimes[0].end(5)).toBe(5.1);
    // });
});