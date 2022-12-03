import React from 'react';
import {Button, Col, Row} from "react-bootstrap";
import {GrAdd} from "react-icons/gr";

function NavbarHeader({name,handleShow,buttonName}) {
    return (
        <>
            <Row className='justify-content-end text-center  p-3'>
                <Col xs={12} sm={12} md={7} lg={9} xl={9} style={{fontSize: 25}}>
                    {name}
                </Col>
                <Col md={3} lg={2} xl={2} className='d-flex justify-content-center align-items-center' onClick={handleShow}>
                    <button className='createButtons iconTextPosition d-flex align-items-center px-2' style={{backgroundColor:'#48B1AB'}}>
                        <div className={'my-icons'}><GrAdd size={23} color={'#ffffff'}/></div>
                        <span style={{marginLeft: 5}} className={'d-flex'}>{buttonName}</span>
                    </button>
                </Col>
                <div className={'bottom-line  w-100'}></div>
            </Row>
            <br/>
        </>
    );
}

export default NavbarHeader;