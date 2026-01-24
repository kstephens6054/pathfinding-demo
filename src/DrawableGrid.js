import drawableGridStyles from "./DrawableGrid.css" with { type: "css" };

class DrawableGrid extends HTMLElement {
  static observedAttributes = [
    "width",
    "height",
    "columns",
    "rows",
    "pen-color",
    "background-color",
    "grid-color",
    "show-grid",
  ];

  static #innerHTML = `
    <div id="container" part="container">
      <canvas id="canvas" width="100" height="100"></canvas>
      <div id="controls" part="controls">
        <div class="form-field">
          <label for="width-input">Canvas width</label>
          <input id="width-input" type="number" min="0" max="4096" value="100" />
        </div>
        <div class="form-field">
          <label for="height-input">Canvas height</label>
          <input id="height-input" type="number" min="0" max="4096" value="100" />
        </div>
        <div class="form-field">
          <label for="columns-input">Grid columns</label>
          <input id="columns-input" type="number" min="0" max="4096" value="100" />
        </div>
        <div class="form-field">
          <label for="rows-input">Grid rows</label>
          <input id="rows-input" type="number" min="0" max="4096" value="100" />
        </div>
        <div class="form-field">
          <label for="pen-color-input">Pen color</label>
          <input id="pen-color-input" type="color" value="#000000" />
        </div>
        <div class="form-field">
          <label for="background-color-input">Background color</label>
          <input id="background-color-input" type="color" value="#FFFFFF" />
        </div>
        <div class="form-field">
          <label for="grid-color-input">Grid color</label>
          <input id="grid-color-input" type="color" value="#FFFFFF" />
        </div>
        <div class="form-field">
          <label for="show-grid-input">Show grid</label>
          <input id="show-grid-input" type="checkbox" checked />
        </div>
      </div>
    </div>
  `;

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = DrawableGrid.#innerHTML;
    shadowRoot.adoptedStyleSheets.push(drawableGridStyles);

    this.canvas = shadowRoot.getElementById("canvas");
    this.widthInput = shadowRoot.getElementById("width-input");
    this.heightInput = shadowRoot.getElementById("height-input");
    this.columnsInput = shadowRoot.getElementById("columns-input");
    this.rowsInput = shadowRoot.getElementById("rows-input");
    this.penColorInput = shadowRoot.getElementById("pen-color-input");
    this.backgroundColorInput = shadowRoot.getElementById(
      "background-color-input",
    );
    this.gridColorInput = shadowRoot.getElementById("grid-color-input");
    this.showGridInput = shadowRoot.getElementById("show-grid-input");

    this.handleWidthChange = this.handleWidthChange.bind(this);
    this.handleHeightChange = this.handleHeightChange.bind(this);
    this.handleColumnsChange = this.handleColumnsChange.bind(this);
    this.handleRowsChange = this.handleRowsChange.bind(this);
    this.handlePenColorChange = this.handlePenColorChange.bind(this);
    this.handleBackgroundColorChange =
      this.handleBackgroundColorChange.bind(this);
    this.handleGridColorChange = this.handleGridColorChange.bind(this);
    this.handleShowGridChange = this.handleShowGridChange.bind(this);
  }

  connectedCallback() {
    console.log("Custom element added to page.");

    this.widthInput.addEventListener("change", this.handleWidthChange);
    this.heightInput.addEventListener("change", this.handleHeightChange);
    this.columnsInput.addEventListener("change", this.handleColumnsChange);
    this.rowsInput.addEventListener("change", this.handleRowsChange);
    this.penColorInput.addEventListener("change", this.handlePenColorChange);
    this.backgroundColorInput.addEventListener(
      "change",
      this.handleBackgroundColorChange,
    );
    this.gridColorInput.addEventListener("change", this.handleGridColorChange);
    this.showGridInput.addEventListener("change", this.handleShowGridChange);

    this.updateCanvas();
    this.updateControls();
  }

  disconnectedCallback() {
    console.log("Custom element removed from page.");

    this.widthInput.removeEventListener("change", this.handleWidthChange);
    this.heightInput.removeEventListener("change", this.handleHeightChange);
    this.columnsInput.removeEventListener("change", this.handleColumnsChange);
    this.rowsInput.removeEventListener("change", this.handleRowsChange);
    this.penColorInput.removeEventListener("change", this.handlePenColorChange);
    this.backgroundColorInput.removeEventListener(
      "change",
      this.handleBackgroundColorChange,
    );
    this.gridColorInput.removeEventListener(
      "change",
      this.handleGridColorChange,
    );
    this.showGridInput.removeEventListener("change", this.handleShowGridChange);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(
      `Attribute ${name} has changed from ${JSON.stringify(oldValue)} to ${JSON.stringify(newValue)}.`,
    );

    this.updateCanvas();
    this.updateControls();
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

  get columns() {
    return parseInt(this.getAttribute("columns"));
  }

  set columns(value) {
    this.setAttribute("columns", value);
  }

  get rows() {
    return parseInt(this.getAttribute("rows"));
  }

  set rows(value) {
    this.setAttribute("rows", value);
  }

  get penColor() {
    return this.getAttribute("pen-color");
  }

  set penColor(value) {
    this.setAttribute("pen-color", value);
  }

  get backgroundColor() {
    return this.getAttribute("background-color");
  }

  set backgroundColor(value) {
    this.setAttribute("background-color", value);
  }

  get gridColor() {
    return this.getAttribute("grid-color");
  }

  set gridColor(value) {
    this.setAttribute("grid-color", value);
  }

  get showGrid() {
    const value = this.getAttribute("show-grid");
    return value !== null && value !== "false";
  }

  set showGrid(value) {
    this.setAttribute("show-grid", Boolean(value));
  }

  updateCanvas() {
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  updateControls() {
    this.widthInput.value = this.width;
    this.heightInput.value = this.height;
    this.columnsInput.value = this.columns;
    this.rowsInput.value = this.rows;
    this.penColorInput.value = this.penColor;
    this.backgroundColorInput.value = this.backgroundColor;
    this.gridColorInput.value = this.gridColor;
    this.showGridInput.checked = this.showGrid;
  }

  handleWidthChange() {
    const oldValue = this.width;
    const newValue = this.widthInput.value;
    console.log(`width changed from ${oldValue} to ${newValue}`);
    this.width = newValue;
  }

  handleHeightChange() {
    const oldValue = this.height;
    const newValue = this.heightInput.value;
    console.log(`height changed from ${oldValue} to ${newValue}`);
    this.height = newValue;
  }

  handleColumnsChange() {
    const oldValue = this.columns;
    const newValue = this.columnsInput.value;
    console.log(`columns changed from ${oldValue} to ${newValue}`);
    this.columns = newValue;
  }

  handleRowsChange() {
    const oldValue = this.rows;
    const newValue = this.rowsInput.value;
    console.log(`rows changed from ${oldValue} to ${newValue}`);
    this.rows = newValue;
  }

  handlePenColorChange() {
    const oldValue = this.penColor;
    const newValue = this.penColorInput.value;
    console.log(`penColor changed from ${oldValue} to ${newValue}`);
    this.penColor = newValue;
  }

  handleBackgroundColorChange() {
    const oldValue = this.backgroundColor;
    const newValue = this.backgroundColorInput.value;
    console.log(`backgroundColor changed from ${oldValue} to ${newValue}`);
    this.backgroundColor = newValue;
  }

  handleGridColorChange() {
    const oldValue = this.gridColor;
    const newValue = this.gridColorInput.value;
    console.log(`gridColor changed from ${oldValue} to ${newValue}`);
    this.gridColor = newValue;
  }

  handleShowGridChange() {
    const oldValue = this.showGrid;
    const newValue = this.showGridInput.checked;
    console.log(`showGrid changed from ${oldValue} to ${newValue}`);
    this.showGrid = newValue;
  }
}

globalThis.customElements.define("drawable-grid", DrawableGrid);

export default DrawableGrid;
