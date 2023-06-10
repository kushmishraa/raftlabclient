import { Avatar, Button } from "@mui/material";
import { useEffect , useState} from "react";
import { userDataType } from "./Home";
type Props={
    userData : userDataType ,
    setHomeview : Function,
    homeView : boolean
}
export const PersonalComonent = (props : Props) =>{
const userData = props.userData;
const setHomeView = props.setHomeview;
const homeView = props.homeView
    return(
        <div className="w-full h-screen flex flex-col justify-center">
            <div>
              <div>
                <img src={userData.profilePicture} />
              </div>
              <div>
                <Button variant = "outlined" sx={{width : "100%"}} onClick={()=>setHomeView(!homeView)}>{homeView ? "Profile" : "Home"}</Button>
              </div>
            </div>
        </div>
    )
}