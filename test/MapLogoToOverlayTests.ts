/// <reference path="../src/definitions/Jasmine.d.ts" />
/// <reference path="../src/ts/MapLogoToOverlay.ts" />
/// <chutzpah_reference path="../../../lib/JQuery/jquery-1.9.1.js" />

describe("MapLogoToOverlayTests", () => {
    it("Returns expected values for default input", () => {
        var logo: AtlantisJS.ILogo = {
            src: "http://www.atlantis.js/logo.png",
            link: "http://www.atlantis.js/"
            };

        var output = AtlantisJS.MapLogoToOverlay(logo);

        expect(output.template.name).toBe("ajsLogoDefault");
        expect(output.model).toEqual(logo);
        expect(output.displayTimes[0].start(5)).toBe(0);
        expect(output.displayTimes[0].end(5)).toBe(4.9);
    });
});