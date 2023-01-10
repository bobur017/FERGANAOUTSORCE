import React from 'react';
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addMealTime, deleteMealTime, editMealTime, getMealTime} from "./MealTimeReducer";
import {Button, Col, Form, Modal, Row, Table} from "react-bootstrap";
import NavbarHeader from "../more/NavbarHeader";
import CheckBoxCustom from "../more/CheckBoxCustom";
import {getAge} from "../age/AgeReducer";
import CheckBoxCustom2 from "../more/CheckBoxCustom2";
import {getRoleStorage} from "../more/Functions";


function MealTime() {
    const [show, setShow] = useState(false);
    const [edited, setEdited] = useState(false);
    const [mealTimes, setMealTimes] = useState([]);
    const dispatch = useDispatch();
    const firstUpdate = useRef(false);
    const mealTime = useSelector(state => state.mealTime)
    const ages = useSelector(state => state.age.ages)
    const handleClose = () => {
        setShow(false);
        setMealTimeState({id: '', name: '', ageGroupList: ages});
    };
    const [mealTimeState, setMealTimeState] = useState({id: '', name: '', ageGroupList: ages});
    const handleShow = (data) => {
        if (data === null) {
            setMealTimeState({...mealTimeState, ageGroupList: ages})
        }
        setShow(true)
    };


    useEffect(() => {
        if (firstUpdate.current) {
            dispatch(getMealTime());
            handleClose();
        }
    }, [mealTime.result])

    useEffect(() => {
        setMealTimes(mealTime.mealTimes);
    }, [mealTime.mealTimes]);


    useEffect(() => {
        if (firstUpdate.current !== true) {
            firstUpdate.current = true;
            dispatch(getMealTime());
            dispatch(getAge());
        }
    }, [])

    const submitMealTime = (e) => {
        e.preventDefault();
        let ageGroupIdList = mealTimeState?.ageGroupList.filter(item => item.checked).map(item => item.id);
        console.log(ageGroupIdList, mealTimeState);
        if (mealTimeState.id !== '') {
            dispatch(editMealTime({
                ...mealTimeState,
                ageGroupIdList
            }));
        } else {
            dispatch(addMealTime({
                ...mealTimeState,
                ageGroupIdList
            }));
        }
    }
    const onClickDepartment = (data, number) => {
        if (number === 1) {
            let ageGroupList = ages.map((item) => {
                if (data?.ageGroupList?.some(item2 => item2.id === item.id)) {
                    return {...item, checked: true};
                } else {
                    return {...item, checked: false};
                }
            })
            setMealTimeState({
                ...data, ageGroupList
            });
            console.log(ageGroupList);
            setEdited(true);
            setShow(true);
        } else if (number === 2) {
            dispatch(deleteMealTime(data));
        }
    }


    const onChanges = (param) => (e) => {
        setMealTimeState({...mealTimeState, [param]: e.target.value});
    }

    const getChecked = (data, checked, index) => {
        let ageGroupList = [...mealTimeState?.ageGroupList];
        ageGroupList[index] = {...ageGroupList[index], checked};
        setMealTimeState({...mealTimeState, ageGroupList});
    }
    const allChecked = (checked) => {
        setMealTimeState({
            ...mealTimeState, ageGroupList: mealTimeState?.ageGroupList.map((item) => {
                return {...item, checked}
            })
        });
    }

    return (
        <div className={'allMain'}>
            <NavbarHeader name={"Taomlanish vaqtlari"} handleShow={handleShow}
                          buttonName={getRoleStorage() === "ROLE_ADMIN" ? "Taom vaqtini qo'shish" : ""}/>
            <br/>
            <div className={'figma-card'}>

                <div className={'tableCalendar'}>
                    <table style={{color: 'black'}}>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Nomi</th>
                            {getRoleStorage() === "ROLE_ADMIN" ? <th>O'zgartirish</th> : null}
                            {getRoleStorage() === "ROLE_ADMIN" ? <th>O'chirish</th> : null}
                        </tr>
                        </thead>
                        <tbody>
                        {
                            mealTimes?.map((item, index) =>
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    {getRoleStorage() === "ROLE_ADMIN" ? <td>
                                        <Button variant='outline-info' size='sm'
                                                onClick={() => onClickDepartment(item, 1)}>
                                            O'zgartirish
                                        </Button>
                                    </td> : null}
                                    {getRoleStorage() === "ROLE_ADMIN" ? <td>
                                        <Button variant='outline-danger' size='sm'
                                                onClick={() => onClickDepartment(item, 2)}>
                                            O'chirish
                                        </Button>
                                    </td> : null}
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={submitMealTime}>
                    <Modal.Header closeButton>
                        <Modal.Title>{mealTimeState.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Label style={{color: "#00b2ff"}}>Nomi</Form.Label>
                        <Form.Control name='name' required value={mealTimeState.name} onChange={onChanges("name")}
                                      placeholder="Nomi "/>
                        <br/>
                        <CheckBoxCustom2 name={"name"}
                                         list={mealTimeState?.ageGroupList}
                                         getChecked={getChecked} allChecked={allChecked}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleClose}>
                            Ortga
                        </Button>
                        <Button variant="primary" type='submit'>
                            Tayyor
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
}

export default MealTime;