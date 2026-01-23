class DrawableGrid extends HTMLElement {
  static observedAttributes = ["width", "height", "rows", "columns"];

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

    this.canvas = this.shadowRoot.getElementById("canvas");
  }

  connectedCallback() {
    console.log("Custom element added to page.");
  }

  disconnectedCallback() {
    console.log("Custom element removed from page.");
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    console.log(
      `Attribute ${name} has changed from ${oldValue} to ${newValue}.`,
    );
  }

  get width() {
    return parseInt(this.getAttribute("width"));
  }

  set width(value) {
    this.setAttribute("width", value);
    this.canvas.width = parseInt(value);
  }

  get height() {
    return parseInt(this.getAttribute("height"));
  }

  set height(value) {
    this.setAttribute("height", value);
    this.canvas.height = parseInt(value);
  }

  get rows() {
    return parseInt(this.getAttribute("rows"));
  }

  set rows(value) {
    this.setAttribute(rows);
  }

  get columns() {
    return parseInt(this.getAttribute("columns"));
  }

  set columns(value) {
    this.setAttribute("columns", value);
  }
}

globalThis.customElements.define("drawable-grid", DrawableGrid);

export default DrawableGrid;

