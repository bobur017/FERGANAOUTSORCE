import React from 'react';
import {Col, Container, Form, Row} from "react-bootstrap";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import DropdownCustom from "../more/DropdownCustom";
import {checkCalendar, getMultiMenu} from "../multimenu/MultiMenuReducer";
import main from './relationStyle.module.scss'
import SearchSelect from "../more/SearchSelect";
import {AiOutlineCheck, AiOutlineClose} from "react-icons/ai";

function RelationMenu(props) {

    const customMenus = [
        {name: "aaaaaaaaaaaaa"},
        {name: "bbbbbbbbbbbb"},
        {name: "ccccccccccccc"},
        {name: "dddddddddddddd"},
        {name: "eeeeeeeeeeeeee"},
        {name: "ffffffffffffff"},
    ]
    const [multiMenuState, setStateMultiMenu] = useState({name: 'Menuni tanlang'});
    const [searchOpen, setSearchOpen] = useState(false)
    const dispatch = useDispatch();
    const multiMenuList = useSelector(state => state.multiMenu.multiMenuList);
    const firstUpdate = useRef(false);
    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getMultiMenu());
            dispatch(checkCalendar({month:12}));
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
                    <button className={main.buttonClose}><AiOutlineClose size={25}/><span className={'mx-2'}>Bekor qilish</span></button>
                    <button className={main.buttonSuccess}><AiOutlineCheck size={25}/><span  className={'mx-2'}>Tayyor</span></button>
                </Col>
            </Row>
            <Row>
                <Col xs={12} sm={12} md={12} lg={7} xl={7}>

                </Col>
                <Col xs={12} sm={12} md={12} lg={5} xl={5}>

                </Col>
            </Row>
        </Container>
    );
}

export default RelationMenu;