import { Avatar, Button, TextareaAutosize } from "@mui/material"
import React, { useEffect, useRef, useState } from 'react'
import { userDataType } from "./Home"
import { FindPeople } from "./FindPeople"

type Props = {
    userData : userDataType,
    setHomeView : Function,
}

export const ProfilePage = (props : Props) =>{

    const {userData} = props
    const [bioEditable , setBioEditable] = useState<boolean>(false);
    const [showFollowing , setShowFollowing] = useState<boolean>(false);
    const [following , setFollowing] = useState<Number>(userData.following.length)
    const [bio , setBio] = useState<string>(userData.bio);

    const followingRef = useRef<HTMLDivElement>(null);

    const followUser = async ( username : string , e : React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();    
        const userName = username;
    
        const res = await fetch("/followUser", {
          method : "POST",
          headers :{
            Accept : 'application/json',
            'Content-Type' : 'application/json'
          },
          body : JSON.stringify({
            "username":userName
        }),
        credentials : 'include'
        })
        const data = await res.json();
       handleShowFollowing()
      }
    
    const handleBioUpdate = async (e : React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const res = await fetch("/addPost",{
            method : "POST",
            headers : {
                Accept : 'application/json',
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                username : userData.username,
                bio : bio
            })
        })

        const data = await res.json();
  
        setBioEditable(!bioEditable)
    }

    const handleShowFollowing = () =>{
        followingRef.current?.classList.contains("hidden") ? followingRef.current.classList.remove("hidden") : followingRef.current?.classList.add("hidden");
        setShowFollowing(!showFollowing);
    }
    useEffect(()=>{
        setFollowing(userData.following.length)
    },[showFollowing])

    return(
        <div className="h-screen gap-10 overflow-y-scroll relative flex flex-col">
            <div>
                <img src={userData.profilePicture} style={{minWidth:"100%" , minHeight : "300px" , maxHeight : "500px"}}></img>
            </div>
            <div className="flex justify-evenly">
            <div className="flex flex-col items-center">
                <div>Posts</div>
                <div>{userData.userPost.postContainer.length}</div>
            </div>
            <div className="flex flex-col items-center pointer" onClick={handleShowFollowing}>
                <div>Following</div>
                <div>{userData.following.length}</div>
            </div>
            </div>
            <div className="flex w-full justify-center">
                <h1 style={{fontFamily : "'Montserrat', sans-serif" , fontSize : "30px"}}>{userData.fname} {userData.lname}</h1>
            </div>
            <div className="flex flex-col justify-center items-center w-full">
            <form onSubmit={handleBioUpdate} className="w-full flex flex-col items-center">
                <div className="w-full">
                <TextareaAutosize 
                minRows={5} 
                placeholder="Don't Leave your bio empty , have any guesses ? "
                    style={{
                        textAlign : "center",
                        width : "100%",
                        padding : "2%",
                        fontFamily : "'Montserrat', sans-serif"
                    }}
                    onChange={(e)=>setBio(e.currentTarget.value)}
                name="caption"
                value={bio} disabled={!bioEditable} />  
                </div>
                <div>
                    
                    {bioEditable ? 
                        <>
                        <Button variant="outlined" onClick={()=>setBioEditable(!bioEditable)}>Cancel</Button>
                        <Button variant="outlined" type="submit">Save</Button>
                        </>
                    : <Button variant="outlined" onClick={()=>setBioEditable(!bioEditable)}>Update bio</Button>}
                </div>
            </form>
            </div>
            <div className="w-full flex flex-col items-center gap-10 justify-center">
            {userData.userPost.postContainer.length >= 1 ? userData.userPost.postContainer.map((posts : any)=>{
                return(
                    <>
                    { posts.image ?
                    <div className="drop-shadow-2xl bg-stone-50 flex flex-col max-w-638 max-h-667 " key={posts.username}>
                            <div className="drop-shadow-xl bg-stone-50 p-1 flex items-center">
                            <Avatar
                                alt="Remy Sharp"
                                src={userData.profilePicture}
                                sx={{ maxWidth: "100px", maxHeight: "69px" }}
                                />
                            <h1 style={{fontFamily : "'Montserrat', sans-serif" }}> {userData.username}</h1>
                            </div>
                            <div className="p-5">
                            <h2>{posts.caption}</h2>
                            </div>
                            <div>
                            <img src={posts.image} width={512} className="my-0 mx-auto max-h-400"></img>
                            </div>
                            </div>
                            : <h1>Notfound</h1> }
                        </>
                )
            }): null}
            </div>
            <div className="fixed w-full h-500 hidden rounded drop-shadow-2xl  bg-white z-999" ref={followingRef} style={{minHeight : "100vh"}}>
                <div>
                    <Button onClick={handleShowFollowing} variant="outlined">close</Button>
                </div>
                <div className="flex flex-col items-center justify-center gap-10 h-screen overflow-y-scroll min-h-screen">
                    
                    {userData.following.map((username)=>{return(
                    <form onSubmit={(e)=>followUser(username,e)}>
                    <div className="flex gap-10">
                    <div>
                    <h1>{username}</h1>
                    </div>
                    <div>
                    <Button variant="contained" type="submit">Unfollow</Button>
                    </div>
                    </div>
                    </form>
                    )})}
                    
                    
                </div>
            </div>
        </div>
    )
}