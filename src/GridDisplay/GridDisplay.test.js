import { screen } from "@testing-library/dom";
import { describe, it, beforeEach, expect } from "vitest";
import { GridDisplay } from "./GridDisplay";

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
    const expected = { ...GridDisplay.defaults };

    expect(element).toHaveAttribute("width", `${expected.width}`);
    expect(element).toHaveAttribute("height", `${expected.height}`);
    expect(element).toHaveAttribute("columns", `${expected.columns}`);
    expect(element).toHaveAttribute(
      "background-color",
      `${expected.backgroundColor}`,
    );
    expect(element).toHaveAttribute("grid-color", `${expected.gridColor}`);
    expect(element).toHaveAttribute("show-grid", `${expected.showGrid}`);
  });

  it("should update width and height properties", () => {
    const testParams = {
      oldWidth: 1024,
      oldHeight: 768,
      newWidth: 1920,
      newHeight: 1080,
    };

    root.innerHTML = `<grid-display
      data-testid="grid-display"
      width="${testParams.oldWidth}"
      height="${testParams.oldHeight}"
      ></grid-display>
    `;

    const element = screen.getByRole("image", {
      name: "Grid Display",
    });

    expect(element).toHaveAttribute("width", `${testParams.oldWidth}`);
    expect(element).toHaveAttribute("height", `${testParams.oldHeight}`);

    element.width = testParams.newWidth;
    element.height = testParams.newHeight;

    expect(element).toHaveAttribute("width", `${testParams.newWidth}`);
    expect(element).toHaveAttribute("height", `${testParams.newHeight}`);
  });
});
