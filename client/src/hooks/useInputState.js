import { useState } from "react";

export default function useInputState(initialVal) {
	const [state, setState] = useState(initialVal);
    const handleChange = (e) => {
        setState(e.target.value);
    };
    const reset = () => {
        setState("");
    }
    

    return [state, handleChange, reset];
}