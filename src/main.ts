import { initGame } from './game';
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Voronoi</h1>
    <canvas id="voronoi"></canvas>
  </div>
`

initGame();
