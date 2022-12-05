import React from 'react';
import {Button, Col, Row} from "react-bootstrap";
import {GrAdd} from "react-icons/gr";
import {FiPlusCircle} from "react-icons/fi";

function NavbarHeader({name, handleShow, buttonName}) {
    return (
        <>
            <div className='d-flex justify-content-between w-100  p-3 bg-white' style={{borderRadius: 10}}>
                <div style={{fontSize: 25}}>
                    {name}
                </div>
                <div className='d-flex justify-content-center align-items-center' onClick={() => handleShow(null)}>
                    <button className='createButtons iconTextPosition justify-content-between d-flex align-items-center px-2'
                            style={{backgroundColor: '#48B1AB'}}>
                       <FiPlusCircle size={23} color={'#ffffff'}/>
                        <span style={{marginLeft: 5}} className={'d-flex'}>{buttonName}</span>
                    </button>
                </div>
            </div>
        </>
    );
}

export default NavbarHeader;