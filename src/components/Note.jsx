import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
function Note(props) {
    const state=props.message;
      const navigate = useNavigate();
    
    const onDelete = async (d) => {

        console.log(d);
        
        try {
          const response = await fetch("http://localhost:8081/delete", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(d), // Send form data as JSON
          });
    
          const result = await response.json();
          console.log(result);
          console.log("Deleted",d.id);
          
          props.onButtonClick(state);
          if(result){
            
            navigate("/notes",{state:state})
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };

  return (
    <div id={props.id} className="note">
      <h1 className="font-bold">{props.title}</h1>
      <p>{props.content}</p>
     
    <button type="submit" onClick={()=>{onDelete(props.which)}}><DeleteIcon/></button>
     
    </div>
  );
}

export default Note;
