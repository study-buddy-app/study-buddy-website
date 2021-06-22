import React from 'react'
import './Virtualroom.scss'

export default function Virtualroom() {
    return (
        <div className='virtualmeetup'>
            <div className='roomlist'>
               <h1>Room list</h1>
            </div>
            <div className='currentroom'>
               <h1>video</h1>
               <div className='chatbox'>
               <h1>chat</h1>
               </div>
            </div>
        </div>
    )
}
