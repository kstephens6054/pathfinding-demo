class DrawableGrid extends HTMLElement {
  static #innerHTML = `
    <div id="container" part="container">
      <canvas id="canvas" width="100" height="100"></canvas>
      <div id="controls" part="controls">
      </div>
    </div>
  `;
  constructor() {
    super();

    this.attachShadow({ mode: "open"});
    this.shadowRoot.innerHTML = DrawableGrid.#innerHTML;
  }
}

globalThis.customElements.define("drawable-grid", DrawableGrid);

export default DrawableGrid;

