import React from "react";
import footerStyles from "./Footer.module.scss";

export default function Footer() {
    const links = ["Templates", "Pricing", "Apps", "Jobs", "Blog", "Developers", "About", "Help", "Legal", "Cookie Settings", "Privacy"];
    return (
        <footer className={footerStyles.footer}>
            <select>
                <option>Light Mode</option>
                <option>Dark Mode (Coming Soon)</option>
            </select>
            <ul>
                {links.map(link => (
                    <li key={link}>{link}</li>
                ))}
            </ul>
            <p className={footerStyles.copyright}>
                © Copyright 2021. All rights reserved. Created by Chase.
            </p>
        </footer>
    );
}