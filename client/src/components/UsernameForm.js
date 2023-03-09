import React from "react";

function Form(props){
    return (
        <form>
            <input 
                type="text" 
                placeholder="Enter your username" 
                value={props.username}
                onChange={props.onChange}
            />
            <button onClick={props.connect}>Connect</button>
        </form>
    );
};

export default Form;