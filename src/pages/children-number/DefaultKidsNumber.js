import React from 'react';
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getDepartment} from "../departments/RegionDepartmentReducer";
import DistrictStyle from "../more/DistrictStyle";
import NavbarHeader from "../more/NavbarHeader";
import {Button, Col, Form, InputGroup, Modal, Row} from "react-bootstrap";
import {addDefaultKidsNumbers, editDefaultKidsNumbers, getDefaultKidsNumbers} from "./ChildrenNumberReducer";
import KindergartenStyle from "../more/KindergartenStyle";
import {getAge} from "../age/AgeReducer";

function DefaultKidsNumber(props) {
    const [params, setParams] = useState({pageSize: 20, page: 0, departmentId: ''});
    const [stateNumber, setStateNumber] = useState();
    const [averageKidsNumber, setAverageKidsNumber] = useState();
    const [kindergarten, setKindergarten] = useState();
    const dispatch = useDispatch();
    const kidsNumberDefault = useSelector(state => state.kidsNumber.kidsNumberDefault)
    const result = useSelector(state => state.kidsNumber.result)
    const departments = useSelector(state => state.department.departments);
    const ages = useSelector(state => state.age.ages);
    const firstUpdate = useRef(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (data) => {
        if (data === null) {
            setKindergarten({
                ...kindergarten, averageKidsNumber: {
                    ...kindergarten?.averageKidsNumber, subDTO: ages.map((item, index) => {
                        return {
                            "ageGroupId": item.id,
                            "id": "",
                            "number": "",
                            ageGroupName: item.name
                        }
                    })
                }
            })
        }
        setShow(true)
    };


    useEffect(() => {
        if (firstUpdate.current) {
            dispatch(getDepartment());
            dispatch(getDefaultKidsNumbers(params));
            handleClose();
        }
    }, [result]);
    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getDepartment());
            dispatch(getAge());
        }
    }, []);

    const getDistrict = (data) => {
        let thisParams = {...params, departmentId: data?.id};
        dispatch(getDefaultKidsNumbers(thisParams));
        setParams(thisParams);
    }
    const getKindergarten = (data) => {
        if (data?.averageKidsNumber) {
            setStateNumber(0);

        } else {
            setStateNumber(1);
        }
        setKindergarten(data);
    }

    const submitaverageKidsNumber = (e) => {
        e.preventDefault();
        if (kindergarten?.averageKidsNumber.id) {
            dispatch(editDefaultKidsNumbers(kindergarten?.averageKidsNumber.subDTO, kindergarten?.id))
        } else {
            dispatch(addDefaultKidsNumbers(kindergarten?.averageKidsNumber.subDTO, kindergarten?.id))
        }
    }
    const getAverage = () => {
        if (stateNumber === 0) {
            return (
                <div>
                    <div className={"my-4 fs-3 text-center fw-bolder"}>{kindergarten.number}{kindergarten.name} o'rtacha
                        bola soni
                    </div>
                    {
                        kindergarten?.averageKidsNumber?.subDTO?.map((item, index) =>
                            <div className={'infoText'} key={index}>
                                <div>{item?.ageGroupName}</div>
                                <div>{item.number}</div>
                            </div>)
                    }
                    <button className={"createButtons mt-3"} onClick={() => handleShow()}>o'zgartirish</button>
                </div>
            )
        } else if (stateNumber === 1) {
            return <div className={"w-100 d-flex justify-content-between"}>
                <span className={"fs-3 text-center"} style={{color: 'red'}}>O'rtacha bolasoni kiritilmagan</span>
                <button className={"createButtons"} onClick={() => handleShow(null)}>Kiritish</button>
            </div>;
        }
    }
    const onChangeAgeNumber = (index) => (e) => {
        let data = {...kindergarten.averageKidsNumber};
        let age = [...data.subDTO];
        age[index] = {...age[index], number: e.target.value};
        data = {...data, subDTO: age}
        setKindergarten({...kindergarten, averageKidsNumber: data});
    }
    return (
        <div>
            <Row>
                <Col sm={6} md={6} lg={5} xl={5} className={"figma-card-first mt-3"}>
                    <Row>
                        <Col sm={6} md={6} lg={6} xl={6}>
                            <DistrictStyle list={departments} getData={getDistrict}/>
                        </Col>
                        <Col sm={6} md={6} lg={6} xl={6}>
                            <KindergartenStyle list={kidsNumberDefault} getData={getKindergarten} subItem={true}
                                               subItemName={"averageKidsNumber"}/>
                        </Col>
                    </Row>
                </Col>
                <Col sm={6} md={6} lg={7} xl={7}>
                    <div className={"figma-card-first mt-3"}>
                        <div>
                            {getAverage()}
                        </div>
                    </div>
                </Col>
            </Row>
            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={submitaverageKidsNumber}>
                    <Modal.Header closeButton>
                        <Modal.Title>O'rtacha bola soni</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {kindergarten?.averageKidsNumber?.subDTO?.map((item, index) =>
                            <InputGroup key={index} className="mb-3">
                                <InputGroup.Text id="basic-addon1">{item?.ageGroupName}</InputGroup.Text>
                                <Form.Control
                                    size={"sm"}
                                    value={item?.number || undefined}
                                    type={"number"}
                                    onWheel={e => e.target.blur()}
                                    onChange={onChangeAgeNumber(index)}
                                />
                            </InputGroup>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            bekor qilish
                        </Button>
                        <Button variant="primary" type={"submit"}>
                            Tayyor
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
}

export default DefaultKidsNumber;