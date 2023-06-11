import {useState} from 'react'
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { userDataType } from './Home';
import { BASEURL } from '../constant/helper';
import Cookies from 'universal-cookie';
import { CircularProgress, LinearProgress } from '@mui/material';
const cookie = new Cookies();
const jwtToken = cookie.get('jwtToken');


type Props = {
  user : {
    fname : string,
    lname : string,
    userPost : {
      postContainer : {}[]
    },
    profilePicture : string,
    following : Array<string>,
    username : string
  },
  userData : userDataType,
  isProfilePage ?: boolean,
  setUserData : Function
}



export const ProfilesAtfind = ( props : Props) =>{
  const {user , setUserData} = props
  const alreadyFollowing = props.userData?.following?.indexOf(user.username);
  const posts = user.userPost.postContainer.length
  const following = user.following.length;
  const [loading , setLoading] = useState<boolean>(false)

  const isProfilePage = props.isProfilePage;

  const [followed , setFollowing] = useState<boolean>(false)

  const followUser = async (e : React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();   
    setLoading(true); 
    const userName = user.username;

    const res = await fetch(`${BASEURL}/followUser`, {
      method : "POST",
      headers :{
        Accept : 'application/json',
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        "username":userName,
        "jwtToken" : jwtToken
    }),
    credentials : 'include'
    })
    const data = await res.json();
    setUserData()
    setFollowing(!followed);
    setLoading(false)
  }

  const FollowingCard = () =>{
    return(
      <form onSubmit={followUser}>
          <Card
          orientation="horizontal"
          sx={{
            width: '100%',
            flexWrap: 'wrap',
            [`& > *`]: {
              '--stack-point': '500px',
              minWidth:
                'clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)',
            },
            // make the card resizable for demo
            overflow: 'auto',
            resize: 'horizontal',
          }}
        >
          <AspectRatio ratio="1" maxHeight={182} sx={{ minWidth: 182, flex: 1 }}>
            <img
              src={user.profilePicture}
              srcSet={user.profilePicture}
              loading="lazy"
              alt=""
            />
          </AspectRatio>
          <CardContent>
            <Typography fontSize="xl" fontWeight="lg">
              {user.fname} {user.lname}
            </Typography>
            <Sheet
              sx={{
                bgcolor: 'background.level1',
                borderRadius: 'sm',
                p: 1.5,
                my: 1.5,
                display: 'flex',
                gap: 2,
                '& > div': { flex: 1 },
              }}
            >
              <div>
                <Typography level="body3" fontWeight="lg">
                  Posts
                </Typography>
                <Typography fontWeight="lg">{posts}</Typography>
              </div>
              <div>
                <Typography level="body3" fontWeight="lg">
                  Following
                </Typography>
                <Typography fontWeight="lg">{following}</Typography>
              </div>
            </Sheet>
            <Box sx={{ display: 'flex', gap: 1.5, '& > button': { flex: 1 } }}>
              {loading ? <div className='flex w-full justify-center'><CircularProgress /></div> : 
              <Button variant="solid" color="primary" type='submit'>
                {followed ? "Unfollow" : "Follow"}
              </Button>
              }
            </Box>
          </CardContent>
        </Card>
        </form>
    )
  }
  


    return(
        <>
        {alreadyFollowing >=0 ? isProfilePage ?  <FollowingCard /> : null :
         <FollowingCard />}
        </>
    )
}