import { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddressForm from "../../components/AddressForm/AddressForm";
import AddressSelector from "../../components/AddressSelector/AddressSelector";
import PostCodeInput from "../../components/PostcodeInput/PostCodeInput";
import UserAddress from "../../components/UserAddress/UserAddress";
import { CenteredColumn } from "../../layouts/CenteredColumnLayout";
import PostcodeAddressSuggestion, { AddressSuggestion } from "../../services/addressService/postcodeAddressSuggestion";
import LocationActions from "../../store/location/LocationActions";
import { AppState } from "../../store/Store";
import { UserActions } from "../../store/user/UserActions";
import { UserAddressState } from "../../store/user/UserReducer";
import styles from "./UserAddressPage.module.scss";

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
        dispatch(LocationActions.CLEAR_ADDRESS_SUGGESTION());
    };

    const handleDeleteAddress: Function = () => {
        dispatch(UserActions.SAVE_ADDRESS(undefined));
    };

    const handleEditAddress: Function = (currentAddress: UserAddressState) => {
        const address: AddressSuggestion = {
            line_1: currentAddress.line1,
            line_2: currentAddress.line2,
            postcode: currentAddress.postcode,
            town_or_city: currentAddress.townCity,
            county: currentAddress.county,
            country: currentAddress.country
        };
        dispatch(LocationActions.APPLY_ADDRESS_SUGGESTION(address));
        dispatch(UserActions.SAVE_ADDRESS(undefined));
    };

    const shouldShowAddressSuggestions = (): boolean => {
        return !postcodeError && addressSuggestions !== undefined;
    };

    const renderSavedAddress = () => {
        return <UserAddress userAddress={userAddress} onDelete={handleDeleteAddress} onEdit={handleEditAddress}></UserAddress>
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
            <div className={styles.page}>
                <CenteredColumn>
                    <h2 className={styles.header}>Home address</h2>
                    <h3 className={styles.headerLabel}>Enter the director's home address for the last 3 years</h3>
                    {userAddress && renderSavedAddress()}
                    {!userAddress && renderNewAddress()}
                </CenteredColumn>
            </div>

        );
    }

    return render();
}