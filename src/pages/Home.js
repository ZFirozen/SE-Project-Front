import React from "react";

export default function Home(){
    return(
        <div
            style={{
                textAlign:'center',
                display:"flex",
                justifyContent:'center',
                alignItems:'center',
                height:'90vh',
                fontSize:'30px',
                textShadow:'1px 0 5px black,-1px 0 0 black,0 1px 5px black,0 -1px 0 black',
                color:'white',
            }}
        >
            <h1>
                Home
            </h1>
        </div>
    )
}