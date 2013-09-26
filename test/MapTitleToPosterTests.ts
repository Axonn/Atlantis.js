/// <reference path="../src/definitions/Jasmine.d.ts" />
/// <reference path="../src/ts/MapTitleToPoster.ts" />
/// <chutzpah_reference path="../../../lib/JQuery/jquery-1.9.1.js" />

describe("Map Title To Poster Function", () => {
    it("Returns expected values for default input", () => {
        var title: AtlantisJS.ITitle = {
            text: "hello everyone",
            };

        var output = AtlantisJS.MapTitleToPoster(title);

        expect(output.template.name).toBe("ajsTitleDefault");
        expect(output.model["title"]).toEqual(title.text);
    });
});