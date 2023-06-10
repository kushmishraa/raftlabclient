import {useEffect, useState} from 'react'
import { Button, TextareaAutosize } from "@mui/material"
import { BASEURL } from '../constant/helper'


type Props = {
    username : string,
    image : string,
    openComment : Function,
    userData : String
}

export const CommentSection = (props : Props) =>{


    const {username , openComment , image , userData} = props
    const [comments , setComments] = useState<[{
        from : string,
        comment : string
    }]>([{
        from : "",
        comment : ""
    }])

    const fetchComments = async ()=>{
        const res = await fetch(`${BASEURL}/fetch-comments`,{
            method : "POST",
            headers : {
                Accept : 'application/json',
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                "username" : username,
                "image" : image
            })
        })

        const data = await res.json();
        setComments(data.comments);
    }

    const addComments = async (parentUser : String , username : string , image : string , e : React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const caption = e.currentTarget.comment.value;
       const res = await fetch(`${BASEURL}/add-comments` , {
        method : "POST",
        headers :{
            Accept : 'application/json',
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            parentUser : parentUser,
            childUser : username,
            image : image,
            caption : caption
        })
       }) 

       const data = await res.json();


    }

    useEffect(()=>{
        fetchComments()
    },[username])

    
    return(
        <div className='w-full rounded flex flex-col h-full justify-evenly items-center gap-10'>
        <div className='w-full flex justify-end'>
         <Button onClick={()=>openComment("")} variant='contained'> close </Button>
        </div>
        <div className='flex flex-col justify-center  items-center w-full h-90'>
            <form onSubmit={(e)=>addComments(userData , username , image,e)} className="flex flex-col w-1/2 border-2 border-solid">
            <TextareaAutosize minRows={5} placeholder="Post a Comment"
            style={{
            width : "100%",
            padding : "2%"
            }}
             name="comment" />
            <Button variant="outlined" type='submit' >Add comment</Button>
            </form>
        </div>
        <div className="flex flex-col w-full overflow-y-scroll  p-2 gap-3 bg-cyan-50 items-center">
            {comments?.length > 0 ?  comments.map((comObj : {from : string , comment : string})=>{
                return(<div className='flex w-1/2 justify-around p-2 drop-shadow-2xl rounded-full bg-white'>
                <h2 className=''>{comObj.from}</h2>
                <h3 className=''>{comObj.comment}</h3>
                </div>)
                }) : null}
        </div>
        </div>
    )
}