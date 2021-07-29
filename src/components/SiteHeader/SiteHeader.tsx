import React, { ReactNode } from "react";
import styles from "./SiteHeader.module.scss";

export interface SiteHeaderProps {
    subtitle: string;
}

export default class SiteHeader extends React.Component<SiteHeaderProps> {

    render(): ReactNode {
        return (
            <header className={styles.header}>
                <h1>octopus <span className={styles.subtitle}>{this.props.subtitle}</span></h1>
            </header>
        );
    }
}