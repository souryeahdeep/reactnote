import React, { useState,useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { useLocation } from "react-router-dom";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [reset, setReset] = useState();
  const location = useLocation();
  const { state } = location || {};
  
  useEffect(() => {
    setTimeout(() => {
      fetchData(state);
    }, 500);
  }, [reset]);
  const fetchData = async (state) => {
    try {
      const response = await fetch("http://localhost:8081", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      });
      const result = await response.json();
      setNotes(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  return (
    <div className="w-full h-full">
      <Header username={state.username}/>
      <CreateArea onButtonClick={setReset} message={state}/>
      {notes.map((noteItem,index) => {
        return (
          <Note
            key={index}
            which={noteItem}
            id={noteItem.id}
            title={noteItem.titles}
            content={noteItem.content}
            message={state}
            onButtonClick={setReset}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default Notes;
