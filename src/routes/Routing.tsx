import { Routes , Route } from "react-router-dom";
import { Login } from "../component/Login";
import { Signup } from "../component/Signup";
import { Upload } from "../component/Upload";
import { Home } from "../component/Home";

export const Routing = () =>{
  return(  
  <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element = {<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/home" element={<h1>welcome user</h1>} />
        <Route path = "*" element={<h1>404 not found</h1>} />
    </Routes>
  )
}