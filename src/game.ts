import { Actor, Color, Engine, Line, Polygon, vec, Vector } from "excalibur";
import { generatePoints, generateVoronoi, getMinMax, randomVal } from "./utils";

export function initGame() {
  const game = new Engine({
    canvasElementId: "voronoi",
    width: 800,
    height: 600,
  });

  const points = generatePoints(800, 600);
  const voronoi = generateVoronoi(points);
  const gameVecs: any[] = [];

  for (let point = 0; point < points.length; point++) {
    const cell = voronoi.cellPolygon(point);
    const [minX, minY] = getMinMax(cell);

    // render polygons
    for (let i = 0; i < cell.length - 1; i++) {
      const polygons = cell.map(([x, y]) => vec(x, y));
      const pretty = Color.fromRGB(
        randomVal(0, 255),
        randomVal(100, 255),
        randomVal(200, 255)
      );

      const cellActor = new Actor({
        pos: vec(minX, minY),
      });

      cellActor.anchor = Vector.Zero;
      cellActor.graphics.use(
        new Polygon({
          points: polygons,
          color: pretty,
        })
      );

      gameVecs.push(cellActor);
    }

    gameVecs.forEach((vec) => game.add(vec));

    // render lines
    for (let i = 0; i < cell.length - 1; i++) {
      const vecA = cell[i];
      const vecB = cell[i + 1];
      const lineActor = new Actor({
        pos: vec(0, 0),
      });

      lineActor.anchor = Vector.Zero;
      lineActor.graphics.use(
        new Line({
          start: vec(vecA[0], vecA[1]),
          end: vec(vecB[0], vecB[1]),
          color: Color.Blue,
          thickness: 3,
        })
      );

      game.add(lineActor);
    }
  }

  game.start();
}
