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

  static invalidatingAttributes = new Set([
    "width",
    "height",
    "columns",
    "rows",
  ]);

  static #innerHTML = `
    <div id="container" part="container">
      <canvas id="canvas" width="100" height="100"></canvas>
      <div id="controls" part="controls">
        <div class="form-field">
          <label for="width-input">Canvas width</label>
          <input id="width-input" type="number" min="120" max="4096" value="100" />
        </div>
        <div class="form-field">
          <label for="height-input">Canvas height</label>
          <input id="height-input" type="number" min="80" max="4096" value="100" />
        </div>
        <div class="form-field">
          <label for="columns-input">Grid columns</label>
          <input id="columns-input" type="number" min="2" max="1024" value="100" />
        </div>
        <div class="form-field">
          <label for="rows-input">Grid rows</label>
          <input id="rows-input" type="number" min="2" max="1024" value="100" />
        </div>
        <div class="form-field">
          <label for="pen-color-input">Pen color</label>
          <input id="pen-color-input" type="color" value="#000000" />
        </div>
        <div class="form-field">
          <label for="background-color-input">Background color</label>
          <input id="background-color-input" type="color" value="#ffffff" />
        </div>
        <div class="form-field">
          <label for="grid-color-input">Grid color</label>
          <input id="grid-color-input" type="color" value="#6e87ff" />
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
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);

    this.controller = null;

    this.isDrawing = false;
    this.isErasing = false;
    this.isEmpty = true;

    this.dataGrid = [];
  }

  connectedCallback() {
    console.log("Custom element added to page.");

    this.controller = new AbortController();
    const options = { signal: this.controller.signal };

    this.widthInput.addEventListener("change", this.handleWidthChange, options);

    this.heightInput.addEventListener(
      "change",
      this.handleHeightChange,
      options,
    );

    this.columnsInput.addEventListener(
      "change",
      this.handleColumnsChange,
      options,
    );

    this.rowsInput.addEventListener("change", this.handleRowsChange, options);

    this.penColorInput.addEventListener(
      "change",
      this.handlePenColorChange,
      options,
    );

    this.backgroundColorInput.addEventListener(
      "change",
      this.handleBackgroundColorChange,
      options,
    );

    this.gridColorInput.addEventListener(
      "change",
      this.handleGridColorChange,
      options,
    );

    this.showGridInput.addEventListener(
      "change",
      this.handleShowGridChange,
      options,
    );

    this.canvas.addEventListener("mousedown", this.handleMouseDown, options);
    this.canvas.addEventListener("mousemove", this.handleMouseMove, options);
    document.addEventListener("mouseup", this.handleMouseUp, options);

    this.dataGrid = Array.from({ length: this.rows }, () =>
      Array.from({ length: this.columns }, () => this.backgroundColor),
    );

    this.updateCanvas();
    this.updateControls();
  }

  disconnectedCallback() {
    console.log("Custom element removed from page.");

    if (this.controller) {
      this.controller.abort();
      this.controller = null;
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(
      `Attribute ${name} has changed from ${JSON.stringify(oldValue)} to ${JSON.stringify(newValue)}.`,
    );

    if (DrawableGrid.invalidatingAttributes.has(name)) {
      this.clearCanvas();
    }

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
    const oldColor = this.backgroundColor;
    this.updateBackground(oldColor, value);
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
    this.fillCanvas();
    this.drawGrid();
  }

  updateBackground(oldColor, newColor) {
    if (this.dataGrid.length === 0) return;

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.columns; c++) {
        if (this.dataGrid[r][c] === oldColor) {
          this.dataGrid[r][c] = newColor;
        }
      }
    }
  }

  clearCanvas() {
    if (this.dataGrid.length === 0) return;

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.columns; c++) {
        this.dataGrid[r][c] = this.backgroundColor;
      }
    }

    const ctx = this.canvas.getContext("2d");
    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  fillCanvas() {
    if (this.dataGrid.length === 0) return;

    const ctx = this.canvas.getContext("2d");
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.columns; c++) {
        ctx.fillStyle = this.dataGrid[r][c] || this.backgroundColor;
        const cellWidth = this.canvas.width / this.columns;
        const cellHeight = this.canvas.height / this.rows;
        ctx.fillRect(c * cellWidth, r * cellHeight, cellWidth, cellHeight);
      }
    }
  }

  drawGrid() {
    if (!this.showGrid) return;

    const ctx = this.canvas.getContext("2d");
    ctx.strokeStyle = this.gridColor;

    const cellWidth = this.canvas.width / this.columns;
    const cellHeight = this.canvas.height / this.rows;

    for (let col = 0; col <= this.columns; col++) {
      const x = col * cellWidth;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.canvas.height);
      ctx.stroke();
    }

    for (let row = 0; row <= this.rows; row++) {
      const y = row * cellHeight;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(this.canvas.width, y);
      ctx.stroke();
    }
  }

  handleMouseMove(event) {
    const [column, row] = this.getGridCell(event.clientX, event.clientY);
    if (this.isDrawing) {
      this.fillGridCell(column, row);
    }
    console.log(`Mouse moved to (${column}, ${row}) on the canvas.`);
  }

  handleMouseDown(event) {
    const [column, row] = this.getGridCell(event.clientX, event.clientY);
    console.log(`Mouse down at (${column}, ${row}) on the canvas.`);
    this.isDrawing = true;
  }

  handleMouseUp(event) {
    const [column, row] = this.getGridCell(event.clientX, event.clientY);
    console.log(`Mouse up at (${column}, ${row}) on the canvas.`);
    this.isDrawing = false;
  }

  getGridCell(x, y) {
    const rect = this.canvas.getBoundingClientRect();
    const column = Math.floor(this.columns * ((x - rect.left) / rect.width));
    const row = Math.floor(this.rows * ((y - rect.top) / rect.height));
    return [column, row];
  }

  fillGridCell(column, row) {
    if (row < 0 || row >= this.rows || column < 0 || column >= this.columns) {
      return;
    }
    const ctx = this.canvas.getContext("2d");
    const cellWidth = this.canvas.width / this.columns;
    const cellHeight = this.canvas.height / this.rows;
    ctx.fillStyle = this.penColor;
    ctx.fillRect(column * cellWidth, row * cellHeight, cellWidth, cellHeight);
    this.dataGrid[row][column] = this.penColor;

    if (this.showGrid) {
      ctx.strokeStyle = this.gridColor;
      ctx.strokeRect(
        column * cellWidth,
        row * cellHeight,
        cellWidth,
        cellHeight,
      );
    }
  }

  clearGridCell(column, row) {
    if (row < 0 || row >= this.rows || column < 0 || column >= this.columns) {
      return;
    }
    const ctx = this.canvas.getContext("2d");
    const cellWidth = this.canvas.width / this.columns;
    const cellHeight = this.canvas.height / this.rows;
    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(column * cellWidth, row * cellHeight, cellWidth, cellHeight);
    this.dataGrid[row][column] = null;
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
