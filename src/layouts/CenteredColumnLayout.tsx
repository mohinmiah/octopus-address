import LayoutProps from "../interfaces/LayoutProps";
import styles from "./CenteredColumn.module.scss";



export function CenteredColumn(props: LayoutProps) {
    return <div className={styles.layout}>{props.children}</div>
}