import { Feed } from "./Feed"
import { useEffect , useState} from 'react'
import { PersonalComonent } from "./PersonalComponent"
import { FindPeople } from "./FindPeople"
import { ProfilePage } from "./ProfilePage"



export type userDataType = {
    authToken : string,
    fname : string,
    username : String,
    email : string,
    lname : string,
    number : string,
    post : object,
    userPost :{
        postContainer : Array<object>
    },
    profilePicture : string,
    following : Array<string>,
    bio : string
}

export const Home = () =>{
    const initData = {
        authToken : "",
        fname : "",
        email : "",
        username : "",
        lname : "",
        number : "",
        post : {},
        userPost :{
            postContainer : [{}]
        },
        profilePicture : "",
        following : [""],
        bio : ""
    }
    const [userData  , setUserData] = useState<userDataType>(initData) ;
    const [homeView , setHomeView] = useState<boolean>(true);
    const fetchUserData = async () =>
        {
            const res = await fetch("/home" , {method : "GET"});
            const data = await res.json();
     
            setUserData(data);
        }

    useEffect(()=>{
        fetchUserData() ; 
    },[])

    return(
        <div className="flex flex-row  bg-slate-200 w-full  h-screen items-center justify-between">
           
            <div className="bg-white h-full w-[20%] drop-shadow-xl">
                <PersonalComonent userData={userData} setHomeview={ setHomeView } homeView={homeView}/>
            </div>

            <div className="bg-white h-full w-[50%] drop-shadow-2xl">
                { !homeView  ? <ProfilePage userData = {userData} setHomeView={setHomeView} /> : <Feed userData={userData}/>}
            </div>

            <div className="bg-white h-full w-[20%] drop-shadow-xl">
                <FindPeople userData = {userData} />
            </div>

        </div>  
        
    )

}