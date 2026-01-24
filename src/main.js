import './style.css'
import DrawableGrid from './DrawableGrid';

document.querySelector('#app').innerHTML = `
  <div class="container">
    <h1>Drawable Grid Demo</h1>
    <div id="grid-container"></div>
  </div>
`;

const drawableGridElement = new DrawableGrid();
drawableGridElement.setAttribute("width", "320");
drawableGridElement.setAttribute("height", "240");
drawableGridElement.setAttribute("rows", 24);
drawableGridElement.setAttribute("columns", 32);
drawableGridElement.setAttribute("pen-color", "#FFCC00");
drawableGridElement.setAttribute("background-color", "#E0E0E0");
drawableGridElement.setAttribute("grid-color", "#7F8AC0");
drawableGridElement.setAttribute("show-grid", false);

document.querySelector('#grid-container').appendChild(drawableGridElement);
