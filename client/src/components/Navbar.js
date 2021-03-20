import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.scss";

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    if(isLoggedIn) {
        return (
            <nav className={styles.navbar}>
                <NavLink exact to="/" className={styles.navLink}>Trellolo</NavLink>
                <ul>
                    <li>
                        <NavLink exact to="/" activeClassName={styles.activeLink} className={styles.navLink}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink exact to="/dashboard" activeClassName={styles.activeLink} className={styles.navLink}>Dashboard</NavLink>
                    </li>
                </ul>
            </nav>
        );
    }
    else {
        return (
            <nav className={styles.navbar}>
                <NavLink exact to="/" className={styles.navLink}>Trello Clone</NavLink>
                <ul>
                    <li>
                        <NavLink exact to="/" activeClassName={styles.activeLink} className={styles.navLink}>Log In</NavLink>
                    </li>
                    <li>
                        <NavLink exact to="/dashboard" activeClassName={styles.activeLink} className={styles.navLink}>Sign Up</NavLink>
                    </li>
                </ul>
            </nav>
        );
    }
};