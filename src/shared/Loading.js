import React from "react";
import {Circle} from "better-react-spinkit";

function Loading(){
    return(
        <div style={{ display:"flex", flexDirection:"column",
            justifyContent:"center", alignItems:"center", height:"100vh"}}>
            <h2 style={{marginBottom: '10px', fontWeight:"bolder"}}>
                Mediafinance
            </h2>
            <Circle color="gray" size={60}/>
        </div>
    );
}
export default Loading;
