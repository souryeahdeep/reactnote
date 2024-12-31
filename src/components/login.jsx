import "../App";
import { useForm } from "react-hook-form"
import { Link, Outlet, useNavigate } from "react-router-dom";
import Notes from "./notes";
import { TextField } from "@mui/material";

function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (d) => {
    try {
      const response = await fetch("http://localhost:8081/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(d), // Send form data as JSON
      });

      const result = await response.json();
      
      
          if(result.val){
            navigate('/notes',{state: result})
        }else
          {
            alert("Invalid");
          }
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <main id="loginbox" className="p-10 rounded-2xl justify-center items-center flex-col form-signin m-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-100 justify-content-center items-center gap-2 px-5"
      >
        <h1 className="h3 mb-3 fw-normal">LOGIN</h1>

        <div className="form-floating">
          <input
            type="text"
            {...register("username")}
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            autoComplete="off"
          />
          <label className="text-black" htmlFor="floatingInput">
            Username
          </label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            {...register("password")}
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
          <label className="text-black" htmlFor="floatingPassword">
            Password
          </label>
        </div>

        <input
           className="btn btn-primary w-100 py-2"
           type="submit"
        />
        <p className="text-green-500 flex gap-2 mt-5 mb-3Name">
          New Here?
          <Link id="signup" to="/signup">
            Sign UP
          </Link>
        </p>
      </form>
      <Outlet />
    </main>
  );
}
export default Login;
