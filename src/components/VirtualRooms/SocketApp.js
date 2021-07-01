import { Typography, AppBar } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles'

import Notifications from './Notifications'
import Options from './Options'
import VideoPlayer from './VideoPlayer'
import {ChatEng} from './ChatEng'
import {ContextProvider} from './SocketContext'
import './VirtualRooms.scss';


const useStyles= makeStyles((theme) =>({
  appBar: {
    borderRadius: 15,
    marginTop: '50px',
    // marginRight:'425px',
    width: '600px',
    // border: '5px solid #264653',
    color:'inherit',
    backgroundColor:'#fff',

    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  },
  image: {
    marginLeft: '15px',
  },
  wrapper: {
    marginTop:'-60px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    backgroundColor:'#2A9D8F',
  
  
  
  },
  chat: {
    marignBottom:'100px'
  }
 
}))

const SocketApp =() =>{
  const classes= useStyles()
  return (
<ContextProvider>
    <div className={classes.wrapper}>
      <AppBar className={classes.appBar}>
        {/* <Typography variant='h2' align='center'>Video Chat</Typography> */}
      </AppBar>
      <VideoPlayer/>
      <Options>
        <Notifications/>
      </Options>
      <ChatEng />
    </div>
</ContextProvider>
  );
}

export default SocketApp;
