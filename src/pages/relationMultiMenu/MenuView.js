import React, {useState} from 'react';
import {Container, Row} from "react-bootstrap";
import main from './relationStyle.module.scss'

function MenuView() {
    const [activeNav, setActiveNav] = useState(0);
    return (
        <Container className={`w-100 ${main.main}`} fluid>
            <Row className={'d-flex justify-content-between align-items-center w-100 p-2 mb-3'}
                 style={{backgroundColor: 'white', borderRadius: 10}}>
                <div className={"w-50 fs-5 fw-semibold"}>
                    Tumanlarga menyu biriktirilishi haqida ma’lumot
                </div>
                <div className={"w-50 d-flex justify-content-between align-items-center"}>
                    <div className={`d-flex ${main.lineFromNavs}`}>
                        <div className={`mx-2 ${main.myNavs}`} onClick={()=>setActiveNav(0)}>
                            <span style={activeNav === 0 ? {color: '#48B1AB'} : {color: '#777B82'}}>Kun bo‘yicha</span>
                            <div style={activeNav === 0 ? {} : {display: 'none'}} className={main.myLineNavs}></div>
                        </div>
                        <div className={`mx-2 ${main.myNavs}`} onClick={()=>setActiveNav(1)}>
                            <span
                                style={activeNav === 1 ? {color: '#48B1AB'} : {color: '#777B82'}}> Bog‘cha kesimida</span>
                            <div style={activeNav === 1 ? {} : {display: 'none'}} className={main.myLineNavs}></div>
                        </div>
                    </div>
                    <div>
                        <button className={'createButtons'}>Menyu biriktirish</button>
                    </div>
                </div>
            </Row>
            <Row className={'d-flex justify-content-between align-items-center w-100 p-2'}
                 style={{backgroundColor: 'white', borderRadius: 10}}>

            </Row>
        </Container>
    );
}

export default MenuView;