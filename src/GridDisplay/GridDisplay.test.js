import { screen } from "@testing-library/dom";
import { describe, it, beforeEach, expect } from "vitest";
import { GridDisplay } from "./GridDisplay";
import { camelToKebabCase, kebabToCamelCase } from "../utilities";

describe("GridDisplay Component", () => {
  let root;

  beforeEach(() => {
    document.body.innerHTML = `<div id="root"></div>`;
    root = document.getElementById("root");
  });

  it("should be defined in the custom elements registry", () => {
    const gridDisplay = window.customElements.get("grid-display");
    expect(gridDisplay).toBeDefined();
    expect(gridDisplay).toBe(GridDisplay);
  });

  it("should render from html", () => {
    root.innerHTML = `<grid-display></grid-display>`;
    expect(
      screen.getByRole("image", { name: "Grid Display" }),
    ).toBeInTheDocument();
  });

  it("should initialize with default properties", () => {
    root.innerHTML = `<grid-display></grid-display>`;
    const element = screen.getByRole("image", {
      name: "Grid Display",
    });

    for (const [key, value] of Object.entries(GridDisplay.defaults)) {
      const attrName = camelToKebabCase(key);
      expect(element).toHaveAttribute(attrName, `${value}`);
    }
  });

  it("should update all properties", () => {
    const oldValues = {
      width: 800,
      height: 600,
      columns: 40,
      rows: 30,
      backgroundColor: "#d0d0d0",
      gridColor: "#7f3fff",
      showGrid: true,
    };

    const newValues = {
      width: 1280,
      height: 720,
      columns: 128,
      rows: 72,
      backgroundColor: "#2f2f4f",
      gridColor: "#a0afdf",
      showGrid: false,
    };

    root.innerHTML = `<grid-display
      width="${oldValues.width}"
      height="${oldValues.height}"
      columns="${oldValues.columns}"
      rows="${oldValues.rows}"
      background-color="${oldValues.backgroundColor}"
      grid-color="${oldValues.gridColor}"
      show-grid="${oldValues.showGrid}"
      ></grid-display>
    `;

    const element = screen.getByRole("image", {
      name: "Grid Display",
    });

    for (const [key, value] of Object.entries(oldValues)) {
      const attrName = camelToKebabCase(key);
      expect(element).toHaveAttribute(attrName, `${value}`);
    }

    for (const [key, value] of Object.entries(newValues)) {
      const attrName = camelToKebabCase(key);
      element.setAttribute(attrName, `${value}`);
    }

    for (const [key, value] of Object.entries(newValues)) {
      const attrName = camelToKebabCase(key);
      expect(element).toHaveAttribute(attrName, `${value}`);
    }
  });
});
