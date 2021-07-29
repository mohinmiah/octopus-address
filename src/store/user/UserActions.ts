import { createAction } from "@reduxjs/toolkit";

export class UserActions {

    static readonly SAVE_ADDRESS = createAction<any>("user/saveAddress");
}