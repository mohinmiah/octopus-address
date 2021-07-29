import React, { ReactNode } from "react";
import styles from "./PostCodeInput.module.scss";

interface PostCodeInputProps {
    onPostcodeSearch: Function;
}

interface PostCodeInputState {
    postcode: string;
}

export default class PostCodeInput extends React.Component<PostCodeInputProps, PostCodeInputState> {

    constructor(props: PostCodeInputProps) {
        super(props);
        this.state = {
            postcode: ""
        };
    }

    handlePostcodeLookup() {
        this.props.onPostcodeSearch(this.state.postcode);
    }

    handleKeyInput(kbEvent: React.KeyboardEvent<HTMLInputElement>) {
        if (kbEvent.key === "Enter") {
            this.handlePostcodeLookup();
        }
    }

    onChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ postcode: event.target.value });
    }

    render(): ReactNode {
        return (
            <div className={styles.container}>
                <input type="text"
                    value={this.state.postcode}
                    className={styles.postCodeInput}
                    onChange={(event) => this.onChange(event)}
                    onKeyUp={(event) => this.handleKeyInput(event)} />
                <button className={styles.searchButton} onClick={() => this.handlePostcodeLookup()}>&#128269;</button>
            </div>
        );
    }
}