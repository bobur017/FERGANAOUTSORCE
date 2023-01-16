import React from 'react';
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addTime, getDepartment, getDepartmentTime} from "../departments/RegionDepartmentReducer";
import DistrictStyle from "../more/DistrictStyle";
import {Button, Col, Form, InputGroup, Modal, Row} from "react-bootstrap";
import {addDefaultKidsNumbers, editDefaultKidsNumbers, getDefaultKidsNumbers} from "./ChildrenNumberReducer";

function TimeKidsNumber(props) {
    const [params, setParams] = useState({hours: '', minutes: ''});
    const [stateNumber, setStateNumber] = useState();
    const dispatch = useDispatch();
    const result = useSelector(state => state.kidsNumber.result)
    const departments = useSelector(state => state.department.departments);
    const departmentsTime = useSelector(state => state.department.departmentsTime);
    const ages = useSelector(state => state.age.ages);
    const firstUpdate = useRef(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (data) => {

        setShow(true)
    };


    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getDepartment());
        }else {
            console.log(departmentsTime,"departmentsTime")
        }
    }, [departmentsTime]);

    const getDistrict = (data) => {
        dispatch(getDepartmentTime());
    }

    const submitaverageKidsNumber = (e) => {
        e.preventDefault();
        const date = e.target.times.value.split(":");
        setParams({...params,minutes: parseInt(date[1]),hours: parseInt(date[0])});
        dispatch(addTime({minutes: parseInt(date[1]),hours: parseInt(date[0])}));
    }

    const renderFrom = () => {
      if (stateNumber === 0){

      }else if (stateNumber === 1){
          return (
              <Form>
                  <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon1">Vaqtni tanlang</InputGroup.Text>
                      <Form.Control
                          placeholder="Vaqtni tanlang"
                          type={"time"}
                          name={"time"}
                      />
                  </InputGroup>
              </Form>
          )
      }
    }

    return (
        <div>
            <Row>
                <Col sm={6} md={6} lg={5} xl={5} className={"figma-card-first mt-3"}>
                    <Row>
                        <Col sm={6} md={6} lg={6} xl={6}>
                            <DistrictStyle list={departments} getData={getDistrict}/>
                        </Col>
                    </Row>
                </Col>
                <Col sm={6} md={6} lg={7} xl={7}>
                    <div className={"figma-card-first mt-3"}>
                        <div className={"w-100"}>
                           <button className={"createButtons"} onClick={handleShow}>Vaqtni belgilash</button>
                            <div className={"text-center fs-3"}>
                               <span className={"fs-5"}>Bola soni kiritish vaqti</span> <span style={{color:'green'}}>{departmentsTime.join(":")}</span> <span className={"fs-4"}>gacha</span>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={submitaverageKidsNumber}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">Vaqtni tanlang</InputGroup.Text>
                                <Form.Control
                                    placeholder="Vaqtni tanlang"
                                    type={"time"}
                                    name={"times"}
                                />
                            </InputGroup>

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

export default TimeKidsNumber;