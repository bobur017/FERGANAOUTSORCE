import React from 'react';
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {inputOutput} from "./ReportReducer";
import {Col, Container, Form, Row} from "react-bootstrap";
import NavbarHeader from "../more/NavbarHeader";
import {TimestampToInputDate} from "../funcs/Funcs";
import main from "../relationMultiMenu/relationStyle.module.scss";
import {AiOutlineEnvironment} from "react-icons/ai";
import {getDepartment} from "../departments/RegionDepartmentReducer";
import {getByDepartmentMtt} from "../mtt/MttReducer";
import {toast} from "react-toastify";

function InputOutputFromAdmin({data}) {
    const [params, setParams] = useState({start: '', end: '',kindergartenId:''});
    const dispatch = useDispatch();
    const inputOutputs = useSelector(state => state.report.inputOutput);
    const firstUpdate = useRef(false);
    const departments = useSelector(state => state.department.departments);
    const mtts = useSelector(state => state.mtt.mtts);
    const [departmentId, setDepartmentId] = useState();
    const [kindergarten, setKindergarten] = useState();


    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getDepartment());
        } else {
            var win = window.open(inputOutputs, '_blank');
            win.focus();
        }
    }, [inputOutputs]);

    const onChangeDate = (e) => {
        if (e.target.type === 'date') {
            setParams({...params, [e.target.name]: new Date(e.target.value).getTime()})
        }
    }

    const getData = (e) => {
        e.preventDefault();
        if (params.kindergartenId){
        dispatch(inputOutput(params));
        }else {
            toast.error("MTT ni tanlang");
        }
    }

    const getMttsByDepartment2 = (data) => {
        setDepartmentId(data);
        setParams({...params,kindergartenId:data.id})
        dispatch(getByDepartmentMtt(data.id))
    }

    const getKindergartenDays = (data) => {
        setKindergarten(data);
    }
    return (
        <Container fluid={true} className={`w-100 ${main.main}`}>
            <NavbarHeader name={"Kirim chiqim hisobotlari"}/>
            <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className={'figma-card-first mt-3 justify-content-around'}>
                    <Form onSubmit={getData}>

                        <Row className="mb-3 align-items-center">
                            <Form.Group as={Col}>
                                <Form.Label>Boshlanish sana</Form.Label>
                                <Form.Control name={'start'} type={'date'} onChange={onChangeDate}
                                              required
                                              value={TimestampToInputDate(params.start)}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Tugash sana</Form.Label>
                                <Form.Control name={'end'} type={'date'} onChange={onChangeDate}
                                              required
                                              value={TimestampToInputDate(params.end)}
                                              min={TimestampToInputDate(params.start)}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZip">
                                <button className={'createButtons mt-4'} type={'submit'}>Tayyor</button>
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
            </Row>
        </Container>
    )
        ;
}

export default InputOutputFromAdmin;