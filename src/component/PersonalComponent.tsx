import { Avatar, Button, CircularProgress, Skeleton } from "@mui/material";
import { useEffect , useState} from "react";
import { userDataType } from "./Home";
type Props={
    userData : userDataType ,
    setHomeview : Function,
    homeView : boolean,
    setUserData : Function
}
export const PersonalComonent = (props : Props) =>{
const userData = props.userData;
const setHomeView = props.setHomeview;
const homeView = props.homeView
    return(
        <div className="w-full h-screen flex flex-col justify-center">
            <div>
              <div>
                {userData?.profilePicture?.length > 0 ?<img src={userData.profilePicture} /> : 
                <Skeleton
                  variant="rectangular"
                  width={307}
                  height={437}
                  /> }
              </div>
              <div>
                <Button variant = "outlined" sx={{width : "100%"}} onClick={()=>setHomeView(!homeView)}>{userData?.profilePicture?.length > 0 ? homeView ? "Profile" : "Home": <CircularProgress />}</Button>
              </div>
            </div>
        </div>
    )
}