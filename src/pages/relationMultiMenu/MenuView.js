import React, {useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import main from './relationStyle.module.scss'
import {MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos} from "react-icons/md";
import {AiOutlineEnvironment} from "react-icons/ai";
import {BiCircle} from "react-icons/bi";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef} from "react";
import {checkCalendar, getMultiMenu} from "../multimenu/MultiMenuReducer";
import {district, mtt} from "./RelationMenu";
import {RiHome5Line} from "react-icons/ri";
import {Link} from "react-router-dom";
import {GoPrimitiveDot} from "react-icons/go";

function MenuView() {
    const dispatch = useDispatch();
    const [activeNav, setActiveNav] = useState(0);
    const calendar = useSelector(state => state.multiMenu.checkCalendar);
    const firstUpdate = useRef(false);
    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getMultiMenu());
            dispatch(checkCalendar({month: 12}));
        } else {

        }
    }, [])

    return (
        <Container className={`w-100 ${main.main}`} fluid>
            <Row className={'d-flex justify-content-between align-items-center w-100 p-2 mb-3'}
                 style={{backgroundColor: 'white', borderRadius: 10}}>
                <div className={"w-50 fs-5 fw-semibold"}>
                    Tumanlarga menyu biriktirilishi haqida ma’lumot
                </div>
                <div className={"w-50 d-flex justify-content-between align-items-center"}>
                    <div className={`d-flex ${main.lineFromNavs}`}>
                        <div className={`mx-2 ${main.myNavs}`} onClick={() => setActiveNav(0)}>
                            <span style={activeNav === 0 ? {color: '#48B1AB'} : {color: '#777B82'}}>Kun bo‘yicha</span>
                            <div style={activeNav === 0 ? {} : {display: 'none'}} className={main.myLineNavs}></div>
                        </div>
                        <div className={`mx-2 ${main.myNavs}`} onClick={() => setActiveNav(1)}>
                            <span
                                style={activeNav === 1 ? {color: '#48B1AB'} : {color: '#777B82'}}> Bog‘cha kesimida</span>
                            <div style={activeNav === 1 ? {} : {display: 'none'}} className={main.myLineNavs}></div>
                        </div>
                    </div>
                    <div>
                        <button className={'createButtons'}><Link to={"/sidebar/relation-menu"}
                                                                  style={{textDecoration: 'none', color: 'white'}}>Menyu
                            biriktirish</Link></button>
                    </div>
                </div>
            </Row>
            {activeNav === 0 ? <Row>
                <Col xs={12} sm={12} md={12} lg={7} xl={7} className={'mt-3'}>
                    <div className={`p-3 d-flex justify-content-center shadow ${main.card}`}
                         style={{backgroundColor: '#FFFFFFCC', borderRadius: 16}}>
                        <div className={'w-100'}>
                            <div className={'w-100 d-flex justify-content-between align-items-center mb-1'}>
                                <div><MdOutlineArrowBackIosNew size={30}/></div>
                                <div className={'fs-3'}>Iyun 2022</div>
                                <div><MdOutlineArrowForwardIos size={30}/></div>
                            </div>
                            <div className={main.tableCalendar}>
                                <table>
                                    <thead>
                                    <tr>
                                        <th>Du</th>
                                        <th>Se</th>
                                        <th>Ch</th>
                                        <th>Pa</th>
                                        <th>Ju</th>
                                        <th>Sh</th>
                                        <th>Ya</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        calendar.dayList?.map((week, index) =>
                                            <tr key={index}>
                                                {week.map((day, index2) =>
                                                    <td key={index2}>
                                                        {day.day !== 0 ?<div style={{marginLeft:20}}>
                                                           <div
                                                                className={'d-flex justify-content-start align-items-center mt-3'}>
                                                                <GoPrimitiveDot color={'#8CC152'}/>
                                                                <span style={{fontSize: 10}}
                                                                      className={'text-start fw-bolder'}>214 ta</span>
                                                            </div>
                                                            <div
                                                                className={'d-flex justify-content-start align-items-center'}>
                                                                <GoPrimitiveDot color={'#E9573F'}/>
                                                                <span style={{fontSize: 10}}
                                                                      className={'text-start fw-bolder'}>125 ta</span>
                                                            </div>
                                                        </div>: null}
                                                        {day.day !== 0 ?
                                                            <div
                                                                style={index2 === 5 || index2 === 6 ? {color: 'red'} : null}
                                                                className={main.inTd}>
                                                                {day.day !== 0 ? day.day : null}</div> : null}
                                                    </td>
                                                )}
                                            </tr>
                                        )
                                    }
                                    </tbody>

                                </table>
                                <div className={'w-100 text-center justify-content-around d-flex mt-3'}>
                                    <div><GoPrimitiveDot color={'#8CC152'} size={25}/>
                                        <span style={{fontSize: 15}}
                                              className={'text-start fw-semibold'}>Biriktirilgan MTT lar</span>
                                    </div>
                                    <div>
                                        <GoPrimitiveDot color={'#E9573F'} size={25}/>
                                        <span style={{fontSize: 15}}
                                              className={'text-start fw-semibold'}>Biriktirilmagan MTT lar</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xs={12} sm={12} md={12} lg={5} xl={5} className={'d-flex justify-content-between p-1 mt-3'}>
                    <div className={'w-50'}>
                        <div className={`${main.card}`} style={{backgroundColor: '#FFFFFF'}}>
                            {
                                district.map((item, index) =>
                                    <div key={index} className={`d-flex p-2 mt-1 ${main.district}`}
                                         style={{backgroundColor: 'white'}}>
                                        <div style={{color: '#48B1AB', paddingLeft: 10, borderColor: '#48B1AB'}}
                                             className={main.leftLine}><AiOutlineEnvironment
                                            size={30}/>
                                        </div>
                                        <div className={'mx-2'}>{item.name}</div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className={'px-2 w-50'}>
                        <div className={`${main.card}`} style={{backgroundColor: '#FFFFFF'}}>
                            {
                                mtt.map((item, index) =>
                                    <div key={index} className={`d-flex p-2 mt-1 ${main.district}`}
                                         style={{backgroundColor: 'white'}}>
                                        <div style={{
                                            color: item.checked ? '#8CC152' : '#E9573F',
                                            paddingLeft: 10,
                                            borderColor: item.checked ? '#8CC152' : '#E9573F'
                                        }} className={main.leftLine}><RiHome5Line
                                            size={30}/>
                                        </div>
                                        <div className={'mx-2'}>{item.name}</div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </Col>
            </Row> : null}
            {activeNav === 1 ? <Row>
                <Col xs={12} sm={12} md={12} lg={7} xl={7} className={'mt-3'}>
                    <div className={`p-3 d-flex justify-content-center shadow ${main.card}`}
                         style={{backgroundColor: '#FFFFFFCC', borderRadius: 16}}>
                        <div className={'w-100'}>
                            <div className={'w-100 d-flex justify-content-between align-items-center mb-1'}>
                                <div><MdOutlineArrowBackIosNew size={30}/></div>
                                <div className={'fs-3'}>Iyun 2022</div>
                                <div><MdOutlineArrowForwardIos size={30}/></div>
                            </div>
                            <table className={main.table}>
                                <thead>
                                <tr>
                                    <th>Du</th>
                                    <th>Se</th>
                                    <th>Ch</th>
                                    <th>Pa</th>
                                    <th>Ju</th>
                                    <th>Sh</th>
                                    <th>Ya</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    calendar.dayList?.map((week, index) =>
                                        <tr key={index}>
                                            {week.map((day, index2) =>
                                                <td key={index2}
                                                    style={index2 === 5 || index2 === 6 ? {color: 'red'} : null}>{day.day !== 0 ? day.day : null}</td>
                                            )}
                                        </tr>
                                    )
                                }
                                </tbody>

                            </table>
                        </div>
                    </div>
                </Col>
                <Col xs={12} sm={12} md={12} lg={5} xl={5} className={'d-flex justify-content-between p-1 mt-3'}>
                    <div className={'w-50'}>
                        <div className={`${main.card}`} style={{backgroundColor: '#FFFFFF'}}>

                            {
                                district.map((item, index) =>
                                    <div key={index} className={`d-flex p-2 mt-1 ${main.district}`}
                                         style={{backgroundColor: 'white'}}>
                                        <div style={{color: '#48B1AB', paddingLeft: 10, borderColor: '#48B1AB'}}
                                             className={main.leftLine}><AiOutlineEnvironment
                                            size={30}/>
                                        </div>
                                        <div className={'mx-2'}>{item.name}</div>
                                    </div>
                                )
                            }

                        </div>
                    </div>
                    <div className={'px-2 w-50'}>
                        <div className={`${main.card}`} style={{backgroundColor: '#FFFFFF'}}>
                            {
                                mtt.map((item, index) =>
                                    <div key={index} className={`d-flex p-2 mt-1 ${main.district}`}
                                         style={{backgroundColor: 'white'}}>
                                        <div style={{
                                            color: item.checked ? '#8CC152' : '#E9573F',
                                            paddingLeft: 10,
                                            borderColor: item.checked ? '#8CC152' : '#E9573F'
                                        }} className={main.leftLine}><BiCircle
                                            size={30}/>
                                        </div>
                                        <div className={'mx-2'}>{item.name}</div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </Col>
            </Row> : null}

        </Container>
    );
}

export default MenuView;