
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import SiteHeader from "./SiteHeader";

let container: HTMLElement;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
});

it("should render the given subtitle in the header", () => {
    const value: string = "mySite"
    act(() => {
        render(<SiteHeader subtitle={value} />, container);
    });

    expect(container.textContent).toBe(`octopus ${value}`)

});
