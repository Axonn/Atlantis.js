module AtlantisJS {
    export function Linear(x1: number, y1: number, x2: number, y2: number) {
        return function (t: number) {
            var linear = function (p0, p1) {
                return p0 + t * (p1 - p0);
            }

            var position = {
                x: linear(x1, x2),
                y: linear(y1, y2)
            };
        
            return position
        }
    }
}