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
drawableGridElement.setAttribute("width", "320px");
drawableGridElement.setAttribute("height", "240px");
drawableGridElement.setAttribute("rows", 24);
drawableGridElement.setAttribute("columns", 32);

document.querySelector('#grid-container').appendChild(drawableGridElement);
