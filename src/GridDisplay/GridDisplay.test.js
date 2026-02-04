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
      width="${testParams.oldWidth}"
      height="${testParams.oldHeight}"
      ></grid-display>
    `;

    root = document.getElementById("root");
    const gridDisplayElement = root.querySelector("grid-display");

    expect(gridDisplayElement.width).toBe(testParams.oldWidth);
    expect(gridDisplayElement.height).toBe(testParams.oldHeight);

    gridDisplayElement.width = testParams.newWidth;
    gridDisplayElement.height = testParams.newHeight;

    expect(gridDisplayElement.width).toBe(testParams.newWidth);
    expect(gridDisplayElement.height).toBe(testParams.newHeight);
  });

  it("should pass this test", () => {
    expect(true).toBe(true);
  });
});
