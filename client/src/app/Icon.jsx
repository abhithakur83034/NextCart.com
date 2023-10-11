"use client"
import "./style/icon.css";
import React, { useState, useEffect } from "react";
import Link from "next/link"
import axios from "axios"
export default function Icon(){
    // showing length of cart
const [count, setCount] = useState([])

const user = JSON.parse(localStorage.getItem("user"))

useEffect(() => {
  axios
    .get("http://localhost:4500/cart/showcartproduct")
    .then((res) => {
      console.log(res.data)
      // const data = res.data
      const filteruser = res.data.filter((item)=>item.userId == user._id) 
      console.log(filteruser)
      setCount(filteruser)
     })
    .catch((error) => {
      console.log(error);
    });
}, []);
console.log(count)
    return(
        <>
         {/* //cart icon ============================================*/}
     <div className="icon-bar">
     <Link href="/components/addtocart" className="cart">
       <i className="bi bi-cart"></i>
       <span className="cart-count">{count.length}</span>
     </Link>
   </div>
   {/* cart icon end===================================================== */}
   </>
    )
}