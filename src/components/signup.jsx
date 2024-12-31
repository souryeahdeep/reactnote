
import {Outlet, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";

function SignUP(){
    const navigate = useNavigate();
    const {register,handleSubmit}=useForm();
    const onSubmit = async (d) => {
        try {
          const response = await fetch("http://localhost:8081/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(d), // Send form data as JSON
          });
         
          const result = await response.json();
          if(result===true){
            navigate('/')
          }else
          {
            alert("User Already Exists");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
    return(
    <main id="loginbox" className="form-signin w-1/3 m-auto p-10 rounded-2xl justify-center items-center flex-col">
        <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-col w-100 justify-content-center items-center gap-2 px-5">
          <h1 className="h3 mb-3 fw-normal">SIGN UP</h1>

          <div className="form-floating">
            <input
              type="text"
              {...register("username")}
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              autoComplete="off"
            />
            <label className="text-black" htmlFor="floatingInput">Username</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              {...register("password")}
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              autoComplete="off"
              
            />
            <label className="text-black" htmlFor="floatingPassword">Password</label>
          </div>

        
          <input
           className="btn btn-primary w-100 py-2"
           type="submit"
        />
        </form>
        <Outlet/>
      </main>);
}
export default SignUP;

//Souryadeep - 12345
//Soumik - mango