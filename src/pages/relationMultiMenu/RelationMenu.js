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
import {BsCircle} from "react-icons/bs";
import {BiCircle} from "react-icons/bi";


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
]
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
]
function RelationMenu(props) {

    const pie = {
        series: [14, 55],
        options: {
            colors: ['#BABDC6', '#48B1AB'],
            labels: ['Apple', 'Kunlar'],
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
            }
        },
    }

    const customMenus = [
        {name: "aaaaaaaaaaaaa"},
        {name: "bbbbbbbbbbbb"},
        {name: "ccccccccccccc"},
        {name: "dddddddddddddd"},
        {name: "eeeeeeeeeeeeee"},
        {name: "ffffffffffffff"},
    ];
    const [multiMenuState, setStateMultiMenu] = useState({name: 'Menuni tanlang'});
    const [searchOpen, setSearchOpen] = useState(false)
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

        }
    }, [multiMenuList])

    const getMultiMenuDrop = (data) => {
        console.log(data, "data");
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
                            <div className={`w-50 ${main.textMenu}`}>
                                <span style={{fontSize: 25}} className={'fw-semibold'}>Yoz fasli uchun mo‘ljallangan menyu</span>
                                <br/>
                                <span style={{fontSize: 20}}>Amalda bajarilgan</span>
                                <br/>
                                <span>10 kun uchun mo‘ljallangan</span>
                            </div>
                            <div className={'w-50 d-flex'}>
                                <ReactApexChart options={pie.options} series={pie.series} type="donut" width={120}
                                                height={150}/>
                                <ReactApexChart options={pie.options} series={pie.series} type="donut" width={120}
                                                height={150}/>
                                <ReactApexChart options={pie.options} series={pie.series} type="donut" width={120}
                                                height={150}/>
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
                        <div className={`${main.card}`} style={{backgroundColor:'#FFFFFF'}}>

                                {
                                    district.map((item, index) =>
                                        <div key={index} className={`d-flex p-2 mt-1 ${main.district}`} style={{backgroundColor:'white'}}>
                                            <div style={{color: '#48B1AB', paddingLeft: 10,borderColor: '#48B1AB'}} className={main.leftLine}><AiOutlineEnvironment
                                                size={30}/>
                                            </div>
                                            <div className={'mx-2'}>{item.name}</div>
                                        </div>
                                    )
                                }

                        </div>
                    </div>
                    <div className={'px-2 w-50'}>
                        <div className={`${main.card}`}  style={{backgroundColor:'#FFFFFF'}}>
                            {
                                mtt.map((item, index) =>
                                    <div key={index} className={`d-flex p-2 mt-1 ${main.district}`} style={{backgroundColor:'white'}}>
                                        <div style={{color:item.checked ? '#8CC152': '#E9573F', paddingLeft: 10,borderColor: item.checked ? '#8CC152': '#E9573F'}} className={main.leftLine}><BiCircle
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