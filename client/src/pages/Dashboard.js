import React from "react";
import useToggle from "../hooks/useToggle";
import useInputState from "../hooks/useInputState";
import { Link } from "react-router-dom";
import axios from "axios";
import dashStyles from "./Dashboard.module.scss";


export default function Dashboard() {
    const [modal, toggleModal] = useToggle(false);
    const [boardName, updateName] = useInputState("");
    const [boardDesc, updateDesc] = useInputState("");

    const createBoard = (e) => {
        e.preventDefault();

        axios.post("/test", {name: boardName, description: boardDesc })
            .then(() => {
                updateName("");
                updateDesc("");
            })
    }

    return (
        <div className={dashStyles.dashboard}>
            <main className={dashStyles.dashMain}>
                <header>
                    <h1>Trellolo Boards</h1>
                    <p>Get started with a new board or continue working in an existing board.</p>
                    <hr />
                </header>

                <section>
                    <button onClick={toggleModal}>➕ Create Board</button>
                </section>

                <section>
                    <h2>⭐ Starred Boards</h2>
                </section>

                <section>
                    <h2>💻 All Boards</h2>
                </section>
            </main>
            <aside className={dashStyles.sidebar}>
                <ul>
                    <div>
                        <li><Link to="/dashboard" className={dashStyles.sideLink}>💻 Boards</Link></li>
                        <li className={dashStyles.sideLink}><button onClick={toggleModal}>➕ Create Board</button></li>
                    </div>
                    <li><Link to="/board-settings" className={dashStyles.sideLink}>⚙ Board Settings</Link></li>
                </ul>
            </aside>

            {modal ? 
                <div className={dashStyles.newBoardModal}>
                    <h2>Create New Board</h2>
                    <form onSubmit={createBoard}>
                        <label>Board Name</label>
                        <input type="text" value={boardName} onChange={updateName} />
                        <label>Description</label>
                        <input type="text" value={boardDesc} onChange={updateDesc} />
                        <button>Create</button>
                        <button onClick={toggleModal}>Cancel</button>
                    </form>
                </div>
                : null
            }
        </div>
    );
};