module AtlantisJS {
    export function Static(x1: number, y1: number) {
        return function (t: number) {
            return { x: x1, y: y1 };
        }
    }
}