"use client"
import { useSession } from "next-auth/react"

// const useClientSession=useSession()

export const  useClientSession=()=>{
    const session=useSession()
    if(session.data){
        return session.data
    }
    else{
        return null
    }
  
}