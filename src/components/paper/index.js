import React from "react";
import './index.css'

export default function Paper({children}){
    return(
        <div
            className="paper"
        >
            {children}
        </div>
    )
}