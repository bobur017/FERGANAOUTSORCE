import React from 'react';
import {Button, Col, Container, Form, Modal, Row} from "react-bootstrap";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addUserDepartment, addUserRegion, deleteUser, editUser, getAllUser, getRoles, statusUser} from "./UserReducer";
import NavbarHeader from "../more/NavbarHeader";
import Role from "../role/Role";
import {getDepartment} from "../departments/RegionDepartmentReducer";
import main from "../relationMultiMenu/relationStyle.module.scss";
import {AiOutlineEnvironment} from "react-icons/ai";
import {BiDotsVerticalRounded, BiEdit, BiUserCheck, BiUserX} from "react-icons/bi";
import {MdDeleteForever} from "react-icons/md";

function Users() {
    const defaultUser = {
        id: null,
        "fatherName": "",
        "name": "",
        "password": "",
        "phoneNumber": "",
        "roleId": '',
        "status": true,
        "surname": "",
        "userName": ""
    };
    const [show, setShow] = useState(false);
    const [more, setMore] = useState(null);
    const [params, setParams] = useState({type: 'department', id: '', infoText: ''});
    const handleClose = () => setShow(false);
    const handleShow = (user) => {
        if (user !== null) {
            setUserState(user);
        } else {
            setUserState(defaultUser);
        }
        setShow(true)
    };
    const [userState, setUserState] = useState(defaultUser);
    const dispatch = useDispatch();
    const firstUpdate = useRef(false);
    const departments = useSelector(state => state.department.departments);
    const result = useSelector(state => state.user.result);
    const users = useSelector(state => state.user.users);

    useEffect(() => {
        if (!firstUpdate.current) {

        } else {
            if (params.type === 'region') {
                dispatch(getAllUser(params))
            } else {
                dispatch(getAllUser(params));
            }
            handleClose();
        }
    }, [result]);

    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getDepartment());
        }
    }, [])

    const getRoleInRole = (id) => {
        setUserState({...userState, roleId: id});
    }
    const onChangeState = (e) => {
        setUserState({...userState, [e.target.name]: e.target.value});
    }

    const submit = (e) => {
        e.preventDefault();
        if (params.type === 'region') {
            if (userState.id === null) {
                dispatch(addUserRegion(userState));
            } else {
                dispatch(editUser(userState));
            }
        } else {
            if (userState.id === null) {
                dispatch(addUserDepartment(userState, {departmentId: params.id}));
            } else {
                dispatch(editUser(userState));
            }
        }
    }
    const selectDistrict = (type, id) => {
        setParams({...params, id, type});
        dispatch(getAllUser({type, id}));
    }
    const onBlurs = (ee) => {
        console.log("blur")
        setMore(ee);
    }
    const onFocuss = (eee) => {
        setMore(eee);
    }
    return (
        <div className={'allMain'}>
            <NavbarHeader name={"Xodimlar bo'limi"} buttonName={"Xodim qo'shish"} handleShow={handleShow}/>
            <Container fluid>
                <Row>
                    <Col xs={12} sm={12} md={3} lg={3} xl={3}>
                        <div className={'figma-card mt-3'} style={{overflowY: 'auto'}}>
                            <div style={{maxHeight: '70vh'}}>
                                <div className={`d-flex p-2 mt-1 district`}
                                     style={null === params.id ? {
                                         backgroundColor: '#48B1AB',
                                         color: 'white'
                                     } : {backgroundColor: 'white'}}
                                     onClick={() => selectDistrict("region", null)}>
                                    <div style={{
                                        color: null === params.id ? 'white' : '#48B1AB',
                                        borderColor: '#48B1AB'
                                    }}
                                         className={main.leftLine}><AiOutlineEnvironment
                                        size={30}/>
                                    </div>
                                    <div className={'mx-1 fs-6 fw-bold'}>Boshqarma xodimlari</div>
                                </div>
                                <div className={'w-100 text-center fw-bold fs-5'}>Bo'limlar</div>
                                {
                                    departments.map((item, index) =>
                                        <div key={index} className={`d-flex p-2 mt-1 district`}
                                             style={params.id === item.id ? {
                                                 backgroundColor: '#48B1AB',
                                                 color: 'white'
                                             } : {backgroundColor: 'white'}}
                                             onClick={() => selectDistrict("department", item.id)}>
                                            <div style={{
                                                color: params.id === item.id ? 'white' : '#48B1AB',
                                                borderColor: '#48B1AB'
                                            }}
                                                 className={main.leftLine}><AiOutlineEnvironment
                                                size={30}/>
                                            </div>
                                            <div className={'mx-1'}>{item.name}</div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>

                    </Col>
                    <Col xs={12} sm={12} md={9} lg={9} xl={9}>
                        <div className={'figma-card mt-3'}>
                            <div className={'tableCalendar'}>
                                <table>
                                    <thead>
                                    <tr>
                                        <th>№</th>
                                        <th>Holati</th>
                                        <th>F.I.O</th>
                                        <th>Lavozimi</th>
                                        <th>Login</th>
                                        <th>boshqa</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        users.map((item, index) =>
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    <div
                                                        className={item.status ? 'userStatusActive' : 'userStatusInActive'}></div>
                                                </td>
                                                <td style={{minWidth: 400}}>
                                                    <div>{item.name}{' '}{item.surname}{' '}{item.fatherName}</div>
                                                    <div className={'sub-text'}>{item.phoneNumber}</div>
                                                </td>
                                                <td>{item.positionName}</td>
                                                <td>{item.username}</td>
                                                <td>
                                                    <button className={'myDots'}
                                                            onBlur={() => onBlurs(null)}
                                                            onFocus={() => onFocuss(item.id)}
                                                    >
                                                        <BiDotsVerticalRounded size={25}/>
                                                        {
                                                            more === item.id ? <div className={'more shadow'}>
                                                                {item.status ? <div className={'sub-more'}  onClick={()=>dispatch(statusUser(item,{status: !item.status}))}>
                                                                    <BiUserX size={20} color={'#E9573F'}/>
                                                                    <span className={'mx-1'}>Xodimni cheklash</span>
                                                                </div> : <div className={'sub-more'} onClick={()=>dispatch(statusUser(item,{status: !item.status}))}>
                                                                    <BiUserCheck size={20} color={'#8CC152'} />
                                                                    <span>Xodimni faolasht..</span>
                                                                </div>
                                                                }
                                                                <div className={'sub-more'}
                                                                     onClick={() => handleShow(item)}>
                                                                    <BiEdit size={20}/>
                                                                    <span>O'zgartirish</span>
                                                                </div>
                                                                <div className={'sub-more'} onClick={()=>dispatch(deleteUser(item))}>
                                                                    <MdDeleteForever size={20}/>
                                                                    <span>O'chirish</span>
                                                                </div>
                                                            </div> : null
                                                        }
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={submit} style={{fontSize:10}}>
                    <Modal.Header closeButton>
                        <Modal.Title>Xodim </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Label>Ismi</Form.Label>
                        <Form.Control name={'name'} size={'sm'} className={'mb-2'} value={userState.name} onChange={onChangeState}
                                      required/>
                        <Form.Label>Familyasi</Form.Label>
                        <Form.Control name={'surname'} className={'mb-2'} size={'sm'}  value={userState.surname}
                                      onChange={onChangeState} required/>
                        <Form.Label>Otasining ismi</Form.Label>
                        <Form.Control name={'fatherName'} className={'mb-2'} size={'sm'}  value={userState.fatherName}
                                      onChange={onChangeState} required/>
                        <Form.Label>Login</Form.Label>
                        <Form.Control name={'username'} className={'mb-2'} size={'sm'}  value={userState.username} minLength={5}
                                      onChange={onChangeState} required/>
                        <Form.Label>Tel:</Form.Label>
                        <Form.Control name={'phoneNumber'} className={'mb-2'} size={'sm'}  value={userState.phoneNumber}
                                      maxLength={9}
                                      minLength={9}
                                      onChange={onChangeState} required placeholder={"+998"}/>
                        {userState.id === null ? <> <Form.Label>Parol</Form.Label>
                            <Form.Control name={'password'} minLength={8} size={'sm'}  className={'mb-2'} value={userState.password}
                                          onChange={onChangeState} required/></> : null}
                        <Form.Label>Lavozimni tanlang</Form.Label>
                        <Role getRoleId={getRoleInRole} type={params}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" size={'sm'} onClick={handleClose}>
                            Ortga
                        </Button>
                        <Button variant="primary" size={'sm'} type={'submit'}>
                            Saqlash
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
}

export default Users;