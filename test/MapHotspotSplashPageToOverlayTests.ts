/// <reference path="../src/definitions/Jasmine.d.ts" />
/// <reference path="../src/ts/MapHotspotSplashPageToOverlay.ts" />
/// <chutzpah_reference path="../../../lib/JQuery/jquery-1.9.1.js" />

describe("MapHotspotSplashPageToOverlayTests", () => {
    it("Returns expected values for default input", () => {
        var splashData = {
            imageUrl: "whiteLogo.png",
                button1Text: "GitHub",
                button2Text: "Back to Video"
            };

        var hotspot: AtlantisJS.IHotspot = {
            start: 67.4,
            position: [{
                duration: 5.3,
                path: jasmine.createSpy("hotspot.position.path1"),
            },
                {
                    duration: 0.4,
                    path: jasmine.createSpy("hotspot.position.path2"),
                },
                {
                    duration: 16,
                    path: jasmine.createSpy("hotspot.position.path3"),
                }],
            height: 0.32,
            width: 0.18,
            linkTarget: "splash",
            linkSplashData: splashData,
            text: "Example Hotspot"
        };

        var output = AtlantisJS.MapSplashPageToOverlay(hotspot, 2);

        expect(output.template.name).toBe("ajsHotspotSplashPageDefault");
        expect(output.name).toBe("hotspotSplashPage2");
        expect(output.model).toBe(splashData);
    });
});