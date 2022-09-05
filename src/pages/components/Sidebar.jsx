import React, {useEffect, useState} from 'react';
import {FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleRight, FaBars,} from "react-icons/fa";
import './App.css'
import { NavLink } from 'react-router-dom';
import {rolesList} from "./RoleRoutes";
import logo from '../login/image/img.png'


const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const [menuItem,setMenuItem] = useState([])
    const toggle = () => setIsOpen (!isOpen);
    useEffect(()=>{
        setMenuItem(rolesList(localStorage.getItem("role")));
    },[]);

    return (
        <div className={'d-flex'}>
           <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <div style={{display: isOpen ? "block" : "none"}} ><img src={logo} alt="" width={30} height={30}/></div>
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       {isOpen ? <FaAngleDoubleLeft onClick={toggle}  className={'rightLeft'}/> : <FaAngleDoubleRight onClick={toggle} className={'rightLeft'}/>  }
                   </div>
                   <br/>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link">
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