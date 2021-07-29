import React, { ReactNode } from "react";
import PostcodeAddressSuggestion, { AddressSuggestion } from "../../services/addressService/postcodeAddressSuggestion";
import styles from "./AddressSelector.module.scss";

interface AddressSelectorProps {
    suggestions: PostcodeAddressSuggestion | undefined | null;
    onSelected: Function;
}

export default class AddressSelector extends React.Component<AddressSelectorProps> {

    constructor(props: AddressSelectorProps) {
        super(props);
    }

    renderLoading(): ReactNode {
        return <div className={styles.loading}>Loading...</div>
    }

    handleSelect(event: React.ChangeEvent<HTMLSelectElement>) {
        const address: AddressSuggestion | undefined = this.props.suggestions?.addresses[parseInt(event.target.value, 10)];
        this.props.onSelected(address);
    }

    renderSelector(): ReactNode {
        return <select className={styles.addressSelector} defaultValue="-1" onChange={(event) => { this.handleSelect(event); }}>
            <option key="-1" value="-1" disabled >Please select an address...</option>
            {
                this.props.suggestions?.addresses.map((address, i) => {
                    return <option key={i} value={i}>{address.line_1}</option>
                })
            }
        </select>
    }

    render(): ReactNode {
        const node: ReactNode = (this.props.suggestions) ? this.renderSelector() : this.renderLoading();
        return node;
    }
}