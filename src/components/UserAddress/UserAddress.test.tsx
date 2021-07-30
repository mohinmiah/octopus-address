import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { UserAddressState } from "../../store/user/UserReducer";
import UserAddress from "./UserAddress";

let container: HTMLElement;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
});

it("should call delete and edit callbacks on click", () => {
    const deleteCallback = jest.fn();
    const editCallback = jest.fn();
    const data: UserAddressState = {
        line1: "hello"
    };
    act(() => {
        render(<UserAddress userAddress={data} onDelete={deleteCallback} onEdit={editCallback} />, container);
    });

    const deleteButtons: Array<HTMLButtonElement> = Array.from(container.querySelectorAll<HTMLButtonElement>("button"));
    deleteButtons[0].click();
    deleteButtons[1].click();

    expect(deleteCallback).toBeCalled();
    expect(editCallback).toBeCalledWith(data);

});