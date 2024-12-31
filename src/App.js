import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login";
import SignUP from "./components/signup";
import Notes from "./components/notes";

import './App.css';
function App() {
  return (
    
      <BrowserRouter>
        <Routes>  
          <Route path="/" element={<Login />}/>
          <Route path="/signup" element={<SignUP/>}/>
          <Route path="/notes" element={<Notes/>}/>
          
        </Routes>
      </BrowserRouter>
    
  );
}

export default App;
