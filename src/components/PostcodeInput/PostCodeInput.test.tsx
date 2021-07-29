import { findByText } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import PostCodeInput from "./PostCodeInput";

let container: HTMLElement;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
});

const validateCallbackAndExpectedValue: Function = (myCallback: jest.Mock, expectedValue: string) => {
    expect(myCallback).toHaveBeenCalled();
    expect(myCallback).toHaveBeenCalledWith(expectedValue);
}

const setupInputForValueSubmission: Function = (expectedValue: string, callback: Function): HTMLInputElement => {
    act(() => {
        render(<PostCodeInput onPostcodeSearch={callback} />, container);
    });
    const input: HTMLInputElement = container.querySelector("input") as HTMLInputElement;
    userEvent.type(input, expectedValue);
    return input;
}

it("should call onPostcodeSearch when Enter pressed on input", () => {
    const expectedValue: string = "ec1";
    const myCallback = jest.fn();
    const input: HTMLInputElement = setupInputForValueSubmission(expectedValue, myCallback);

    userEvent.type(input, "{enter}");

    validateCallbackAndExpectedValue(myCallback, expectedValue);
});

it("should call onPostcodeSearch on search button click", () => {
    const expectedValue: string = "w1ca 1ax";
    const myCallback = jest.fn();
    setupInputForValueSubmission(expectedValue, myCallback);

    container.querySelector("button")?.click();

    validateCallbackAndExpectedValue(myCallback, expectedValue);
});

const validateErrorMessageForError: Function = async (errorString: string, textMatch: RegExp) => {
    act(() => {
        render(<PostCodeInput onPostcodeSearch={() => { }} serviceError={errorString} />, container);
    });
    expect(await findByText(container, textMatch)).toBeVisible();
}

it("should show a specfic error message, when a 400 error is passed in", async () => {
    await validateErrorMessageForError("400", /Enter a/ig);
});

it("should show a general error message, when an error is passed in", async () => {
    await validateErrorMessageForError("500", /Sorry/ig);
});

