import React, {useEffect, useState} from 'react';
import {FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleRight, FaBars,} from "react-icons/fa";
import './App.css'
import {NavLink} from 'react-router-dom';
import {ImExit} from 'react-icons/im';
import {rolesList} from "./RoleRoutes";
import logo from '../login/image/img.png'
import {useMediaQuery} from "react-responsive";

const Sidebar = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [menuItem, setMenuItem] = useState([]);
    const [num, setNum] = useState(0);
    const toggle = () => setIsOpen(!isOpen);
    useEffect(() => {
        setMenuItem(rolesList(localStorage.getItem("role")));
    }, []);
    const isBigScreen = useMediaQuery({query: '(max-width: 576px)'});
    return (
        <div className={'d-flex'} style={{height: "90%"}}>
            {!isBigScreen ? <div style={{width: isOpen ? "200px" : "80px"}} className="sidebar shadow">
                <div className={`w-100 inSidebars`}>
                    <div className="link d-flex w-100 justify-content-end">
                        <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                            {isOpen ? <FaAngleDoubleLeft onClick={toggle} className={'rightLeft'}/> :
                                <FaAngleDoubleRight onClick={toggle} className={'rightLeft'}/>}
                        </div>
                    </div>
                    {menuItem?.map((item, index) => {
                        return (
                            <NavLink to={item.path} key={index} className="link">
                                <div className="icon">{item.icon}</div>
                                <div style={{display: isOpen ? "block" : "none"}}
                                     className="link_text">{item.name}</div>
                            </NavLink>
                        );
                    })
                    }
                    <NavLink to={"/"} className="link mb-2" id={"link2"}>
                        <div className="icon"><ImExit size={25}/></div>
                        <div style={{display: isOpen ? "block" : "none"}} className="link_text">Chiqish</div>
                    </NavLink>
                </div>
            </div> : <nav className={"mobile-navbar"}>
                <ul>
                    {menuItem?.map((item, index) => {
                        return (
                            <NavLink to={item.path} key={index} className="mini-link" style={{display:'inline-block',textAlign:'center'}}>
                                <div className="icon">{item.icon}</div>

                                <div style={{fontSize:10,display:'flex'}}>{item.name}</div>
                            </NavLink>
                        );
                    })
                    }
                </ul>
            </nav>}
            <div className={"main"}>
                <div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;