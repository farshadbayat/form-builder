import { IPoint } from "../models/point.model";

export const ManyRelationSVG = (p: IPoint, s: 'Left' | 'Right') => {
  const dx = s === 'Left' ? -10 : 10;
  return `M${p.x + dx} ${p.y}L${p.x} ${p.y}M${p.x + dx} ${p.y}L${p.x} ${p.y - 6}M${p.x + dx} ${p.y}L${p.x} ${p.y + 6}`;
}

export const OneRelationSVG = (p: IPoint, s: 'Left' | 'Right') => {
  const dx = s === 'Left' ? -8 : 8;
  return `M${p.x + dx} ${p.y - 6}L${p.x + dx} ${p.y + 6}`;
}

export const ZeroOneRelationSVG = (p: IPoint, s: 'Left' | 'Right') => {
  const dx = s === 'Left' ? -6 : 6;
  const r = 5;
  const cx = s === 'Left' ? dx - 2*r - 1 : dx + 1;
  return `M${p.x + dx} ${p.y - 7}L${p.x + dx} ${p.y + 7}`+
         `M${p.x + cx} ${p.y}a${r},${r} 0 1, 0 ${r * 2},0a${r},${r} 0 1, 0 ${-r * 2},0`;
}

export const OneOnlyOneRelationSVG = (p: IPoint, s: 'Left' | 'Right') => {
  const dx = s === 'Left' ? -10 : 10;
  return `M${p.x + dx} ${p.y - 7}L${p.x + dx} ${p.y + 7}`+
         `M${p.x + dx * 0.60} ${p.y - 7}L${p.x + dx * 0.60} ${p.y + 7}`;
}

export const OneManyRelationSVG = (p: IPoint, s: 'Left' | 'Right') => {
  const dx = s === 'Left' ? -10 : 10;
  return `M${p.x + dx} ${p.y}L${p.x} ${p.y}`+
         `M${p.x + dx} ${p.y}L${p.x} ${p.y - 6}`+
         `M${p.x + dx} ${p.y}L${p.x} ${p.y + 6}`+
         `M${p.x + dx} ${p.y - 6}L${p.x + dx} ${p.y + 6}`;
}

export const ZeroManyRelationSVG = (p: IPoint, s: 'Left' | 'Right') => {
  const dx = s === 'Left' ? -6 : 6;
  const r = 5;
  const cx = s === 'Left' ? dx - 2*r - 1 : dx + 1;
  return `M${p.x + dx} ${p.y}L${p.x} ${p.y}`+
         `M${p.x + dx} ${p.y}L${p.x} ${p.y - 6}`+
         `M${p.x + dx} ${p.y}L${p.x} ${p.y + 6}`+
         `M${p.x + cx} ${p.y}a${r},${r} 0 1, 0 ${r * 2},0a${r},${r} 0 1, 0 ${-r * 2},0`;

}
