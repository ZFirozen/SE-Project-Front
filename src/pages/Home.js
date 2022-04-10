import React from "react";
import axios from "axios";

export default function Home(){

    const SearchResultDisplay = () => { 
    //     async () => {
    //         const {data} = await axios.get("http://localhost:3000/people");
    //         console.log(data);
    //     }
        console.log(2);
    }

    return(
        
        <div>
            <button type="button" onClick={SearchResultDisplay}>search</button>
        </div>
        
       /*
        <div
            style={{
                type:"button",
                onClick:{SearchResultDisplay},
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
        </div>*/
        
    )
}