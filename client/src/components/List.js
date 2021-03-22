import React from "react";
import listStyles from "./List.module.scss";

export default function Card(props) {
    return (
        <section className={listStyles.list}>
            {props.children}
        </section>
    );
}