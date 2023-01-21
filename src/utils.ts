import { Delaunay } from "d3-delaunay";

export type Point = { x: number; y: number };

export type Points = Array<Point>;

export const generatePoints = (width: number, height: number) =>
  Array(100)
    .fill(0)
    .map((_, i) => ({ x: (i * width) / 100, y: Math.random() * height }));

export const generateVoronoi = (points: Points) => {
  const voronoi = Delaunay.from(
    points,
    (d: any) => d.x,
    (d: any) => d.y
  ).voronoi([0, 0, 800, 600]);

  return voronoi;
};

export function randomVal(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + 1) + min;
}

export const getMinMax = (cells: any) => {
  return cells.reduce((acc: [Point, Point], val: Points) => {
    acc[0] = acc[0] == undefined || val[0] < acc[0] ? val[0] : acc[0];
    acc[1] = acc[1] == undefined || val[1] < acc[1] ? val[1] : acc[1];
    return acc;
  }, []);
};
