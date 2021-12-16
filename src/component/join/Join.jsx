import React from "react";
import "./join.css";
import logo from "../../chat.png";
import { Link } from "react-router-dom";
import { useState } from "react";
let user;

function UserData() {
    user = document.getElementById("joinInput").value;
    console.log(user);
    document.getElementById("joinInput").value = "";
}

function Join() {
    const [name, setname] = useState("");
    return ( <
        div className = "joinPage" >
        <
        div className = "joinContainer" >
        <
        img src = { logo }
        alt = "logo" / >
        <
        h1 > ChatKaro < /h1>{" "} <
        input type = "text"
        id = "joinInput"
        placeholder = "Name please!!!"
        onChange = {
            (e) => setname(e.target.value) }
        />{" "} <
        Link onClick = {
            (e) => (!name ? e.preventDefault() : null) }
        to = "/chat" > { " " } <
        button id = "btnId"
        onClick = { UserData } > { " " }
        Login { " " } <
        /button>{" "} <
        /Link>{" "} <
        /div>{" "} <
        /div>
    );
}

export default Join;
export { user };