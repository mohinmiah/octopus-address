import { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddressForm from "../../components/AddressForm/AddressForm";
import AddressSelector from "../../components/AddressSelector/AddressSelector";
import PostCodeInput from "../../components/PostcodeInput/PostCodeInput";
import { CenteredColumn } from "../../layouts/CenteredColumnLayout";
import PostcodeAddressSuggestion, { AddressSuggestion } from "../../services/addressService/postcodeAddressSuggestion";
import LocationActions from "../../store/location/LocationActions";
import { AppState } from "../../store/Store";
import { UserActions } from "../../store/user/UserActions";
import { UserAddressState } from "../../store/user/UserReducer";

export function UserAddressPage() {

    const dispatch = useDispatch();

    const addressSuggestions: PostcodeAddressSuggestion = useSelector<AppState>(state => state.location.suggestions) as PostcodeAddressSuggestion;
    const postcodeError: string = useSelector<AppState>(state => state.location.error) as string;
    const selectedAddress: AddressSuggestion = useSelector<AppState>(state => state.location.selectedSuggestion) as AddressSuggestion;
    const userAddress: UserAddressState = useSelector<AppState>(state => state.user.address) as UserAddressState

    const handlePostCodeSearch: Function = (postcode: string) => {
        dispatch(LocationActions.RESOLVE_POSTCODE(postcode));
    };

    const handleAddressSelected: Function = (address: AddressSuggestion) => {
        dispatch(LocationActions.SELECT_ADDRESS_SUGGESTION(address));
    };

    const handleSaveAddress: Function = (userAddress: UserAddressState) => {
        dispatch(UserActions.SAVE_ADDRESS(userAddress));
    };

    const shouldShowAddressSuggestions = (): boolean => {
        return !postcodeError && addressSuggestions !== undefined;
    };

    const renderSavedAddress = () => {
        return <div></div>
    };

    const renderNewAddress = () => {
        return (
            <>
                {selectedAddress && <AddressForm address={selectedAddress} onSave={handleSaveAddress} />}
                <PostCodeInput onPostcodeSearch={handlePostCodeSearch} serviceError={postcodeError} />
                {shouldShowAddressSuggestions()
                    && <AddressSelector suggestions={addressSuggestions} onSelected={handleAddressSelected} />}
            </>
        );
    };

    const render = () => {
        return (
            <CenteredColumn>
                <h2>Home address</h2>
                {userAddress && renderSavedAddress()}
                {!userAddress && renderNewAddress()}
            </CenteredColumn>
        );
    }

    return render();
}