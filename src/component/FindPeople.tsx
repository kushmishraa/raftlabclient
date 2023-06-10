import { useEffect, useState } from "react";
import { ProfilesAtfind } from "./ProfilesAtfind";
import { userDataType } from "./Home";
import { BASEURL } from "../constant/helper";


export type allUserType={
    users : {
    fname : string,
    lname : string,
    userPost : {
        postContainer : {}[]
    },
    profilePicture : string,
    following : Array<string>,
    username : string
    }[]
}

type Props = {
    userData : userDataType,
    isProfilePage ?: boolean
}

export const FindPeople = (props : Props) =>{

    const { userData } = props

    const isProfilePage = props?.isProfilePage

    const initData = {
        users : 
        [{
                fname:"",
                lname:"",
                userPost : {
                    postContainer : []
                },
                profilePicture : "",
                following : [""],
                username : ""
        }]
    }
    
    const [allUser , setAllUser] = useState<allUserType>(initData)

    const fetchAllUser=async()=>{
        const res = await fetch(`${BASEURL}/findPeople`,{
            method :"GET"
        });
        const data = await res.json();
        setAllUser(data);

    }
    useEffect(()=>{ 
        fetchAllUser()
    },[])
    return(
        <div className="w-full h-screen gap flex flex-col justify-evenly items-center">
           <div className="h-50%">
                <h1>Who to Follow ?</h1>
            </div>
            <div className="overflow-y-scroll">
                {Object.keys(allUser).length == 0 ? null : allUser.users.map((user)=>{ 
                    return userData.username == user.username ? null : <ProfilesAtfind user={user} userData = {userData} isProfilePage={isProfilePage}/>
                })}
               
            </div>
        </div>
    )
}
