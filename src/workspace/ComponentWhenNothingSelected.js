import React from "react";

export const ComponentWhenNothingSelected = ({name}) => {
    return(
        <div style={{
            marginTop:'30px',
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center'
        }}
        >
            <label style={{
                fontSize : '18px',
                textAlign:'center',
                marginBottom:'10px'
            }}
            >
                No {name} selected
            </label>
            <p style={{
                fontSize : '18px',
                textAlign:'center'}}>
                👈  Please Select a {name} !!!!! 👈
            </p>

        </div>
    );
}
