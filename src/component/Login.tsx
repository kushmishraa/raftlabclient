import TextField from '@mui/material/TextField';
import { Box, Button, CircularProgress } from '@mui/material';
import Cookies from 'universal-cookie';
import React, { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { BASEURL } from '../constant/helper';

const cookies = new Cookies();

type userDataType = {
   email : string,
   password :string 
}


export const Login  = ()=>{
    const [loginError , setError] = useState<boolean>(false)
    const [loginDetails , setLoginDetails] = useState({});
    const [loading , setLoading] = useState<boolean>(false)
    const navigate = useNavigate();
    const userVerification = async (userData : userDataType) =>{    
       setLoading(true);
        const {email , password} = userData;
       try{
        const res = await fetch(`${BASEURL}/login-validation` , {
        method : "POST",
        headers : {
            Accept : "application/json",
            "Content-Type" : 'application/json',
        },
        body : JSON.stringify({
            email : email,
            password : password
        }),
        credentials : 'include',
       });

       const data = await res.json();
       if(res.status == 201){
            cookies.set('jwtToken',data.token)
            setLoading(false)
            setError(false)
            navigate("/home");
       }
       else{
        setLoading(false)
        setError(true)
       }
   
    }
    catch(err){
        console.log(err);
    }
}

    const handleFormSubmit = (e : React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const {email , password} = e.currentTarget
        userVerification({email : email.value , password : password.value})
    }
    return(
       <Box sx={{height : '100%'}}>
        <div className='w-full flex flex-col justify-center items-center h-full gap-5'>
            <div className=''>
                <h1 className='text-pink-500 text-2xl'>Login to your account</h1>
            </div>
            <form className="w-1/2 flex flex-col justify-center items-center gap-2" onSubmit={handleFormSubmit}>
                {!loginError ? 
                <>
                <TextField
                    id='email'
                    label="Email address"
                    variant='outlined'
                    type="email"
                    name='email'
                    />
                    
                    <TextField
                    id='password'
                    label="Password"
                    variant='outlined'
                    maxRows={1}
                    type="password"
                    name='password'
                />
                </> :
                <>
                <TextField
                    id='email'
                    label="Email address"
                    variant='outlined'
                    type="email"
                    name='email'
                    error
                    />
                    
                    <TextField
                    id='password'
                    label="Password"
                    variant='outlined'
                    maxRows={1}
                    type="password"
                    name='password'
                    error
                />
                </>
                }

                {loading ? <CircularProgress /> : <Button variant="contained" type="submit" >Login</Button> }
        </form>
        <div className=''>
            <Link to="/signup"><h2>Dont'have an account ?</h2></Link>
        </div>
    </div>
       </Box>
    )
}