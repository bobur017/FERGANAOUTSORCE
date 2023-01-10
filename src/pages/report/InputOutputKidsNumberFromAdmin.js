import React from 'react';
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    getInputOutputKidsNumber,
    getInputOutputKidsNumberPdf, getInputOutputKidsNumberPdfDay,
    inputOutput,
    InputOutputKidsNumber
} from "./ReportReducer";
import {Col, Form, Row} from "react-bootstrap";
import NavbarHeader from "../more/NavbarHeader";
import {TimestampToInputDate} from "../funcs/Funcs";
import main from "../relationMultiMenu/relationStyle.module.scss";
import {AiOutlineEnvironment} from "react-icons/ai";
import {getByDepartmentMtt} from "../mtt/MttReducer";
import {getDepartment} from "../departments/RegionDepartmentReducer";
import {getKidsNumbersByDate, getKidsNumbersByDepartment} from "../children-number/ChildrenNumberReducer";
import {toast} from "react-toastify";

function InputOutputKidsNumberFromAdmin({data}) {
    const [params, setParams] = useState({startDate: '', endDate: ''});
    const [currentNavs, setCurrentNavs] = useState(0);
    const dispatch = useDispatch();
    const inputOutputs = useSelector(state => state.report.kidsNumber);
    const kidsNumbersByDate = useSelector(state => state.kidsNumber.kidsNumbersByDate);
    const kidsNumbersByDepartment = useSelector(state => state.kidsNumber.kidsNumbersByDepartment);
    const firstUpdate = useRef(false);
    const departments = useSelector(state => state.department.departments);
    const mtts = useSelector(state => state.mtt.mtts);
    const [date, setDate] = useState();
    const [departmentId, setDepartmentId] = useState();
    const [kindergarten, setKindergarten] = useState();
    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getDepartment());
        } else {

        }
    }, [inputOutputs]);

    const onChangeDate = (e) => {
        if (e.target.type === 'date') {
            setParams({...params, [e.target.name]: new Date(e.target.value).getTime()})
        }
    }

    const onChangeDate2 = (e) => {
        let dateHis = new Date(e.target.value).getTime();
        setDate(dateHis);
    }

    const getData = (e) => {
        e.preventDefault();
        if (kindergarten) {
            dispatch(getKidsNumbersByDate(kindergarten, params));
        } else {
            toast.error("MTT ni tanlang");
        }
    }

    const getData2 = (e) => {
        e.preventDefault();
        if (departmentId) {
            dispatch(getKidsNumbersByDepartment(departmentId, {date}));
        } else {
            toast.error("Tumanni tanlang");
        }
    }

    const getReportPdf = (e) => {
        e.preventDefault();
        dispatch(getInputOutputKidsNumberPdf(departmentId, params));
    }

    const getReportPdf2 = (e) => {
        e.preventDefault();
        dispatch(getInputOutputKidsNumberPdfDay(departmentId, params));
    }

    const getMttsByDepartment2 = (data) => {
        setDepartmentId(data);
        dispatch(getByDepartmentMtt(data.id))
    }

    const getMttsByDepartment3 = (data) => {
        setDepartmentId(data);
    }
    const getKindergartenDays = (data) => {
        setKindergarten(data);
    }
    const colors = (name) => {
        if (name === "TASDIQLANDI") {
            return "#029605";
        } else {
            return "#e16107";
        }
    }
    return (
        <div className={`${main.main}`}>
            <NavbarHeader name={"Bolalar soni hisoboti"} navs={[{name: "MTT kesimida"}, {name: "Kun kesimida"}]}
                          currentNavs={setCurrentNavs}/>
            {currentNavs === 0 ? <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className={'figma-card-first mt-3 justify-content-around'}>
                    <Form onSubmit={getData2}>

                        <Row className="mb-3 align-items-center">
                            <Form.Group as={Col}>
                                <Form.Label>Sanani tanlang</Form.Label>
                                <Form.Control name={'date'} type={'date'} onChange={onChangeDate2}
                                              required
                                              value={TimestampToInputDate(date)}/>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridZip" className={"d-flex"}>
                                <button className={'createButtons mt-4'} type={'submit'}>Tayyor</button>
                                <button className={'buttonPdf mt-4 mx-3'} type={'submit'} onClick={getReportPdf}>PDF
                                </button>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridZip">
                            </Form.Group>
                        </Row>

                    </Form>
                </Col>
                <Col xs={5} sm={5} md={5} lg={5} xl={5}
                     className={'figma-card-first d-flex justify-content-between p-1 mt-3'}>
                    <div className={'w-100'}>
                        <div className={`${main.card}`} style={{backgroundColor: '#FFFFFF'}}>
                            {
                                departments?.map((item, index) =>
                                    <div key={index}
                                         className={`d-flex justify-content-between align-items-center  p-2 mt-1 my-Hover ${main.district}`}
                                         style={{backgroundColor: departmentId?.id !== item?.id ? 'white' : '#48B1AB'}}>
                                        <div className={`d-flex`}
                                             onClick={() => getMttsByDepartment3(item)}>
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

                </Col>
                <Col xs={7} sm={7} md={7} lg={7} xl={7} className={'figma-card-first mt-3'}>
                    {kidsNumbersByDepartment.length > 0 ? <div className={"tableCalendar"}>
                            <table>
                                <thead>
                                <tr>
                                    <th>№</th>
                                    <th>MTT nomi</th>
                                    {
                                        kidsNumbersByDepartment.length > 0 ? kidsNumbersByDepartment[0]?.subDTO.map((item, index) =>
                                            <th key={index}>{item.ageGroupName}</th>
                                        ) : null
                                    }
                                    <th>Holati</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    kidsNumbersByDepartment.map((item, index) =>
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.kindergartenName}</td>
                                            {
                                                item.subDTO.map((item2, index2) =>
                                                    <td key={index2}>{item2.number}</td>
                                                )
                                            }
                                            <td style={{color: colors(item.status), fontWeight: 600}}>{item.status}</td>
                                        </tr>
                                    )
                                }
                                </tbody>
                            </table>
                        </div> :
                        <div className={"text-center"}>Bu kunda ma'lumotlar mavjud emas!</div>
                    }
                </Col>
            </Row> : null}
            {currentNavs === 1 ? <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className={'figma-card-first mt-3 justify-content-around'}>
                    <Form onSubmit={getData}>
                        <Row className="mb-3 align-items-center">
                            <Form.Group as={Col}>
                                <Form.Label>Boshlanish sana</Form.Label>
                                <Form.Control name={'startDate'} type={'date'} onChange={onChangeDate}
                                              required
                                              value={TimestampToInputDate(params.startDate)}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Tugash sana</Form.Label>
                                <Form.Control name={'endDate'} type={'date'} onChange={onChangeDate}
                                              required
                                              value={TimestampToInputDate(params.endDate)}
                                              min={TimestampToInputDate(params.startDate)}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZip" className={'d-flex'}>
                                <button className={'createButtons mt-4 mx-3'} type={'submit'}>Tayyor</button>
                                <button className={'buttonPdf mt-4'} type={'submit'} onClick={getReportPdf2}>PDF
                                </button>
                            </Form.Group>
                        </Row>

                    </Form>
                </Col>
                <Col xs={5} sm={5} md={5} lg={5} xl={5}
                     className={'figma-card-first d-flex justify-content-between p-1 mt-3'}>
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
                                         } : {
                                             backgroundColor: 'white',
                                             cursor: 'pointer',
                                             position: 'relative'
                                         }}
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
                <Col xs={7} sm={7} md={7} lg={7} xl={7} className={'figma-card-first mt-3'}>
                    {kidsNumbersByDate.length > 0 ? <div className={"tableCalendar"}>
                        <table>
                            <thead>
                            <tr>
                                <th>№</th>
                                <th>MTT nomi</th>
                                {
                                    kidsNumbersByDate.length > 0 ? kidsNumbersByDate[0].subDTO.map((item, index) =>
                                        <th key={index}>{item.ageGroupName}</th>
                                    ) : null
                                }
                                <th>Holati</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                kidsNumbersByDate.map((item, index) =>
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.date?.join("-")}</td>
                                        {
                                            item.subDTO.map((item2, index2) =>
                                                <td key={index2}>{item2.number}</td>
                                            )
                                        }
                                        <td style={{color: colors(item.status), fontWeight: 600}}>{item.status}</td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </div> : <div className={"text-center"}>Bu kunda ma'lumot mavjud emas</div>}
                </Col>
            </Row> : null}
        </div>
    );
}

export default InputOutputKidsNumberFromAdmin;