import React from 'react'
import Customerspage from './customerspage'

export default function Userportal() {
    var a = localStorage.getItem("userpass")
    var b = a.split("!@#")[2]
    if (b == "1"){
        window.location = "../adminpanel"
    }
    return(
        <Customerspage></Customerspage>
    ) 
}
