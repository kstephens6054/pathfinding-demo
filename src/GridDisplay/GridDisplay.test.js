import { describe, it, expect, beforeEach } from "vitest";
import { GridDisplay } from "./GridDisplay";
import jsdom from "jsdom";
const { JSDOM } = jsdom;

describe("GridDisplay Component", () => {
  let gridDisplay;
  let root;
  let dom;

  beforeEach(() => {
    // dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`, {
    //   url: "http://localhost/",
    // });
    // global.window = dom.window;
    // global.document = dom.window.document;
    // global.document.innerHTML = `
    // <div id="root"></div>
    // `;
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
    root = global.document.getElementById("root");
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
    gridDisplay = new GridDisplay();
    root = document.getElementById("root");
    root.appendChild(gridDisplay);

    gridDisplay.width = 500;
    gridDisplay.height = 400;

    expect(gridDisplay.width).toBe(500);
    expect(gridDisplay.height).toBe(400);
  });

  it("should pass this test", () => {
    expect(true).toBe(true);
  });
});
