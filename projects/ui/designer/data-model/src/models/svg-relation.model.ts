export interface SvgRelation {
    group: SVGGElement;
    path: SVGPathElement;
    highlight: SVGPathElement | null;
    from: SVGGElement;
    to: SVGGElement;
}