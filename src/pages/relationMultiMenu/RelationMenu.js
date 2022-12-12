import React from 'react';
import {Col, Container, Form, Row, Table} from "react-bootstrap";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {checkCalendar, getMultiMenu} from "../multimenu/MultiMenuReducer";
import main from './relationStyle.module.scss'
import SearchSelect from "../more/SearchSelect";
import ReactApexChart from 'react-apexcharts'
import {AiOutlineCheck, AiOutlineClose} from "react-icons/ai";
import {MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos} from "react-icons/md";
import {AiOutlineEnvironment} from "react-icons/ai";
import {colorTextStr} from "../funcs/Funcs";
import {getDepartmentFromRelation} from "../departments/RegionDepartmentReducer";
import {getMttFromRelations} from "../mtt/MttReducer";
import {GoCheck, GoPrimitiveDot} from "react-icons/go";
import {toast} from "react-toastify";
import {BsCheckAll} from "react-icons/bs";

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
    const [departmentId, setDepartmentId] = useState();
    const [mtts, setMtts] = useState([]);
    const [newMtts, setNewMtts] = useState([]);
    const [currentDate, setCurrentDate] = useState();
    const [currentDay, setCurrentDay] = useState({
        date: '',
        index: '',
        index2: '',
        attached: '',
        checked: '',
        kinList: []
    });
    const [apex2, setApex2] = useState();
    const [apex3, setApex3] = useState();
    const [emptyMtt, setEmptyMtt] = useState(false);
    const dispatch = useDispatch();
    const multiMenuList = useSelector(state => state.multiMenu.multiMenuList);
    const calendar = useSelector(state => state.multiMenu.checkCalendar);
    const departmentsRel = useSelector(state => state.department.departmentsRel);
    const mttsRelations = useSelector(state => state.mtt.mttsRelations);
    const firstUpdate = useRef(false);

    useEffect(() => {
        if (!firstUpdate.current) {

        } else {
            console.log(departmentsRel, "departmentsRel");
        }
    }, [departmentsRel]);

    useEffect(() => {
        if (!firstUpdate.current) {

        } else {
            setMtts(mttsRelations);
            let list = [...newMtts];
            let list2 = [...mttsRelations];
            setNewMtts(list.concat(list2));
        }
    }, [mttsRelations]);

    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getMultiMenu());
            dispatch(checkCalendar({month: 12}));
        } else {
            let list = [...calendarState];
            if (!list.some(cale => cale.month === calendar.month && cale.year === calendar.year)) {
                list.push(calendar);
                setCurrentDate({...calendar, index: list.indexOf(calendar)});
                setCalendarState(list);
            } else if (list.length === 0) {
                setCalendarState(list);
            }
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
            if (currentDay.date !== day?.date) {
                dispatch(getDepartmentFromRelation({date: parseInt(day?.date)}));
            }
            setCurrentDay({
                ...currentDay,
                index,
                index2,
                state: day.state,
                attached: day?.attached,
                date: day?.date,
                kinList: day?.kinList ? day?.kinList : []
            });
        } else {
            toast.error("Bu kunga bog'cha biriktirib bo'lmaydi!");
        }
    }

    const getDates2 = (checked, data, index) => {
        let mttList = [...mtts];
        mttList[index] = {...mttList[index], checked};
        let mttList2 = [...newMtts];
        newMtts.forEach((mtt, index) => {
            if (mtt.id === data.id) {
                mttList2[index] = {...mttList2[index], checked};
            }
        })
        setNewMtts(mttList2);
        setMtts(mttList);
        let kinderList = [...currentDay?.kinList];
        if (checked) {
            kinderList.push(mttList[index]);
        } else {
            kinderList = [...kinderList].filter(item => item.id !== data.id);
        }
        let list = [...currentDate?.dayList];
        let list2 = [...list[currentDay?.index]];
        if (!checked) {
            // console.log(checked, "checked")
            // console.log(kinderList.some(kinde => kinde.checked), "kinderList.some(kinde => kinde.checked)")
            if (!kinderList.some(kinde => kinde.checked)) {
                list2[currentDay?.index2] = {...list2[currentDay?.index2], checked, kinList: kinderList};
            } else {
                list2[currentDay?.index2] = {...list2[currentDay?.index2], kinList: kinderList};
            }
        } else {
            list2[currentDay?.index2] = {...list2[currentDay?.index2], checked, kinList: kinderList};
        }
        list[currentDay?.index] = [...list2];
        console.log(list, "list");
        setCurrentDate({...currentDate, dayList: list});
        let calendarList = [...calendarState];
        calendarList[currentDate?.index] = {
            ...calendarList[currentDate?.index],
            dayList: list,
        };
        setCurrentDay({...currentDay, kinList: kinderList});
        setCalendarState(calendarList);
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
            dispatch(checkCalendar({month, year}));
        } else {
            setCurrentDate(calendarState.filter(date => date.year === year && date.month === month)[0]);
        }
    }

    const getKindergarten = (data) => {
        setDepartmentId(data.departmentId);
        let list = newMtts.filter(mtt => mtt.departmentId === data.departmentId);
        console.log(newMtts, "newMtts");
        if (list.length > 0) {
            setMtts(list);
        } else {
            dispatch(getMttFromRelations(data.departmentId, {date: currentDay?.date}));
        }
    }
    return (
        <Container fluid className={main.main}>
            <Row>
                <Col xs={12} sm={12} md={12} lg={7} xl={7}>
                    <SearchSelect setData={getMultiMenuDrop} list={multiMenuList} itemName={"name"}/>
                </Col>
                <Col xs={12} sm={12} md={12} lg={5} xl={5} className={'d-flex justify-content-end'}>
                    <button className={main.buttonClose}><AiOutlineClose size={25}/><span className={'mx-2'}>Bekor qilish</span>
                    </button>
                    <button className={main.buttonSuccess}><AiOutlineCheck size={25}/><span
                        className={'mx-2'}>Tayyor</span></button>
                </Col>
            </Row>
            <Row>
                <Col xs={12} sm={12} md={12} lg={7} xl={7} className={'mt-3'}>
                    <div className={main.card}>
                        <div className={'d-flex justify-content-between align-items-center'}>
                            <div className={` ${main.textMenu}`}>
                                <span style={{fontSize: 25}} className={'fw-semibold'}>{multiMenuState?.name}</span>
                                <br/>
                                <span style={{fontSize: 20}}>{multiMenuState?.daily} kun uchun mo‘ljallangan</span>
                                <br/>
                                <span>{multiMenuState?.regionalDepartmentName} tomonidan tuzilgan.</span>
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
                        <div className={`p-1 d-flex ${main.checkedBorder}`} style={{borderColor: 'black'}}>
                            <div style={{borderColor: '#000'}} className={main.checkeds}></div>
                            <div>Barchasini belgilash</div>
                        </div>
                        <div className={`p-1 d-flex mt-1 ${main.checkedBorder}`} style={{borderColor: '#8CC152'}}>
                            <div style={{borderColor: '#8CC152'}} className={main.checkeds}></div>
                            <div>Barchasini belgilash</div>
                        </div>
                        <div className={`p-1 d-flex mt-1 ${main.checkedBorder}`} style={{borderColor: '#E9573F'}}>
                            <div style={{borderColor: '#E9573F'}} className={main.checkeds}></div>
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
                                                    <div className={day.attached ? `${main.borderTd}` : ''}
                                                         style={index2 === 5 || index2 === 6 ? {color: 'red'} : {}}>{day.day !== 0 ? day.day : null}</div>
                                                    <span style={day?.state && day.checked ? {
                                                        position: 'absolute',
                                                        right: 10,
                                                        bottom: 0
                                                    } : {display: 'none'}}><BsCheckAll size={20}
                                                                                       color={day?.date === currentDay?.date ? 'white' : '#48B1AB'}/></span>
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
                                departmentsRel.map((item, index) =>
                                    <div key={index} className={`d-flex p-2 mt-1 my-Hover ${main.district}`}
                                         style={{backgroundColor: departmentId !== item.departmentId ? 'white' : '#48B1AB'}}
                                         onClick={() => getKindergarten(item)}>
                                        <div style={{
                                            color: departmentId !== item.departmentId ? '#48B1AB' : 'white',
                                            paddingLeft: 10,
                                            borderColor: departmentId !== item.id ? '#48B1AB' : 'white'
                                        }}
                                             className={main.leftLine}><AiOutlineEnvironment
                                            size={30}/>
                                        </div>
                                        <div className={'mx-2'}
                                             style={{color: departmentId === item.departmentId ? 'white' : '#000'}}>{item?.departmentName}</div>
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
                                         style={{backgroundColor: 'white', cursor: 'pointer'}}
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
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default RelationMenu;