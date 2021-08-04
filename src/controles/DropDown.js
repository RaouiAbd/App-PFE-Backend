import React, {useEffect, useRef, useState} from "react";
import './DropDown.css';

export default function DropDown
    ({
         data,
         prompt,
         value,
         label,
         id,
         onChange
    }){

    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const ref = useRef(null);

    useEffect(()=>{
        document.addEventListener("click", close);
        return () => document.removeEventListener("click", close);
    }, []);

    function close(e) {
        setOpen(e && e.target === ref.current)
    }

    return <div className="dropdown">
        <div className="control">
            <div
                className="selected-value" ref={ref}
                onClick={() => setOpen((prev) => !prev)}
            >
                {value ? value[label] : prompt}
            </div>
            <div className={open ? "arrow open" : "arrow"}/>
        </div>
        <div className={open ? "options open" : "options"}>
            {
                data.map(option =>
                    <div
                        key={option[id]}
                        className={option === value ? "option selected" : "option"}
                        onClick={() => {
                            onChange(option);
                            setOpen(false);
                        }}
                    >
                    {option[label]}
                    </div>
                )
            }
        </div>
    </div>
}
