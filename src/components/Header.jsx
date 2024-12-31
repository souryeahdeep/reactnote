import React from "react";
import HighlightIcon from "@mui/icons-material/Highlight";
import { Link } from "react-router-dom";
function Header(props) {
  return (
    <header className="bg-purple-400 text-2xl flex justify-between">
      <h1>
        <HighlightIcon />
       {props.username}'notes
      </h1>
      <h2><Link to="/">Logout</Link></h2>
    </header>
  );
}

export default Header;
