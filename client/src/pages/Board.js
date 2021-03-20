import React from "react";
import { useParams } from "react-router";

export default function Board(props) {
    const { id } = useParams();
    return (
        <>
        <h1>Board Page</h1>
        <p>This is for board number {id}</p>
        </>
    );
};