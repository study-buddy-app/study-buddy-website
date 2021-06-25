import React, { createContext, useState, useRef, useEffect} from 'react'
import {io} from 'socket.io-client' //<-- in the video its socket.io-client so if it crashes change it 
import Peer from 'simple-peer'

//This is the logic for the entire application

const socket = io('http://localhost:4040')

const SocketContext= createContext();


const ContextProvider = ({children}) =>{

    const [stream, setStream]= useState(null)
    const [me, setMe]= useState('')
    const [call, setCall]= useState ({})
    const [callAccepted, setCallAccepted]= useState (false)
    const [callEnded, setCallEnded]= useState(false)
    const [name, setName] = useState('')

    const myVideo= useRef()
    const userVideo= useRef()
    const connectionRef= useRef()

    useEffect(()=>{
        navigator.mediaDevices.getUserMedia({video: true, audio: true}) //<-- this asks user permission to use video and audio 
            .then((currentStream)=>{ //<--this sends a promise to initializes the stream
                setStream(currentStream)
                myVideo.current.srcObject = currentStream
            })
        socket.on('me', (id)=> setMe(id) )//<--connects to the backend socket.emit('me', socket.id) grabs the unique connection ID and sets it to state

        socket.on('callUser', ({from, name: callerName, signal})=>{ //<-- we are receiving a data object as a parameter
            setCall({isReceivingCall: true, from, name:callerName, signal})
        })
    }, []) //<--Dont forget the empty dependency array or youll get and infinte loop

    const answerCall= ()=>{
        setCallAccepted(true)

        const peer = new Peer({initiator: false, trickle: false, stream})
        peer.on('signal',(data)=>{
            socket.emit('answerCall', {signal: data, to: call.from})
        })

        peer.on ('stream', (currentStream)=>{
            userVideo.current.srcObject= currentStream
        })

        peer.signal(call.signal) //<--coming from initial socket on line 29
        
        connectionRef.peer.current = peer //<-- current peer is sent to the peer inside of this connection under setCallAccepted(true) **coming up as undefined
    }

    const callUser = (id)=>{ 
        const peer = new Peer({initiator: true, trickle: false, stream}) //<-- initiator is set to true because we are the person calling
        peer.on('signal',(data)=>{
            socket.emit('callUser', {userToCall: id, signalData: data, from: me, name}) //<-- we can copy and paste from the above answerCall but we just need to change a few things around
        })

        peer.on ('stream', (currentStream)=>{
            userVideo.current.srcObject= currentStream
        })

        socket.on('callAccepted', (signal) =>{
            setCallAccepted(true)

            peer.signal(signal)
        })

        connectionRef.current=peer
    }

    const leaveCall = ()=>{ 
        setCallEnded(true)
        connectionRef.current.destroy= null()
        window.location.reload()
    }

    return (
        //The SocketContext.Provider makes all the information on the page globally accessible (passable to all components)
        <SocketContext.Provider value={{
            call,
      callAccepted,
      myVideo,
      userVideo,
      stream,
      name,
      setName,
      callEnded,
      me,
      callUser,
      leaveCall,
      answerCall,
        }}>
            {children}
        </SocketContext.Provider>
    )


}

export { ContextProvider, SocketContext}
