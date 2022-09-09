import React, { useEffect, useState } from 'react';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleRight, FaBars, } from "react-icons/fa";
import './App.css'
import { NavLink } from 'react-router-dom';
import { ImExit } from 'react-icons/im';
import { rolesList } from "./RoleRoutes";
import logo from '../login/image/img.png'


const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [menuItem, setMenuItem] = useState([])
    const [num, setNum] = useState(0)
    const toggle = () => setIsOpen(!isOpen);
    useEffect(() => {
        setMenuItem(rolesList(localStorage.getItem("role")));
    }, []);

    useEffect(() => {
        if (menuItem.length * 3 <= 36) {
            setNum(33 - (menuItem.length * 3))
        }
    }, [menuItem])


    return (
        <div className={'d-flex'}>
            <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
                <div className="top_section">
                    <div style={{ display: isOpen ? "block" : "none" }} ><img src={logo} alt="" width={30} height={30} /></div>
                    <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
                        {isOpen ? <FaAngleDoubleLeft onClick={toggle} className={'rightLeft'} /> : <FaAngleDoubleRight onClick={toggle} className={'rightLeft'} />}
                    </div>
                    <br />
                </div>
                {
                    menuItem.map(() => {

                    })
                }
                {
                    menuItem.map((item, index) => {

                        return (
                            <NavLink to={item.path} key={index} className="link">
                                <div className="icon">{item.icon}</div>
                                <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
                            </NavLink>
                        )
                    }
                    )
                }
                {/* style={{ marginTop: '28rem' }} */}
                <NavLink to={"/"} className="link" id={"link2"}>
                    <div className="icon"><ImExit /></div>
                    <div style={{ display: isOpen ? "block" : "none" }} className="link_text">Chiqish</div>
                </NavLink>
            </div>
            <main>{children}</main>
        </div>
    );
};

export default Sidebar;