import "./style.css";
import * as _GridDisplay from "./GridDisplay/index.js";

document.querySelector("#app").innerHTML = `
  <div class="container">
    <h1>Drawable Grid Demo</h1>
      <grid-display
        width="320"
        height="240"
        rows="24"
        columns="32"
        background-color="#E0E0E0"
        grid-color="#7F8AC0"
        show-grid="true"
      ></grid-display>
  </div>
`;
