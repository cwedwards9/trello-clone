import React, { useState } from "react";
import Card from "./Card";
import useInputState from "../hooks/useInputState";
import axios from "axios";
import listStyles from "./List.module.scss";

export default function List(props) {
    const [newCardDesc, updateCardDesc, resetCardDesc] = useInputState("");
    const [listCards, setListCards] = useState(props.list.Cards || []);

    const createCard = (e) => {
        e.preventDefault();
        axios.post("/api/cards", { description: newCardDesc, ListId: props.list.id })
            .then((response) => {
                setListCards([...listCards, response.data])
                resetCardDesc();
            })
    }

    return (
        <section className={listStyles.list}>
            <h3>{props.list.listTitle}</h3>
            {listCards && listCards.map(card => (
                <Card key={card.id} card={card} />
            ))}

            <form onSubmit={createCard} className={listStyles.newCardForm}>
                <input value={newCardDesc} onChange={updateCardDesc} placeholder="+ Add another card" />
                <button>Add Card</button>
            </form>
        </section>
    );
}