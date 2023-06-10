import React from "react"
import { BASEURL } from "../constant/helper";


export const Upload = () =>{

    const handleFormSubmit = async (e : React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        
        const formData = new FormData();
        const file = e.currentTarget.image.files[0];
        formData.append('image' , file)
  
        try{
            const res = await fetch(`${BASEURL}/upload` , {
                method : "post",
                body : formData
            })
            const data = await res.json();
           
        
        }catch(err){
            console.log(err);
        }
        }

    return(
        <>
            <form onSubmit={handleFormSubmit}>
                <input type="file" name="image"/>
                <button type="submit">submit</button>
            </form>
        </>
    )

}