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
    root.innerHTML = GridDisplay._innerHTML;

    this._width = GridDisplay.defaults.width;
    this._height = GridDisplay.defaults.height;
    this._rows = GridDisplay.defaults.rows;
    this._columns = GridDisplay.defaults.columns;
    this._backgroundColor = GridDisplay.defaults.backgroundColor;
    this._gridColor = GridDisplay.defaults.gridColor;
    this._showGrid = GridDisplay.defaults.showGrid;

    this._canvas = root.querySelector("#canvas");
    this._context = this._canvas.getContext("2d");
    this._canvasWrapper = root.querySelector("#canvas-wrapper");
    this._gridData = null;
  }

  /**
   * Getters and Setters
   */

  get width() {
    return parseInt(this.getAttribute("width")) || this._width;
  }

  set width(value) {
    const number = parseInt(value);
    if (isNaN(number) || number <= 0) {
      throw new Error(`Invalid width value: ${value}`);
    }
    this.setAttribute("width", number);
  }

  get height() {
    return parseInt(this.getAttribute("height")) || this._height;
  }

  set height(value) {
    const number = parseInt(value);
    if (isNaN(number) || number <= 0) {
      throw new Error(`Invalid height value: ${value}`);
    }
    this.setAttribute("height", number);
  }

  get rows() {
    return parseInt(this.getAttribute("rows")) || this._rows;
  }

  set rows(value) {
    const number = parseInt(value);
    if (isNaN(number) || number <= 0) {
      throw new Error(`Invalid rows value: ${value}`);
    }
    this.setAttribute("rows", number);
  }

  get columns() {
    return parseInt(this.getAttribute("columns")) || this._columns;
  }

  set columns(value) {
    const number = parseInt(value);
    if (isNaN(number) || number <= 0) {
      throw new Error(`Invalid columns value: ${value}`);
    }
    this.setAttribute("columns", value);
  }

  get backgroundColor() {
    return this.getAttribute("background-color") || this._backgroundColor;
  }

  set backgroundColor(value) {
    this.setAttribute("background-color", value);
  }

  get gridColor() {
    return this.getAttribute("grid-color") || this._gridColor;
  }

  set gridColor(value) {
    this.setAttribute("grid-color", value);
  }

  get showGrid() {
    const show = this.getAttribute("show-grid");
    if (show === null) {
      return this._showGrid;
    }
    return show === "true";
  }

  set showGrid(value) {
    this.setAttribute(
      "show-grid",
      value === true || value === "true" ? "true" : "false",
    );
  }

  /**
   * Lifecycle Callbacks
   */

  connectedCallback() {
    this._updateCanvas();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const actions = new Map([
      ["width", this._updateWidth],
      ["height", this._updateHeight],
      ["rows", this._updateRows],
      ["columns", this._updateColumns],
    ]);

    if (oldValue !== newValue) {
      const action = actions.get(name);
      if (action) {
        action.call(this, oldValue, newValue);
      }

      this._updateCanvas();
    }
  }

  /**
   * Private Methods
   */

  _updateWidth(oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }

    const width = parseInt(newValue);
    this._canvas.width = width;
    this._canvasWrapper.style.width = `${width}px`;
  }

  _updateHeight(oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }

    const height = parseInt(newValue);
    this._canvas.height = height;
    this._canvasWrapper.style.height = `${height}px`;
  }

  _updateRows(oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }

    this._rows = parseInt(newValue);
  }

  _updateColumns(oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }

    this._columns = parseInt(newValue);
  }

  _updateCanvas() {
    this._canvas.width = this.width;
    this._canvas.height = this.height;
    this._canvasWrapper.style.width = `${this.width}px`;
    this._canvasWrapper.style.height = `${this.height}px`;
  }

  _clearGridData() {
    this._gridData = Array.from({ length: this._rows }, () =>
      Array.from({ length: this._columns }, () => this._backgroundColor),
    );
  }
}

customElements.define("grid-display", GridDisplay);

export { GridDisplay };
