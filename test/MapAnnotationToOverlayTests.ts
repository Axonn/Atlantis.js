/// <reference path="../src/definitions/Jasmine.d.ts" />
/// <reference path="../src/ts/MapAnnotationToOverlay.ts" />
/// <chutzpah_reference path="../../../lib/JQuery/jquery-1.9.1.js" />

describe("MapAnnotationToOverlayTests", () => {
    it("Returns expected values for default input", () => {
        var annotationText = "Basic Annotation";

        var output = AtlantisJS.MapAnnotationToOverlay({
            text: annotationText
        });

        expect(output.template.name).toBe("ajsAnnotationDefault");
        expect(output.model["annotation"]).toBe(annotationText);
        expect(output.displayTimes[0].start(5)).toBe(0.1);
        expect(output.displayTimes[0].end(5)).toBe(4.9);
    });

    it("Returns expected values for alternate template", () => {
        var annotationText = "Basic Annotation";
        var templateName = "New Template";

        var output = AtlantisJS.MapAnnotationToOverlay({
            text: annotationText,
            template: templateName
        });

        expect(output.template.name).toBe(templateName);
        expect(output.model["annotation"]).toBe(annotationText);
        expect(output.displayTimes[0].start(5)).toBe(0.1);
        expect(output.displayTimes[0].end(5)).toBe(4.9);
    });
});