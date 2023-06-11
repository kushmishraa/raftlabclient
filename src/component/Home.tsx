import { Feed } from "./Feed"
import { useEffect , useState} from 'react'
import Cookies from 'universal-cookie';
import { PersonalComonent } from "./PersonalComponent"
import { FindPeople } from "./FindPeople"
import { ProfilePage } from "./ProfilePage"
import { BASEURL } from "../constant/helper"

const cookie = new Cookies();
const jwtToken = cookie.get('jwtToken')


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
            const res = await fetch(`${BASEURL}/home` , {
                method : "POST",
                headers : {
                    Accept : 'application/json',
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({jwtToken})
            
            });
            const data = await res.json();
     
            setUserData(data);
        }

    useEffect(()=>{
        fetchUserData() ; 
    },[])

    return(
        <div className="flex flex-row  bg-slate-200 w-full  h-screen items-center justify-between">
           
            <div className="bg-white h-full w-[20%] drop-shadow-xl">
                <PersonalComonent userData={userData} setHomeview={ setHomeView } homeView={homeView} setUserData = {fetchUserData}/>
            </div>

            <div className="bg-white h-full w-[50%] drop-shadow-2xl">
                { !homeView  ? <ProfilePage userData = {userData} setHomeView={setHomeView} setUserData={fetchUserData}/> : <Feed userData={userData} setUserData={fetchUserData}/>}
            </div>

            <div className="bg-white h-full w-[20%] drop-shadow-xl">
                <FindPeople userData = {userData} setUserData = {fetchUserData}/>
            </div>

        </div>  
        
    )

}