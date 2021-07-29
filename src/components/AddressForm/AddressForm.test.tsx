import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import AddressForm from "./AddressForm";
import mockData from "../../services/addressService/mockData.json";
import { AddressSuggestion } from "../../services/addressService/postcodeAddressSuggestion";
import { findByText } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { UserAddressState } from "../../store/user/UserReducer";

let container: HTMLElement;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
});

it("should render the inputs and selects for a addressSuggestion", () => {
    const data: AddressSuggestion = mockData.addresses[0];
    act(() => {
        render(<AddressForm address={data} onSave={() => { }} />, container);
    });

    const inputs = container.querySelectorAll("input");
    const selects = container.querySelectorAll("select");
    expect(inputs.length).toEqual(6);
    expect(selects.length).toEqual(2);
});

it("should render loading if there is no data", async () => {
    act(() => {
        render(<AddressForm address={undefined} onSave={() => { }} />, container);
    });

    expect(await findByText(container, "Loading...")).toBeVisible();
});

it("should validate form and show error message when required field is missing", async () => {
    const data: AddressSuggestion = mockData.addresses[1];
    const callback = jest.fn();
    act(() => {
        render(<AddressForm address={data} onSave={callback} />, container);
    });

    const button = container.querySelector("button") as HTMLButtonElement;
    userEvent.type(container.querySelector("input") as HTMLInputElement, "");
    button.click();

    expect(callback).toBeCalledTimes(0);
    expect(await findByText(container, /Complete all/ig)).toBeVisible();
});

it("should validate and callback when all is valid", () => {
    const data: AddressSuggestion = mockData.addresses[1];
    data.postcode = "asd";
    const callback = jest.fn();
    act(() => {
        render(<AddressForm address={data} onSave={callback} />, container);
    });

    const button = container.querySelector("button") as HTMLButtonElement;
    button.click();

    const expected: UserAddressState = {
        line1: data.line_1,
        line2: data.line_2,
        postcode: data.postcode,
        townCity: data.town_or_city,
        county: data.county,
        country: data.country,
        months: "0",
        years: "0"
    };

    expect(callback).toBeCalledWith(expected);
});