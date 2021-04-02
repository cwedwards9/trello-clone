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
                setListCards([...listCards, response.data]);
                resetCardDesc();
            })
    }

    const drop = (e) => {
        e.preventDefault();
        const cardId = e.dataTransfer.getData("cardId");
        const card = document.getElementById(cardId);
        card.style.display = "block";

        e.target.appendChild(card);

        axios.put("/api/cards", { id: cardId, ListId: props.list.id })
            .then((response) => {
                // setListCards([...listCards, response.data]);
                console.log(response)
            })
    }

    const dragOver = (e) => {
        e.preventDefault();
    }

    return (
        <section className={listStyles.list}>
            <h3>{props.list.listTitle}</h3>
            <div id={props.list.id} onDrop={drop} onDragOver={dragOver} className={listStyles.listDropArea}>
                {listCards && listCards.map(card => (
                    <Card 
                        key={card.id} 
                        card={card} 
                    />
                ))}
            </div>
            

            <form onSubmit={createCard} className={listStyles.newCardForm}>
                <input value={newCardDesc} onChange={updateCardDesc} placeholder="+ Add another card" />
                <button>Add Card</button>
            </form>
        </section>
    );
}