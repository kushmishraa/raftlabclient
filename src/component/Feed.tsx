import { useState , useEffect, useRef } from "react"
import { CreatePost, postDataType } from "./CreatePost"
import { userDataType } from "./Home"
import { Avatar, Button, TextareaAutosize } from "@mui/material"
import { CommentSection } from "./CommentSection"
import { BASEURL } from "../constant/helper"

type Props={
    userData : userDataType 
}
export const Feed = (props : Props) =>{

    const commentSectionRef = useRef<HTMLDivElement>(null)
    const [forceRender , setForceRender] = useState<boolean>(true)
    const {userData} = props;
    const [followedPosts , setFollowedPost] = useState<Array<postDataType>>([]);
    const [selectedComments , setSelectedComments] = useState<{
        username : string,
        image : string
    }>({username:"",image:""});

    const profileFeed = (followedPost : Array<postDataType>) =>{

        const transformedArray : Array<postDataType> = [];
        followedPost?.map((postObj:any)=>{
            postObj.post?.map((post : any)=>transformedArray.push({...post , username : postObj.username , profilePicture : postObj.profilePicture}))
        })

        userData?.userPost?.postContainer?.map( (posts:any)=>{
            transformedArray.push({...posts , profilePicture : userData.profilePicture , username : userData.username})
          // setFollowedPost([...followedPost,{...posts , profilePicture : userData.profilePicture}])
        });
        transformedArray.sort((a,b)=>{
            return new Date(b.date).valueOf() - new Date(a.date).valueOf()
        })
      
        setFollowedPost(transformedArray);
    }

    const fetchAllUser = async() => {
        const user = await Promise.all(userData?.following?.map( async (username)=>{
            const res = await fetch(`${BASEURL}/getFollowerPost`,{
                method : "POST",
                headers : {
                    Accept : 'application/json',
                    'Content-type' : 'application/json'
                },
                body : JSON.stringify({
                    "username" : username
                })
            })
            const data = res.json();
            return data
        }))
        profileFeed(user)
       
    }

    const handleLike = async (username : string , image : string) =>{
        const res = await fetch(`${BASEURL}/like`,{
            method : "POST",
            headers : {
                Accept : "application/json",
                "Content-Type" : 'application/json'
            },
            body : JSON.stringify({
                "username" : username,
                "likedBy" :  userData.username,
                "image" : image
            })
        })
        const data = await res.json();
    
        setForceRender(!forceRender);
    }
    
   const  openComment = (username : string , image : string) =>{
        commentSectionRef.current?.classList.contains("hidden") ? commentSectionRef.current.classList.remove("hidden") : commentSectionRef.current?.classList.add("hidden");
        setSelectedComments({username:username , image : image});
    }
   
    useEffect(()=>{  
        fetchAllUser();
    },[userData , forceRender])
    return(

        //feed container
        <div className="w-full h-full flex flex-col justify-center items-center overflow-y-scroll relative">
            {/* creating post */}
            <div className="w-full">
                <CreatePost userData={userData}/>
            </div>

            {/*user posts */}
            <div className="w-full min-h-1/2 drop-shadow-2xl flex flex-col gap-y-8 justify-between items-center">
                {followedPosts.length >= 1 ? 
                    followedPosts.map((posts)=>{
                        return(
                          <>
                            {posts.profilePicture ? 
                            <div className="drop-shadow-2xl bg-stone-50 flex flex-col max-w-638 max-h-667 " key={posts.username}>
                            <div className="drop-shadow-xl bg-stone-50 p-1 flex items-center">
                            <Avatar
                                alt="Remy Sharp"
                                src={posts.profilePicture}
                                sx={{ maxWidth: "100px", maxHeight: "69px" }}
                                />
                            <h1 style={{fontFamily : "'Montserrat', sans-serif"}}> {posts.username}</h1>
                            </div>
                            <div className="p-5">
                            <h2>{posts.caption}</h2>
                            </div>
                            <div>
                            <img src={posts.image} width={512} className="my-0 mx-auto max-h-400"></img>
                            </div>
                            <Button variant={posts.like.findIndex(x=>x.user == userData.username)==-1?"outlined":"contained"} onClick={()=>handleLike(posts.username , posts.image)}>{posts.like.findIndex(x=>x.user == userData.username)==-1?"Like":"dislike"}</Button>
                            <Button variant="outlined" onClick={()=>openComment(posts.username , posts.image)}>Comment</Button>
                            </div> : null }
                         
                            </>
                        )
                    })
                    : null
                }
            </div>
            {/*Comments*/}
            <div className="fixed hidden w-full h-100 rounded overflow-y-scroll drop-shadow-2xl bg-white z-999" ref={commentSectionRef}>
                <CommentSection username={selectedComments.username} image={selectedComments.image} openComment={openComment} userData = {userData.username}/>
            </div>
        </div>
    )
}