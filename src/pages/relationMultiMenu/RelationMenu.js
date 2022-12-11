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
import {BiCircle} from "react-icons/bi";
import {colorTextStr} from "../funcs/Funcs";


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
    const [calendarState, setCalendarState] = useState();
    const [relationMenu, setRelationMenu] = useState(defaultForRelation);
    const [apex, setApex] = useState();
    const [apex2, setApex2] = useState();
    const [apex3, setApex3] = useState();
    const dispatch = useDispatch();
    const multiMenuList = useSelector(state => state.multiMenu.multiMenuList);
    const calendar = useSelector(state => state.multiMenu.checkCalendar);
    const firstUpdate = useRef(false);

    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getMultiMenu());
            dispatch(checkCalendar({month: 12}));
        } else {
            setCalendarState(calendar);
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

    const getDates = (checked, index, index2) => {
        let list = [...calendarState?.dayList];
        let list2 = [...list[index]];
        list2[index2] = {...list2[index2], checked: checked};
        list[index] = [...list2];
        setCalendarState({...calendarState, dayList: list});
        console.log(list[index][index2], "list");
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
                                    calendarState?.dayList?.map((week, index) =>
                                        <tr key={index}>
                                            {week.map((day, index2) =>
                                                <td key={index2}
                                                    style={day?.checked ? {backgroundColor: 'rgba(72,177,171,0.55)'} : {}}
                                                    onClick={() => getDates(!day.checked, index, index2)}><span
                                                    style={index2 === 5 || index2 === 6 ? {color: 'red'} : {}}> {day.day !== 0 ? day.day : null}</span>
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
            </Row>
        </Container>
    );
}

export default RelationMenu;