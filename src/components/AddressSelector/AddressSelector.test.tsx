import { findByText } from "@testing-library/react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import PostcodeAddressSuggestion from "../../services/addressService/postcodeAddressSuggestion";
import AddressSelector from "./AddressSelector";
import mockData from "../../services/addressService/mockData.json";
import userEvent from "@testing-library/user-event";

let container: HTMLElement;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
});

it("should render loading when suggestions null", async () => {
    act(() => {
        render(<AddressSelector suggestions={null} onSelected={() => { }} />, container);
    });
    expect(await findByText(container, "Loading...")).toBeVisible();
});

it("should render suggestions in a select element for given suggestions", () => {
    const suggestions: PostcodeAddressSuggestion = mockData;
    act(() => {
        render(<AddressSelector suggestions={suggestions} onSelected={() => { }} />, container);
    });
    expect(container.querySelector<HTMLSelectElement>("select")?.options.length).toEqual(suggestions.addresses.length + 1);
});

it("should callback onSelected when select changed and pass result to callback", () => {
    const suggestions: PostcodeAddressSuggestion = mockData;
    const callback = jest.fn();
    act(() => {
        render(<AddressSelector suggestions={suggestions} onSelected={callback} />, container);
    });
    const select: HTMLSelectElement = (container.querySelector<HTMLSelectElement>("select")) as HTMLSelectElement;
    userEvent.selectOptions(select, ["0"]);
    expect(callback).toBeCalledWith(suggestions.addresses[0]);
});