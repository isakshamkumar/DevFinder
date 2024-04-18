"use client"
import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'

type VideoPlayer = {
index:number;
 video:any;
}

const VideoPlayer:React.FC<VideoPlayer> = ({index,video}) => {
    const [mount,setmount]=useState(false)
    useEffect(()=>{
setmount(true)
    },[])
if(mount){
    
  return (
    <ReactPlayer
    key={index}
    url={video}
    controls
    className="w-3/5 h-36 rounded-md mr-2 mb-2 shadow-md"
  />
  )
}
}

export default VideoPlayer