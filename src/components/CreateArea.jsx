import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import { useForm } from "react-hook-form";
function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);
  const {register, handleSubmit,reset}=useForm();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const onSubmit = async (d) => {
    console.log(d);
    const state=props.message;
    try {
      const response = await fetch("http://localhost:8081/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(d), // Send form data as JSON
      });

      const result = await response.json();
      console.log(result);
      if(result)
        { 
            navigate('/notes',{state:state})
        }
      else{
        alert("note");
      }
      reset();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="create-note">
        {isExpanded && (
          <input
            {...register("title")}
            placeholder="Title"
          />
        )}

        <textarea
          {...register("content")}
          onClick={expand}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
       <button onClick={props.onButtonClick} type="submit"> 
            <AddIcon />
        </button>
      </form>
    </div>
  );
}

export default CreateArea;
