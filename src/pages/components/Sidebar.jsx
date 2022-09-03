import React, { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaShoppingBag,
    FaThList
}from "react-icons/fa";
import './App.css'
import { NavLink } from 'react-router-dom';


const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/sidebar/",
            name:"Dashboard",
            icon:<FaTh/>
        },
        {
            path:"/sidebar/about",
            name:"About",
            icon:<FaUserAlt/>
        },
        {
            path:"/sidebar/analytics",
            name:"Analytics",
            icon:<FaRegChartBar/>
        },
        {
            path:"/sidebar/comment",
            name:"Comment",
            icon:<FaCommentAlt/>
        },
        {
            path:"/sidebar/product",
            name:"Product",
            icon:<FaShoppingBag/>
        },
        {
            path:"/sidebar/productList",
            name:"Product List",
            icon:<FaThList/>
        }
    ]
    return (
        <div className={'d-flex'}>
           <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Logo</h1>
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main>{children}</main>
        </div>
    );
};

export default Sidebar;