import React from "react";

export const TasksWhenNoProjectSelected = () => {
    return(
        <div style={{
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center'}}
        >
            <h3 style={{
                fontWeight : '400',
                margin : '30px 0 20px',
                textAlign:'center'}}
            >
                Tasks
            </h3>
            <p> No project selected </p>
        </div>
    );
}
