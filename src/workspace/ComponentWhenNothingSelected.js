import React from "react";

export const ComponentWhenNothingSelected = ({name, margin}) => {
    return(
        <div style={{
            marginTop: margin,
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center'
        }}
        >
            <label style={{
                fontSize : '20px',
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
