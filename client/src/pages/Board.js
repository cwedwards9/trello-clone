import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import useInputState from "../hooks/useInputState";
import useToggle from "../hooks/useToggle";
import List from "../components/List";
import axios from "axios";
import boardStyles from "./Board.module.scss";
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

export default function Board() {
    const { id: boardId } = useParams();
    const [listArray, setListArray] = useState([]);
    const [boardInfo, setBoardInfo] = useState("");
    const [newListTitle, updateListTitle, resetListTitle] = useInputState("");
    const [isStarred, toggleStarStatus] = useToggle(false);

    useEffect(() => {
        axios.get(`/api/boards/${boardId}`)
            .then(response => {
                setBoardInfo(response.data);
                if(response.data.isStarred) toggleStarStatus();
                else return; 
            })

        axios.get(`/api/lists/${boardId}`)
            .then(response => {
                setListArray(response.data.listData);
            })
    }, []);

    const createList = (e) => {
        e.preventDefault();

        axios.post("/api/lists", { listTitle: newListTitle, BoardId: boardId })
            .then((response) => {
                console.log(response);
                setListArray([...listArray, response.data]);
                resetListTitle();
            })
    };

    const toggleBoardStarStatus = () => {
        axios.put(`/api/boards/${boardId}`, { isStarred: !isStarred })
            .then(() => {
                toggleStarStatus();
            })
    }

    return (
        <>
        <header className={boardStyles.boardHeader}>
            <h1>{boardInfo.name}</h1>
            { isStarred ? <button style={{ color: "yellow"}} onClick={toggleBoardStarStatus}><AiFillStar /></button> 
                : <button onClick={toggleBoardStarStatus}><AiOutlineStar /></button> 
            }
            <p>Board Settings</p>
        </header>
        <main className={boardStyles.mainBoard}>
            {listArray.map(list => (
                <List 
                    key={list.id}
                    list={list}
                />
            ))}

            <section className={boardStyles.addListForm}>
                <form onSubmit={createList}>
                    <input value={newListTitle} onChange={updateListTitle} placeholder="+ Add another list" />
                    <button>Add List</button>
                </form>
            </section>
        </main>
        </>
    );
};