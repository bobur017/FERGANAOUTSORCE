import React from 'react';
import {Col, Container, Form, Row} from "react-bootstrap";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import NavbarHeader from "../more/NavbarHeader";
import {getDepartment} from "../departments/RegionDepartmentReducer";
import CheckBoxCustom2 from "../more/CheckBoxCustom2";
import {getDepartmentRoles, getKindergartenRoles} from "../users/UserReducer";
import {getByDepartmentMtt} from "../mtt/MttReducer";

function SendNotifications() {
    const def = {
        "departmentDTO": [
            {
                "departmentId": '',
                "kindergartenDTO": {
                    "kindergartenId": [
                        ''
                    ],
                    "roleId": [
                        ''
                    ]
                },
                "roleId": [
                    ''
                ]
            }
        ],
        "header": "string",
        "message": "string"
    }
    const [roleDepartment, setRoleDepartment] = useState([]);
    const [roleKindergarten, setRoleKindergarten] = useState();
    const [fromSubmit, setFromSubmit] = useState(def);
    const [currentDepartment, setCurrentDepartment] = useState();
    const [departmentAll, setDepartmentAll] = useState([]);
    const [currentKindergarten, setCurrentKindergarten] = useState();
    const [kindergartenAll, setKindergartenAll] = useState([]);
    const [thisDepartment, setThisDepartment] = useState([]);
    const [thisKindergarten, setThisKindergarten] = useState([]);
    const dispatch = useDispatch();
    const departments = useSelector(state => state.department.departments);
    const kindergartenRoles = useSelector(state => state.user.kindergartenRoles);
    const departmentRoles = useSelector(state => state.user.departmentRoles);
    const mtts = useSelector(state => state.mtt.mtts);
    const firstUpdate = useRef(false);


    useEffect(() => {
        if (firstUpdate.current) {
            setThisDepartment(departments);
        }
    }, [departments]);


    useEffect(() => {
        if (firstUpdate.current) {
            setKindergartenAll([...kindergartenAll].concat(mtts));
            setThisKindergarten(mtts);
        }
    }, [mtts]);

    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getDepartment());
            dispatch(getKindergartenRoles());
            dispatch(getDepartmentRoles());
        }
    }, []);

    const onClickedDepartment = (data, index) => {
        if (!departmentAll.some(item => item.id === data.id)) {
            dispatch(getByDepartmentMtt(data?.id));
        } else {
            setThisKindergarten(kindergartenAll.filter(item => item.departmentId === data.id))
        }
        setRoleDepartment(data?.roleId);
    }

    const onClickedKindergarten = (data, index) => {
        if (!departmentAll.some(item => item.id === data.id)) {
            dispatch(getByDepartmentMtt(data?.id));
        } else {
            setThisKindergarten(kindergartenAll.filter(item => item.departmentId === data.id))
        }
        setRoleDepartment(data?.roleId);
    }

    const getCheckedDepartment = (data, checked, index) => {
        let data1 = {...data, index, checked, departmentId: data.id};
        setCurrentDepartment(data1);
        let dep = {...thisDepartment};
        dep[index] = {...data, checked};
        setThisDepartment(dep);
    }

    const getCheckedKindergarten = (data, checked, index) => {
        let data1 = {...data, index, checked, departmentId: data.id};
        setCurrentKindergarten(data1);
        let dep = {...thisDepartment};
        dep[index] = {...data, checked};
        setThisKindergarten(dep);
    }

    const allCheckedFromKindergarten = (checked) => {
        setCurrentKindergarten(checked);
        setThisKindergarten(thisKindergarten.map((item, index) => {
            return {...item, checked}
        }));
        setKindergartenAll(kindergartenAll.map(item => {
            if (thisKindergarten.some(item2 => item2.id === item.id)) {
                return {...item, checked};
            } else {
                return item;
            }
        }));
    }

    const allCheckedFromDepartment = (checked) => {
        setCurrentDepartment(checked);
        setThisDepartment(thisDepartment.map((item, index) => {
            return {...item, checked}
        }));
    }

    const roleKinderChecked = (data, index, checked) => {
        let roleId = [...roleKindergarten];
        roleId[index] = {...data, checked};
        setRoleKindergarten(roleId);
        setCurrentKindergarten({...data, checked});
        let allKinder = [...kindergartenAll];
        kindergartenAll.forEach((item, indexi) => {
                if (item.id === currentKindergarten.id) {
                    allKinder[indexi] = {...allKinder[indexi], roleId};
                }
            }
        );
        let kinTihList = [...thisKindergarten];
        thisKindergarten.forEach((item, indexi) => {
            if (item.id === currentKindergarten?.id) {
                kinTihList[indexi] = {...kinTihList[indexi], roleId};
            }
        });
        setThisKindergarten(kinTihList);
        setKindergartenAll(allKinder);
        setCurrentKindergarten({...currentKindergarten, roleId});
    }

    const roleDepartChecked = (data, index, checked) => {
        let roleId = [...roleDepartment];
        roleId[index] = {...data, checked};
        setRoleDepartment(roleId);
        setCurrentDepartment({...data, checked});
        let depThisList = [...thisDepartment];
        thisDepartment.forEach((item, indexi) => {
            if (item.id === currentDepartment?.id) {
                depThisList[indexi] = {...depThisList[indexi], roleId};
            }
        });
        setThisKindergarten(depThisList);
        setCurrentDepartment({...currentDepartment, roleId});
    }

    return (
        <Container fluid={true}>
            <NavbarHeader name={"Bildirishnoma yuborish bo'limi"}/>
            <Row>
                <Col className={"figma-card-first mt-3"} xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Bildirishnoma sarlavhasi</Form.Label>6
                            <Form.Control type="text" placeholder="Sarlavha"/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Bildirishnoma matni</Form.Label>
                            <Form.Control as="textarea" rows={3}/>
                        </Form.Group>
                    </Form>
                </Col>
                <Col className={"figma-card-first mt-3"} xs={12} sm={12} md={6} lg={6} xl={6}>
                    <CheckBoxCustom2 list={departments} getChecked={getCheckedDepartment}
                                     allChecked={allCheckedFromDepartment} name={"districtName"}/>
                </Col>
            </Row>
        </Container>
    );
}

export default SendNotifications;