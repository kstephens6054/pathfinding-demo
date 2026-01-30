import "./style.css";
import * as _drawableGridModule from "./DrawableGrid";

document.querySelector("#app").innerHTML = `
  <div class="container">
    <h1>Drawable Grid Demo</h1>
    <div id="grid-container">
      <drawable-grid
        width="320"
        height="240"
        rows="24"
        columns="32"
        pen-color="#FFCC00"
        background-color="#E0E0E0"
        grid-color="#7F8AC0"
        show-grid="false"
      ></drawable-grid>
    </div>
  </div>
`;
