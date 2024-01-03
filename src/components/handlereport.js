import React from 'react'
import Report from './Report'

export default function Handlereport() {
    if (localStorage.getItem("userpass").split("!@#")[2] == "1"){
        return(
            <Report/>
        )
    }
  return (
    <div>
        You dont have the access
    </div>
  )
}
