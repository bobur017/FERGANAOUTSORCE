import React from 'react';
import {Button, Col, Row} from "react-bootstrap";
import {GrAdd} from "react-icons/gr";

function NavbarHeader({name,handleShow,buttonName}) {
    return (
        <>
            <Row className='bottom-line justify-content-end text-center'>
                <Col xs={12} sm={12} md={7} lg={9} xl={9} style={{fontSize: 25}}>
                    {name}
                </Col>
                <Col md={3} lg={2} xl={2} className='d-flex justify-content-center align-items-center' onClick={handleShow}>
                    <Button variant='info' size={'sm'} className='iconTextPosition d-flex align-items-center'>
                        <div className={'my-icons'}><GrAdd size={23} color={'#ffffff'}/></div>
                        <span style={{marginLeft: 5}} className={'d-flex'}>{buttonName}</span>
                    </Button>
                </Col>
            </Row>
            <br/>
        </>
    );
}

export default NavbarHeader;