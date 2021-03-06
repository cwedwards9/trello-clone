import React from "react";
import cardStyles from "./Card.module.scss";
import useToggle from "../hooks/useToggle";
import axios from "axios";
import { BiPencil } from 'react-icons/bi';
import useInputState from "../hooks/useInputState";

export default function Card(props) {
    const [isCardEditForm, cardEditToggle] = useToggle(false);
    const [cardDesc, updateCardDesc] = useInputState(props.card.description)

    const updateCard = (e) => {
        e.preventDefault();

        axios.put("/api/cards", { id: props.card.id, description: cardDesc })
            .then(() => {
                cardEditToggle();
            });
    }

    const dragStart = (e) => {
        const target = e.target;

        e.dataTransfer.setData("cardId", target.id);

        setTimeout(() => {
            target.style.display = "none";
        }, 0);
    }

    const dragOver = (e) => {
        e.stopPropagation();
    }

    return (
        <div
            id={props.card.id}
            className={cardStyles.entireCard}
            onDragStart={dragStart} 
            onDragOver={dragOver} 
            draggable="true"
            desc={cardDesc}
        >
            {
                isCardEditForm ?
                <form onSubmit={updateCard} className={cardStyles.cardEditForm}>
                    <input value={cardDesc} onChange={updateCardDesc} />
                    <button className={cardStyles.cardUpdateBtn}>Save</button>
                    <button className={cardStyles.cardCancelBtn} onClick={cardEditToggle}>Cancel</button>
                </form>
                :
                <div className={cardStyles.card} >
                    <p>{cardDesc}</p>
                    <button onClick={cardEditToggle}><BiPencil /></button>
                </div>
            }
        </div>
    );
}