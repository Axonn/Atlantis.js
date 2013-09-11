module AtlantisJS {
    export function CubicBezier(x1:number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number) {
        return function (t: number) {
            var bezierCubic = function (p0, p1, p2, p3) {
                return ((1 - t) * (1 - t) * (1 - t) * p0) + (3 * (1 - t) * (1 - t) * t * p1) + (3 * (1 - t) * t * t * p2) + (t * t * t * p3);
            }

            var position = {
                x: bezierCubic(x1, x2, x3, x4),
                y: bezierCubic(y1, y2, y3, y4)
            };
        
            return position
        }
    }
}