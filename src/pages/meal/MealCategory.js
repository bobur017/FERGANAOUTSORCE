import React from 'react';
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addMealCategory, deleteMealCategory, editMealCategory, getMealCategory} from "./MealCategoryReducer";
import {Button, Col, Form, Modal, Row, Table} from "react-bootstrap";
import NavbarHeader from "../more/NavbarHeader";
import MoreButtons from "../more/MoreButtons";
import {BiEdit} from "react-icons/bi";
import {MdOutlineDeleteForever} from "react-icons/md";
import {getRoleStorage} from "../more/Functions";


function MealCategory() {
    const [show, setShow] = useState(false);
    const [mealCategoryState, setMealCategoryState] = useState({id: '', name: ''});
    const [mealCategories, setMealCategories] = useState([]);
    const [mealActive, setMealActive] = useState();
    const handleClose = () => {
        setShow(false);
        setMealCategoryState({id: '', name: ''});
    };
    const handleShow = () => {
        setShow(true)
    };


    const dispatch = useDispatch();
    const firstUpdate = useRef(false);
    const mealCategory = useSelector(state => state.mealCategory)


    useEffect(() => {
        if (firstUpdate.current) {
            dispatch(getMealCategory());
            handleClose();
        }
    }, [mealCategory.result])


    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getMealCategory());
        }
    }, [])

    useEffect(() => {
        setMealCategories(mealCategory.mealCategories);
    }, [mealCategory.mealCategories]);

    const submitMealCategory = (e) => {
        e.preventDefault();
        if (mealCategoryState.id !== '') {
            dispatch(editMealCategory(mealCategoryState));
        } else {
            dispatch(addMealCategory(mealCategoryState))
        }
    }

    const onChanges = (param) => (e) => {
        setMealCategoryState({...mealCategoryState, [param]: e.target.value});
    }
    const getDate = (index, data) => {
        if (index === 0) {
            setMealCategoryState(data);
            handleShow();
        } else {
            dispatch(deleteMealCategory(data));
        }
        setMealActive(null);
    }

    return (
        <div className={'allMain'}>
            <NavbarHeader name={"Taom turilari"} handleShow={handleShow}
                          buttonName={getRoleStorage() === "ROLE_ADMIN" ? "Taom turini qo'shish" : ""}/>
            <br/>
            <div className={'figma-card'}>

                <div className={'tableCalendar'}>
                    <table style={{color: 'black'}}>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Nomi</th>
                            {getRoleStorage() === "ROLE_ADMIN" ? <th>Yana</th> : null}
                        </tr>
                        </thead>
                        <tbody>
                        {
                            mealCategories?.map((item, index) =>
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>

                                    {getRoleStorage() === "ROLE_ADMIN" ? <td>
                                        <MoreButtons list={[{
                                            name: "O'zgartirish",
                                            data: item,
                                            icon: <BiEdit size={20}/>
                                        }, {
                                            name: "O'chirish",
                                            data: item,
                                            icon: <MdOutlineDeleteForever color={'red'} size={20}/>
                                        }]} getDate={getDate} setActive={setMealActive}
                                                     active={mealActive?.id === item.id} data={item}/>
                                    </td> : null}

                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={submitMealCategory}>
                    <Modal.Header closeButton>
                        <Modal.Title>{mealCategoryState.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Control name='name' required value={mealCategoryState.name} onChange={onChanges("name")}
                                      placeholder="Nomi "/>
                        <br/>
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

export default MealCategory;