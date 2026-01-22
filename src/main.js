import './style.css'
import DrawableGrid from './DrawableGrid';

document.querySelector('#app').innerHTML = `
  <div class="container">
    <h1>Drawable Grid Demo</h1>
    <div id="grid-container">
    </div>
  </div>
`;

const drawableGridElement = new DrawableGrid();
drawableGridElement.setAttribute("rows", 100);
drawableGridElement.setAttribute("columns", 100);

document.querySelector('#grid-container').appendChild(drawableGridElement);
