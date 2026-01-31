import GridDisplayStyles from "./GridDisplay.css" with { type: "css" };

class GridDisplay extends HTMLElement {
  static get observedAttributes() {
    return [
      "width",
      "height",
      "rows",
      "columns",
      "background-color",
      "grid-color",
      "show-grid",
    ];
  }

  static defaults = {
    width: 100,
    height: 100,
    rows: 10,
    columns: 10,
    backgroundColor: "#E0E0E0",
    gridColor: "#7F8AC0",
    showGrid: true,
  };

  static get _innerHTML() {
    return `
      <div id="canvas-wrapper" part="canvas-wrapper">
        <canvas id="canvas" part="canvas" width="320" height="240"></canvas>
      </div>
    `;
  }

  constructor() {
    super();
    const root = this.attachShadow({ mode: "open" });
    root.adoptedStyleSheets = [GridDisplayStyles];
    root.innerHTML = GridDisplay._innerHTML();

    this._canvas = root.querySelector("#canvas");
    this._context = this._canvas.getContext("2d");
    this._canvasWrapper = root.querySelector("#canvas-wrapper");
    this._gridData = null;
  }

  get width() {
    return parseInt(this.getAttribute("width")) || GridDisplay.defaults.width;
  }

  set width(value) {
    const number = parseInt(value);
    if (isNaN(number) || number <= 0) {
      throw new Error(`Invalid width value: ${value}`);
    }
    this.setAttribute("width", number);
  }

  get height() {
    return parseInt(this.getAttribute("height")) || GridDisplay.defaults.height;
  }

  set height(value) {
    const number = parseInt(value);
    if (isNaN(number) || number <= 0) {
      throw new Error(`Invalid height value: ${value}`);
    }
    this.setAttribute("height", number);
  }

  get rows() {
    return parseInt(this.getAttribute("rows")) || GridDisplay.defaults.rows;
  }

  set rows(value) {
    const number = parseInt(value);
    if (isNaN(number) || number <= 0) {
      throw new Error(`Invalid rows value: ${value}`);
    }
    this.setAttribute("rows", number);
  }

  get columns() {
    return (
      parseInt(this.getAttribute("columns")) || GridDisplay.defaults.columns
    );
  }

  set columns(value) {
    const number = parseInt(value);
    if (isNaN(number) || number <= 0) {
      throw new Error(`Invalid columns value: ${value}`);
    }
    this.setAttribute("columns", value);
  }

  get backgroundColor() {
    return (
      this.getAttribute("background-color") ||
      GridDisplay.defaults.backgroundColor
    );
  }

  set backgroundColor(value) {
    this.setAttribute("background-color", value);
  }

  get gridColor() {
    return this.getAttribute("grid-color") || GridDisplay.defaults.gridColor;
  }

  set gridColor(value) {
    this.setAttribute("grid-color", value);
  }

  get showGrid() {
    const show = this.getAttribute("show-grid");
    if (show === null) {
      return GridDisplay.defaults.showGrid;
    }
    return show === "true";
  }

  set showGrid(value) {
    this.setAttribute(
      "show-grid",
      value === true || value === "true" ? "true" : "false",
    );
  }
}

customElements.define("grid-display", GridDisplay);

export { GridDisplay };
