import React, {useState} from 'react';
import {Button, Col, Container, Modal, Row} from "react-bootstrap";
import main from './relationStyle.module.scss'
import {MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos} from "react-icons/md";
import {AiOutlineEnvironment} from "react-icons/ai";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef} from "react";
import {checkCalendar, checkCalendarByMtts, getMultiMenu} from "../multimenu/MultiMenuReducer";
import {Link, useNavigate} from "react-router-dom";
import {GoCheck, GoPrimitiveDot} from "react-icons/go";
import TabsCustom from "../more/TabsCustom";
import {BsCheckAll} from "react-icons/bs";
import {getDepartment, getDepartmentFromRelation} from "../departments/RegionDepartmentReducer";
import {getByDepartmentMtt, getMttFromRelations} from "../mtt/MttReducer";
import OneDayWithMtt from "../report/OneDayWithMtt";

function MenuView() {
    const dispatch = useDispatch();
    const [activeNav, setActiveNav] = useState(0);
    const [days, setDays] = useState(0);
    const [departmentId, setDepartmentId] = useState();
    const [kindergarten, setKindergarten] = useState();
    const [show, setShow] = useState(false);
    const [currentDay, setCurrentDay] = useState();
    const handleClose = () => setShow(false);
    const handleShow = (data) => {
        console.log(data,"data");
        setCurrentDay(data);
        setShow(true);
    };
    const departmentsRel = useSelector(state => state.department.departmentsRel);
    const mttsRelations = useSelector(state => state.mtt.mttsRelations);
    const mtts = useSelector(state => state.mtt.mtts);
    const calendar = useSelector(state => state.multiMenu.checkCalendar);
    const calendar2 = useSelector(state => state.multiMenu.checkCalendar2);
    const departments = useSelector(state => state.department.departments);
    const firstUpdate = useRef(false);
    const history = useNavigate();
    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getMultiMenu());
            dispatch(checkCalendar());
            dispatch(getDepartment());
        } else {

        }
    }, [])

    const changeDate = (num, year, month, numFunc) => {
        if (month === 12 && num > 0) {
            year = year + 1;
            month = 1;
        } else if (month === 1 && num < 0) {
            year = year - 1;
            month = 12;
        } else {
            month = month + num;
        }
        if (numFunc === 0) {
            getDateServer(year, month);
        } else {
            dispatch(checkCalendarByMtts(kindergarten?.id, {month, year}))
        }
    }

    const getDateServer = (year, month) => {
        dispatch(checkCalendar({month, year}));
    }

    const getDates = (day) => {
        dispatch(getDepartmentFromRelation({date: parseInt(day?.date)}));
        setCurrentDay(day);
    }

    const getKindergartenDays = (data) => {
        setKindergarten(data);
        dispatch(checkCalendarByMtts(data.id, {}));
    }
    const getMttsByDepartment = (data) => {
        dispatch(getMttFromRelations(data.departmentId, {date: currentDay?.date}));
        setDepartmentId(data);

    }
    const getMttsByDepartment2 = (data) => {
        setDepartmentId(data);
        dispatch(getByDepartmentMtt(data.id))
    }
    const setDay2 = (data) => {
        setDays(data);
    }


    return (
        <Container className={`w-100 ${main.main}`} fluid>
            <Row className={'d-flex justify-content-between align-items-center w-100 p-2 mb-3'}
                 style={{backgroundColor: 'white', borderRadius: 10}}>
                <div className={"w-50 fs-5 fw-semibold"}>
                    Tumanlarga menyu biriktirilishi haqida ma’lumot
                </div>
                <div className={"w-50 d-flex justify-content-between align-items-center"}>
                    <TabsCustom listTabs={[{name: "Kun bo‘yicha"}, {name: "Bog‘cha kesimida"}]}
                                currentTabs={setActiveNav}/>
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
                                <div className={'my-Hover'}
                                     onClick={() => changeDate(-1, calendar?.year, calendar?.month, 0)}>
                                    <MdOutlineArrowBackIosNew size={30}/></div>
                                <div className={'fs-3'}>{calendar?.name} - {calendar?.year}</div>
                                <div className={'my-Hover'}
                                     onClick={() => changeDate(1, calendar?.year, calendar?.month, 0)}>
                                    <MdOutlineArrowForwardIos size={30}/></div>
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
                                                    <td key={index2}
                                                        style={day?.state ? {
                                                            backgroundColor: day?.date === currentDay?.date ? '#48B1AB' : '',
                                                            position: 'relative',
                                                            color: day?.date === currentDay?.date ? 'white' : ''
                                                        } : {
                                                            backgroundColor: 'rgba(209,211,210,0.55)',
                                                            color: '#4f4e4e',
                                                            position: "relative"
                                                        }}
                                                        onClick={() => getDates(day)}>
                                                        {/*<div className={day.attached ? `${main.borderTd}` : ''}*/}
                                                        {/*     style={index2 === 5 || index2 === 6 ? {color: 'red'} : {}}>{day.day !== 0 ? day.day : null}</div>*/}
                                                        {day.day !== 0 ? <div style={{marginLeft: 20}}>
                                                            <div
                                                                className={'d-flex justify-content-start align-items-center mt-3'}>
                                                                <GoPrimitiveDot color={'#8CC152'}/>
                                                                <span style={{fontSize: 10}}
                                                                      className={'text-start'}>{day.attachedNumber} ta</span>
                                                            </div>
                                                            <div
                                                                className={'d-flex justify-content-start align-items-center'}>
                                                                <GoPrimitiveDot color={'#E9573F'}/>
                                                                <span style={{fontSize: 10}}
                                                                      className={'text-start'}>{day.notAttachedNumber} ta</span>
                                                            </div>
                                                        </div> : null}
                                                        {day.day !== 0 ?
                                                            <div
                                                                style={index2 === 5 || index2 === 6 ? {color: 'red'} : {color: 'black'}}
                                                                className={main.inTd}>
                                                                {day.day !== 0 ? day.day : null}</div> : null}
                                                        <span style={day?.state && day.checked ? {
                                                            position: 'absolute',
                                                            right: 10,
                                                            top: 0
                                                        } : {display: 'none'}}><span
                                                            className={'mx-1'}>{day?.checkedCount}</span><BsCheckAll
                                                            size={20}
                                                            color={day?.date === currentDay?.date ? 'white' : '#48B1AB'}/></span>
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
                                departmentsRel?.map((item, index) =>
                                    <div key={index}
                                         className={`d-flex justify-content-between align-items-center  p-2 mt-1 my-Hover ${main.district}`}
                                         style={{backgroundColor: departmentId?.departmentId !== item?.departmentId ? 'white' : '#48B1AB'}}>
                                        <div className={`d-flex`}
                                             onClick={() => getMttsByDepartment(item)}>
                                            <div style={{
                                                color: departmentId?.departmentId !== item.departmentId ? '#48B1AB' : 'white',
                                                paddingLeft: 10,
                                                borderColor: departmentId?.departmentId !== item.departmentId ? '#48B1AB' : 'white'
                                            }}
                                                 className={main.leftLine}><AiOutlineEnvironment
                                                size={30}/>
                                            </div>
                                            <div className={'mx-2'}
                                                 style={{color: departmentId?.departmentId === item.departmentId ? 'white' : '#000'}}>{item?.departmentName?.substring(0, 10)}{item?.departmentName?.length > 10 ? "..." : ""}</div>
                                        </div>
                                        <div>
                                            <div style={{fontSize: 10}} className={'d-flex'}><GoPrimitiveDot
                                                color={'#8CC152'} size={10}/><span className={'mx-2'}
                                                                                   style={{color: departmentId?.departmentId === item.departmentId ? 'white' : '#000'}}>{item.attachedNumber} ta</span>
                                            </div>
                                            <div style={{fontSize: 10}} className={'d-flex'}><GoPrimitiveDot
                                                color={'#E9573F'} size={10}/><span className={'mx-2'}
                                                                                   style={{color: departmentId?.departmentId === item.departmentId ? 'white' : '#000'}}>{item.notAttachedNumber} ta</span>
                                            </div>
                                        </div>
                                        <div style={{fontSize: 15, fontWeight: 600}} className={'d-flex'}><span
                                            className={'mx-2'}
                                            style={{color: departmentId?.departmentId === item.departmentId ? 'white' : '#000'}}>{item?.checkedCount}</span>
                                            <BsCheckAll
                                                color={departmentId?.departmentId === item.departmentId ? 'white' : '#8CC152'}
                                                size={15} style={item?.checkedCount > -1 ? {} : {display: 'none'}}/>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className={'px-2 w-50'}>
                        <div className={`${main.card}`} style={{backgroundColor: '#FFFFFF'}}>
                            {
                                mttsRelations?.map((item, index) =>
                                    <div key={index} className={`d-flex p-2 mt-1 ${main.district}`}
                                         style={{backgroundColor: 'white', cursor: 'pointer', position: 'relative'}}>
                                        <div style={{
                                            color: item.checked ? '#8CC152' : '#E9573F',
                                            paddingLeft: 10,
                                            borderColor: item.attached ? '#8CC152' : '#E9573F'
                                        }}
                                             className={`d-flex justify-content-center align-items-center ${main.leftLine}`}>
                                            <div className={main.dotIcon}
                                                 style={{borderColor: item.attached ? '#8CC152' : '#E9573F'}}>
                                                {item.checked ?
                                                    <GoCheck color={item.attached ? '#8CC152' : '#E9573F'}/> : null}
                                            </div>
                                        </div>
                                        <div className={'mx-2'}>{item.number}{item.name}</div>
                                        <div style={{
                                            position: 'absolute',
                                            bottom: 1,
                                            right: 4,
                                            fontSize: 10,
                                            color: '#737373'
                                        }}>Menyu: {item.menuName !== null ? item.menuName?.substring(0, 15) : "Biriktirilmagan"}</div>
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
                                <div className={'my-Hover'}
                                     onClick={() => changeDate(-1, calendar2?.year, calendar2?.month, 1)}>
                                    <MdOutlineArrowBackIosNew size={30}/></div>
                                <div className={'fs-3'}>{calendar2?.name} - {calendar2?.year}</div>
                                <div className={'my-Hover'}
                                     onClick={() => changeDate(1, calendar2?.year, calendar2?.month, 1)}>
                                    <MdOutlineArrowForwardIos size={30}/></div>
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
                                    calendar2?.dayList?.map((week, index) =>
                                        <tr key={index}>
                                            {week.map((day, index2) =>
                                                <td key={index2}
                                                    onMouseEnter={() => setDays(day.day)}
                                                    onMouseLeave={() => setDays(null)}
                                                    onClick={() => handleShow(day)}
                                                    style={index2 === 5 || index2 === 6 ? {
                                                        color: 'red',
                                                        position: 'relative'
                                                    } : {position: 'relative'}}>{day.day !== 0 ? day.day : null}
                                                    {day?.attached ? <BsCheckAll color={'#48B1AB'}
                                                                                 style={{
                                                                                     position: "absolute",
                                                                                     right: 2,
                                                                                     bottom: 1
                                                                                 }}/> : null}
                                                    <div
                                                        className={days === day.day ? `shadow ${main.tooltipText}` : 'd-none'}>{day.menuName !== null ? day.menuName :
                                                        <span style={{
                                                            fontSize: 10,
                                                            color: 'red'
                                                        }}>Menyu biriktirilmagan</span>}</div>
                                                </td>
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
                                departments?.map((item, index) =>
                                    <div key={index}
                                         className={`d-flex justify-content-between align-items-center  p-2 mt-1 my-Hover ${main.district}`}
                                         style={{backgroundColor: departmentId?.id !== item?.id ? 'white' : '#48B1AB'}}>
                                        <div className={`d-flex`}
                                             onClick={() => getMttsByDepartment2(item)}>
                                            <div style={{
                                                color: departmentId?.id !== item.id ? '#48B1AB' : 'white',
                                                paddingLeft: 10,
                                                borderColor: departmentId?.id !== item.id ? '#48B1AB' : 'white'
                                            }}
                                                 className={main.leftLine}>
                                                <AiOutlineEnvironment
                                                    size={30}/>
                                            </div>
                                            <div className={'mx-2'}
                                                 style={{color: departmentId?.id === item.id ? 'white' : '#000'}}>{item?.name?.substring(0, 15)}{item?.name?.length > 10 ? "..." : ""}</div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className={'px-2 w-50'}>
                        <div className={`${main.card}`} style={{backgroundColor: '#FFFFFF'}}>
                            {
                                mtts?.map((item, index) =>
                                    <div key={index} className={`d-flex p-2 mt-1 ${main.district}`}
                                         style={item.id === kindergarten?.id ? {
                                             backgroundColor: '#48B1AB',
                                             cursor: 'pointer',
                                             position: 'relative',
                                             color: 'white'
                                         } : {backgroundColor: 'white', cursor: 'pointer', position: 'relative'}}
                                         onClick={() => getKindergartenDays(item)}>
                                        <div style={{
                                            color: item.id !== kindergarten?.id ? '#48B1AB' : 'white',
                                            paddingLeft: 10,
                                            borderColor: item.id !== kindergarten?.id ? '#48B1AB' : 'white'
                                        }}
                                             className={`d-flex justify-content-center align-items-center ${main.leftLine}`}>
                                            <div className={main.dotIcon}
                                                 style={{borderColor: item.id !== kindergarten?.id ? '#48B1AB' : 'white'}}>
                                            </div>
                                        </div>
                                        <div className={'mx-2'}>{item.number}{item.name}</div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </Col>
            </Row> : null}
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    <OneDayWithMtt id={currentDay?.reportId}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Ortga
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default MenuView;