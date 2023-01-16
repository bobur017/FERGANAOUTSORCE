import React from 'react';
import {Button, Col, Container, Form, Modal, Row, Table} from "react-bootstrap";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {checkCalendar, getMultiMenu, relationMultiMenu} from "../multimenu/MultiMenuReducer";
import main from './relationStyle.module.scss'
import SearchSelect from "../more/SearchSelect";
import ReactApexChart from 'react-apexcharts'
import {AiOutlineCheck, AiOutlineClose} from "react-icons/ai";
import {MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos} from "react-icons/md";
import {AiOutlineEnvironment} from "react-icons/ai";
import {colorTextStr} from "../funcs/Funcs";
import {getDepartmentFromRelation, getDepartmentFromRelationAdd} from "../departments/RegionDepartmentReducer";
import {getMttFromRelations} from "../mtt/MttReducer";
import {GoCheck, GoPrimitiveDot} from "react-icons/go";
import {toast} from "react-toastify";
import {BsCheckAll} from "react-icons/bs";
import LoadingPage from "../loading/LoadingPage";
import {useNavigate} from "react-router-dom";

export const mtt = [
    {
        id: 5,
        name: '24-dmtt',
        checked: false,

    },
    {
        id: 1,
        name: '24-dmtt',
        checked: true,

    },
    {
        id: 2,
        name: '24-dmtt',
        checked: true,

    },
    {
        id: 3,
        name: '24-dmtt',
        checked: false,

    },
    {
        id: 6,
        name: '24-dmtt',
        checked: true,

    },
    {
        id: 7,
        name: '24-dmtt',
        checked: true,

    },
];
export const district = [
    {
        id: 1,
        name: 'Fargona tumani'
    },
    {
        id: 3,
        name: 'Fargona tumani'
    },
    {
        id: 2,
        name: 'Fargona tumani'
    },
    {
        id: 4,
        name: 'Fargona tumani'
    },
    {
        id: 5,
        name: 'Fargona tumani'
    },
];

function RelationMenu() {
    const pie = {
        series: [14, 85],
        options: {
            colors: ['#BABDC6', '#48B1AB'],
            labels: ['Bajarilmadi %', 'Bajarildi %'],
            chart: {
                type: 'donut',
            },
            legend: {
                show: false
            },
            dataLabels: {
                enabled: false
            },
            plotOptions: {
                pie: {
                    donut: {
                        labels: {
                            show: true,
                            total: {
                                showAlways: true,
                                show: true,
                                label: "Sanpin"
                            },
                        }
                    }
                }
            },

        },
    }
    const defaultForRelation = {
        "dateList": [
            ""
        ],
        "kinList": [
            {
                "id": '',
                "name": "",
                "number": ''
            }
        ],
        "menuId": ""
    }
    const [multiMenuState, setStateMultiMenu] = useState();
    const [calendarState, setCalendarState] = useState([]);
    const [apex, setApex] = useState();
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);
    const [departmentId, setDepartmentId] = useState();
    const [mtts, setMtts] = useState([]);
    const [newMtts, setNewMtts] = useState([]);
    const [department, setDepartment] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [currentDate, setCurrentDate] = useState();
    const [currentDay, setCurrentDay] = useState({
        date: '',
        index: '',
        index2: '',
        attached: '',
        checked: '',
        kinList: []
    });
    const [load, setLoad] = useState(false);
    const [apex2, setApex2] = useState();
    const [apex3, setApex3] = useState();
    const dispatch = useDispatch();
    const multiMenuList = useSelector(state => state.multiMenu.multiMenuList);
    const calendar = useSelector(state => state.multiMenu.checkCalendar);
    const departmentsRel = useSelector(state => state.department.departmentsRelAdd);
    const mttsRelations = useSelector(state => state.mtt.mttsRelations);
    const relationsResult = useSelector(state => state.multiMenu.relationsResult);
    const firstUpdate = useRef(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const history = useNavigate();

    useEffect(() => {
        if (!firstUpdate.current) {

        } else {
            setDepartment(departmentsRel);
            let list = [...departments];
            setDepartments(list.concat(departmentsRel));
            setLoad(false);
        }
    }, [departmentsRel]);

    useEffect(() => {
        if (!firstUpdate.current) {

        } else {
            history("/sidebar/relation-view");
        }
    }, [relationsResult]);

    useEffect(() => {
        if (!firstUpdate.current) {

        } else {
            setMtts(mttsRelations);
            let list = [...newMtts];
            let list2 = [...mttsRelations];
            setNewMtts(list.concat(list2));
            setLoad(false);
        }
    }, [mttsRelations]);

    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getMultiMenu());
            dispatch(checkCalendar());
        } else {
            let list = [...calendarState];
            if (!list.some(cale => cale.month === calendar.month && cale.year === calendar.year)) {
                list.push({...calendar, index: list.length});
                setCurrentDate({...calendar, index: list.length - 1});
                setCalendarState(list);
            } else if (list.length === 0) {
                setCalendarState(list);
            }
            setLoad(false);
        }
    }, [calendar]);

    const getMultiMenuDrop = (data) => {
        setStateMultiMenu(data);
        setApex(<ReactApexChart options={{
            ...pie.options,
            colors: ['#BABDC6', colorTextStr(data.sanPinPercentage)],
            plotOptions: {
                pie: {
                    donut: {
                        labels: {
                            show: true,
                            total: {
                                showAlways: true,
                                show: true,
                                fontSize: '10px',
                                label: "Sanpin \n o'rtacha",
                                formatter: function (w) {
                                    return data.sanPinPercentage;
                                }
                            },
                        }
                    }
                }
            }
        }}
                                series={[data.sanPinPercentage > 100 ? 0 : 100 - data.sanPinPercentage, data.sanPinPercentage]}
                                type="donut" width={120}
                                height={150}/>);
        setApex2(
            <ReactApexChart options={{
                ...pie.options,
                colors: ['#BABDC6', colorTextStr(data.sanPinPercentageMax)],
                plotOptions: {
                    pie: {
                        donut: {
                            labels: {
                                show: true,
                                total: {
                                    showAlways: true,
                                    show: true,
                                    fontSize: '12px',
                                    label: "Sanpin max",
                                    formatter: function (w) {
                                        return data.sanPinPercentageMax;
                                    }
                                },
                            }
                        }
                    }
                }
            }}
                            series={[data.sanPinPercentageMax > 100 ? 0 : 100 - data.sanPinPercentageMax, data.sanPinPercentageMax]}
                            type="donut" width={120}
                            height={150}/>
        )
        setApex3(
            <ReactApexChart options={{
                ...pie.options,
                colors: ['#BABDC6', colorTextStr(data.sanPinPercentageMin)],
                plotOptions: {
                    pie: {
                        donut: {
                            labels: {
                                show: true,
                                total: {
                                    showAlways: true,
                                    show: true,
                                    fontSize: '10px',
                                    label: "Sanpin min",
                                    formatter: function (w) {
                                        return data.sanPinPercentageMin;
                                    }
                                },
                            }
                        }
                    }
                }
            }}
                            series={[data.sanPinPercentageMin > 100 ? 0 : 100 - data.sanPinPercentageMin, data.sanPinPercentageMin]}
                            type="donut" width={120}
                            height={150}/>
        )
    }

    const getDates = (checked, index, index2, day) => {
        if (day?.state) {
            setChecked1(false);
            setChecked2(false);
            setChecked3(false);
            if (currentDay.date !== day?.date) {
                if (departments.some(item => item.date === day.date)) {
                    setDepartment(departments.filter(item => item.date === day.date));
                } else {
                    dispatch(getDepartmentFromRelationAdd({date: parseInt(day?.date)}));
                    setLoad(true);
                }
                setMtts([]);
            }
            setCurrentDay({
                ...currentDay,
                index,
                index2,
                state: day.state,
                attached: day?.attached,
                date: day?.date,
                kinList: day?.kinList ? day?.kinList : [],
                notAttachedNumber: day?.notAttachedNumber,
                attachedNumber: day?.attachedNumber,
            });
        } else {
            toast.error("Bu kunga bog'cha biriktirib bo'lmaydi!");
        }
    }

    const getDates2 = (checked, data, index) => {
        if (data?.stayTimeNumber === multiMenuState?.stayTimeNumber){

        setChecked1(false);
        setChecked2(false);
        setChecked3(false);
        let mttList = [...mtts];
        mttList[index] = {...mttList[index], checked};
        let mttList2 = [...newMtts];
        let depAttachNumb = 0;
        mtts.forEach((item, index) => {
                if (item?.checked) {
                    depAttachNumb++;
                }
            }
        );
        newMtts.forEach((mtt, index) => {
            if (mtt.id === data.id && currentDay.date === mtt.date) {
                mttList2[index] = {...mttList2[index], checked};
            }
        });
        setNewMtts(mttList2);
        setMtts(mttList);
        let kinderList = [...currentDay?.kinList];
        let departmentsList = [...departments];
        let departmentList = [...department];
        if (checked) {
            departments.forEach((department, index) => {
                if (department.departmentId === departmentId?.departmentId && currentDay.date === department.date) {
                    departmentsList[index] = {
                        ...departmentsList[index],
                        checkedCount: departmentsList[index]?.checkedCount + 1
                    };
                }
            });
            department.forEach((department, index) => {
                if (department.departmentId === departmentId?.departmentId && currentDay.date === department.date) {
                    departmentList[index] = {
                        ...departmentList[index],
                        checkedCount: depAttachNumb + 1
                    };
                }
            });
            kinderList.push(mttList[index]);
            setDepartmentId({...departmentId, checkedCount: depAttachNumb + 1})
        } else {
            department.forEach((department, index) => {
                if (department.departmentId === departmentId?.departmentId && department.date === currentDay.date) {
                    departmentList[index] = {
                        ...departmentList[index],
                        checkedCount: depAttachNumb - 1
                    };
                }
            });
            departments.forEach((department, index) => {
                if (department.departmentId === departmentId?.departmentId && department.date === currentDay.date) {
                    departmentsList[index] = {
                        ...departmentsList[index],
                        checkedCount: depAttachNumb - 1
                    };
                }
            });
            setDepartmentId({...departmentId, checkedCount: depAttachNumb - 1})
            kinderList = [...kinderList].filter(item => item.id !== data.id);
        }
        setDepartments(departmentsList);
        setDepartment(departmentList);
        let list = [...currentDate?.dayList];
        let list2 = [...list[currentDay?.index]];
        if (!checked) {
            if (!kinderList.some(kinde => kinde.checked)) {
                list2[currentDay?.index2] = {
                    ...list2[currentDay?.index2], checked, kinList: kinderList, checkedCount: kinderList.length
                };
            } else {
                list2[currentDay?.index2] = {
                    ...list2[currentDay?.index2], kinList: kinderList, checkedCount: kinderList.length
                };
            }
        } else {
            list2[currentDay?.index2] = {
                ...list2[currentDay?.index2], checked, kinList: kinderList, checkedCount: kinderList.length
            };
        }
        list[currentDay?.index] = [...list2];
        setCurrentDate({...currentDate, dayList: list});
        let calendarList = [...calendarState];
        calendarList[currentDate?.index] = {
            ...calendarList[currentDate?.index],
            dayList: list,
        };
        setCurrentDay({
            ...currentDay,
            kinList: kinderList, checkedCount: kinderList.length
        });
        setCalendarState(calendarList);
        }else {
            toast.error("Taomnomani ovqatlanish vaqti MTT ga mos emas");
        }
    }

    const changeDate = (num, year, month) => {
        if (month === 12 && num > 0) {
            year = year + 1;
            month = 1;
        } else if (month === 1 && num < 0) {
            year = year - 1;
            month = 12;
        } else {
            month = month + num;
        }
        getDateServer(year, month);
    }

    const getDateServer = (year, month) => {
        if (!calendarState.some(cale => cale.month === month && cale.year === year)) {
            setLoad(true);
            dispatch(checkCalendar({month, year}));
        } else {
            setCurrentDate(calendarState.filter(date => date.year === year && date.month === month)[0]);
        }
        setChecked1(false);
        setChecked2(false);
        setChecked3(false);
    }
    const allChe = (checked, num) => {
        if (departmentId) {
            if (num === 1) {
                setChecked1(checked);
            } else if (num === 2) {
                setChecked2(checked);
            } else {
                setChecked3(checked);
            }

            let allListKin = [...newMtts];
            let listMtts = [...mtts];
            newMtts.forEach((item, index) => {
                    if (num === 1) {
                        if (item.date === currentDay.date && departmentId?.departmentId === item.departmentId) {
                            allListKin[index] = {...item, checked}
                        }
                    } else {
                        if (item.date === currentDay.date && departmentId?.departmentId === item.departmentId && item.attached && num === 2) {
                            allListKin[index] = {...item, checked}
                        } else if (item.date === currentDay.date && departmentId?.departmentId === item.departmentId && !item.attached && num === 3) {
                            allListKin[index] = {...item, checked}
                        }
                    }
                }
            );
            // eslint-disable-next-line no-unused-vars
            let depAttachNumb = 0;
            mtts.forEach((item, index) => {
                    if (num === 1) {
                        if (item.date === currentDay.date && departmentId?.departmentId === item.departmentId) {
                            listMtts[index] = {...item, checked};
                        }
                    } else {
                        if (item.date === currentDay.date && departmentId?.departmentId === item.departmentId && item.attached && num === 2) {
                            listMtts[index] = {...item, checked};
                        } else if (item.date === currentDay.date && departmentId?.departmentId === item.departmentId && !item.attached && num === 3) {
                            listMtts[index] = {...item, checked};
                        }
                    }
                }
            );
            let depAttachedNum = 0;
            let fromKinlist = []
            listMtts.forEach((item) => {
                if (item.checked) {
                    fromKinlist.push(item);
                    depAttachedNum++;
                }
            })
            let newAttachedNumber = 0;
            let listDepartments = [...departments];
            let listDepartment = [...department];
            departments.forEach((item, index) => {
                    if (item.departmentId === departmentId?.departmentId && departmentId?.date === item.date) {
                        listDepartments[index] = {
                            ...listDepartments[index], checkedCount: depAttachedNum
                        }
                    }
                }
            );
            department.forEach((item, index) => {
                    if (item.departmentId === departmentId?.departmentId && departmentId?.date === item.date) {
                        listDepartment[index] = {
                            ...listDepartment[index], checkedCount: depAttachedNum
                        }
                    }
                }
            );
            let listCurrentDayKinder = [...currentDay.kinList].filter(kin => kin.departmentId !== departmentId?.departmentId);
            let kinList = listCurrentDayKinder.concat(fromKinlist);
            if (checked) {
                newAttachedNumber = kinList.length;
            } else {
                newAttachedNumber = kinList.length;
            }
            let listCurrentDate = [...calendarState[currentDate?.index]?.dayList];
            let day = [...listCurrentDate[currentDay.index]];
            if (checked) {
                day[currentDay.index2] = {
                    ...day[currentDay.index2], kinList, checkedCount: newAttachedNumber, checked
                }
            } else {
                day[currentDay.index2] = {
                    ...day[currentDay.index2],
                    kinList,
                    checkedCount: newAttachedNumber,
                    checked: kinList.some(kin => kin.checked)
                }
            }

            listCurrentDate[currentDay?.index] = [...day];
            let calen = [...calendarState];
            calen[currentDate?.index] = {...calen[currentDate?.index], dayList: listCurrentDate};
            setCalendarState(calen);
            setCurrentDate({...currentDate, dayList: listCurrentDate});
            setCurrentDay({...currentDay, kinList, checkedCount: newAttachedNumber});
            setMtts(listMtts);
            setNewMtts(allListKin);
            setDepartmentId({...departmentId, checkedCount: depAttachedNum})
            setDepartments(listDepartments);
            setDepartment(listDepartment);
        }
    }
    const getKindergarten = (data) => {

        setDepartmentId(data);
        let list = newMtts.filter(mtt => mtt.departmentId === data.departmentId && currentDay?.date === mtt.date);
        if (list.length > 0) {
            setMtts(list);
        } else {
            dispatch(getMttFromRelations(data.departmentId, {date: currentDay?.date}));
            setChecked1(false);
            setChecked2(false);
            setChecked3(false);
            setLoad(true);
        }
    }
    const submitKinlist = () => {
        let dayList = [];
        if (multiMenuState) {
            calendarState.forEach(item =>
                item.dayList.forEach(week =>
                    week.forEach(day => {
                            if (day.checked) {
                                dayList.push(day);
                            }
                        }
                    )
                )
            );
            dispatch(relationMultiMenu(dayList, multiMenuState?.id));
        } else {
            toast.error("Taomnoma tanlanmagan!")
        }
    }
    return (
        <Container fluid className={main.main}>
            <Row>
                <Col xs={12} sm={12} md={12} lg={7} xl={7}>
                    <SearchSelect setData={getMultiMenuDrop} list={multiMenuList} itemName={"name"}/>
                </Col>
                <Col xs={12} sm={12} md={12} lg={5} xl={5} className={'d-flex justify-content-end'}>
                    <button className={main.buttonClose} onClick={()=>history("/sidebar/relation-view")}><AiOutlineClose size={25}/><span className={'mx-2'}>Bekor qilish</span>
                    </button>
                    <button className={main.buttonSuccess} onClick={() => handleShow()}><AiOutlineCheck size={25}/><span
                        className={'mx-2'}>Tayyor</span></button>
                </Col>
            </Row>
            <Row>
                <Col xs={12} sm={12} md={12} lg={7} xl={7} className={'mt-3'}>
                    <div className={main.card}>
                        <div className={'d-flex justify-content-between align-items-center'}>
                            <div className={` ${main.textMenu}`}>
                                {multiMenuState?<>
                                    <span style={{fontSize: 25}} className={'fw-semibold'}>{multiMenuState?.name}</span>
                                    <br/>
                                    <span style={{fontSize: 20}}>{multiMenuState?.daily} kun uchun mo‘ljallangan</span>
                                    <br/>
                                    <span>{multiMenuState?.regionalDepartmentName} tomonidan tuzilgan.</span>
                                </>:<span style={{color:'red',fontSize:25}}>Taomnoma tanlanmagan!</span>}
                            </div>
                            <div className={'d-flex'}>
                                {apex}
                                {apex2}
                                {apex3}
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xs={12} sm={12} md={12} lg={5} xl={5} className={'mt-3 '}>
                    <div className={`w-100 ${main.card}`}>
                        <div className={'text-center w-100'}>Tanlash</div>
                        <div className={`p-1 d-flex my-Hover ${main.checkedBorder}`} style={{borderColor: 'black'}}
                             onClick={() => allChe(!checked1, 1)}>
                            <div style={{borderColor: '#000'}} className={main.checkeds}>
                                {checked1 ?
                                    <GoCheck color={'#000'}/> : null}
                            </div>
                            <div>Barchasini belgilash</div>
                        </div>
                        <div className={`p-1 d-flex my-Hover mt-1 ${main.checkedBorder}`}
                             style={{borderColor: '#8CC152'}} onClick={() => allChe(!checked2, 2)}>
                            <div style={{borderColor: '#8CC152'}} className={main.checkeds}>
                                {checked2 ?
                                    <GoCheck color={'#8CC152'}/> : null}
                            </div>
                            <div>Barchasini belgilash</div>
                        </div>
                        <div className={`p-1 d-flex mt-1 my-Hover ${main.checkedBorder}`}
                             style={{borderColor: '#E9573F'}} onClick={() => allChe(!checked3, 3)}>
                            <div style={{borderColor: '#E9573F'}} className={main.checkeds}>{checked3 ?
                                <GoCheck color={'#E9573F'}/> : null}</div>
                            <div>Barchasini belgilash</div>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col xs={12} sm={12} md={12} lg={7} xl={7} className={'mt-3'}>
                    <div className={`p-3 d-flex justify-content-center shadow ${main.card}`}
                         style={{backgroundColor: '#FFFFFFCC', borderRadius: 16}}>
                        <div className={'w-100'}>
                            <div className={'w-100 d-flex justify-content-between align-items-center mb-1'}>
                                <div className={'my-Hover'}
                                     onClick={() => changeDate(-1, currentDate?.year, currentDate?.month)}>
                                    <MdOutlineArrowBackIosNew size={30}/></div>
                                <div className={'fs-3'}>{currentDate?.month} - {currentDate?.year}</div>
                                <div className={'my-Hover'}
                                     onClick={() => changeDate(1, currentDate?.year, currentDate?.month)}>
                                    <MdOutlineArrowForwardIos size={30}/></div>
                            </div>
                            <div className={main.tableCalendar}>
                                <table
                                >
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
                                        currentDate?.dayList?.map((week, index) =>
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
                                                        onClick={() => getDates(day.checked, index, index2, day)}>
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
                                department?.map((item, index) =>
                                    <div key={index}
                                         className={`d-flex justify-content-between align-items-center  p-2 mt-1 my-Hover ${main.district}`}
                                         style={{backgroundColor: departmentId?.departmentId !== item?.departmentId ? 'white' : '#48B1AB'}}>
                                        <div className={`d-flex`}
                                             onClick={() => getKindergarten(item)}>
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
                                mtts?.map((item, index) =>
                                    <div key={index} className={`d-flex p-2 mt-1 ${main.district}`}
                                         style={{backgroundColor: 'white', cursor: 'pointer', position: 'relative'}}
                                         onClick={() => getDates2(!item.checked, item, index)}>
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
            </Row>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>

                </Modal.Header>
                <Modal.Body>Menyu biriktirishni yakunlash</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        YO'Q
                    </Button>
                    <Button variant="primary" onClick={() => submitKinlist()}>
                        HA
                    </Button>
                </Modal.Footer>
            </Modal>
            <LoadingPage load={load}/>
        </Container>
    );
}

export default RelationMenu;