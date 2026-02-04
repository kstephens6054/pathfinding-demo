import { describe, it, expect, beforeEach } from "vitest";
import { GridDisplay } from "./GridDisplay";
import jsdom from "jsdom";
const { JSDOM } = jsdom;

describe("GridDisplay Component", () => {
  let gridDisplay;
  let root;

  beforeEach(() => {
    document.body.innerHTML = `<div id="root"></div>`;
  });

  it("should be defined in the custom elements registry", () => {
    const gridDisplay = window.customElements.get("grid-display");
    expect(gridDisplay).toBeDefined();
    expect(gridDisplay).toBe(GridDisplay);
  });

  it("should render from html", () => {
    root = document.getElementById("root");
    console.log(document);
    root.innerHTML = `<grid-display></grid-display>`;
    const gridDisplayElement = root.querySelector("grid-display");
    expect(gridDisplayElement).toBeInstanceOf(GridDisplay);
  });

  it("should initialize with default properties", () => {
    root = document.getElementById("root");
    root.innerHTML = `<grid-display></grid-display>`;
    const gridDisplayElement = root.querySelector("grid-display");

    expect(gridDisplayElement.width).toBe(GridDisplay.defaults.width);
    expect(gridDisplayElement.height).toBe(GridDisplay.defaults.height);
    expect(gridDisplayElement.rows).toBe(GridDisplay.defaults.rows);
    expect(gridDisplayElement.columns).toBe(GridDisplay.defaults.columns);
    expect(gridDisplayElement.backgroundColor).toBe(
      GridDisplay.defaults.backgroundColor,
    );
    expect(gridDisplayElement.gridColor).toBe(GridDisplay.defaults.gridColor);
    expect(gridDisplayElement.showGrid).toBe(GridDisplay.defaults.showGrid);
  });

  it("should update width and height properties", () => {
    const testParams = {
      oldWidth: 1024,
      oldHeight: 768,
      newWidth: 1920,
      newHeight: 1080,
    };
    root = document.getElementById("root");
    root.innerHTML = `<grid-display
      data-testid="grid-display"
      width="${testParams.oldWidth}"
      height="${testParams.oldHeight}"
      ></grid-display>
    `;

    expect(
      root.querySelector(`grid-display[width="${testParams.oldWidth}"]`),
    ).toBeDefined();
    expect(
      root.querySelector(`grid-display[height="${testParams.oldHeight}"]`),
    ).toBeDefined();

    const gridDisplayElement = root.querySelector("grid-display");
    gridDisplayElement.width = testParams.newWidth;
    gridDisplayElement.height = testParams.newHeight;
    console.log(gridDisplayElement);

    expect(
      root.querySelector(`grid-display[width="${testParams.newWidth}"]`),
    ).toBeDefined();
    expect(
      root.querySelector(`grid-display[height="${testParams.newHeight}"]`),
    ).toBeDefined();
  });
});
