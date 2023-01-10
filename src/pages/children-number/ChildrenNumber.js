import React from 'react';
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addKidsNumber, editKidsNumber, getKidsNumberOne, verifide} from "./ChildrenNumberReducer";
import {Col, Container, Form, Row} from "react-bootstrap";
import {TimestampToInputDate} from "../funcs/Funcs";
import {getAge} from "../age/AgeReducer";
import {getRoleStorage} from "../more/Functions";

function ChildrenNumber() {
    const [childrenState, setChildrenState] = useState();
    const [editState, setEditState] = useState(true);
    const [params, setParams] = useState({date: Date.now()});
    const kidsNumber = useSelector(state => state.kidsNumber.kidsNumber)
    const result = useSelector(state => state.kidsNumber.result)
    const ages = useSelector(state => state.age.ages)
    const dispatch = useDispatch();
    const firstUpdate = useRef(false);

    useEffect(() => {
        if (!firstUpdate.current) {

        } else {
            setChildrenState(true);
            dispatch(getKidsNumberOne(params));
        }
    }, [result]);

    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getKidsNumberOne(params));
            dispatch(getAge());
        } else {
            setEditState(true);
            setChildrenState(kidsNumber);
        }
    }, [kidsNumber]);

    const getKinderWithDate = (e) => {
        // console.log(new Date(e.target.value).getTime());
        // console.log(params,"params");
        dispatch(getKidsNumberOne({date: new Date(e.target.value).getTime()}))
        setParams({...params, date: new Date(e.target.value).getTime()});
        setChildrenState({...childrenState, date: new Date(e.target.value).getTime()})
    }
    const makeAgeGroup = () => {
        let subDTO = ages.map((age, index) => {
                return {...age, number: 0, ageGroupId: age.ageGroupId, ageGroupName: age.name}
            }
        )
        setChildrenState({...childrenState, subDTO, date: params.date, status: "KIRITISH"});
        setEditState(false);
    }
    const onChangeKidsNumber = (index) => (e) => {
        let subDTO = [...childrenState?.subDTO];
        subDTO[index] = {...subDTO[index], number: e.target.value};
        setChildrenState({...childrenState, subDTO});
    }

    const submit = (e) => {
        e.preventDefault();
        console.log({...childrenState, date: params.date},"kidsNumber");
        if (childrenState?.id) {
            dispatch(editKidsNumber({...childrenState, date: params.date}));
        } else {
            dispatch(addKidsNumber({...childrenState, date: params.date}));
        }
    }
    const thisverifide = () => {
        dispatch(verifide(childrenState));
    }
    return (
        <div className={'figma-card'}>
            <div className={'w-100 d-flex justify-content-around align-items-center'}>
                <span style={{fontSize: 20}}>Bolalar sonini kiritish va ko'rish</span>
                <div>
                    <Form.Label>Sana</Form.Label>
                    <Form.Control type={'date'} name={'date'} value={TimestampToInputDate(params.date)}
                                  onChange={getKinderWithDate}/>
                </div>
            </div>
            <Container fluid={true}>
                <Row className={'justify-content-center mt-2'}>
                    <Col xs={12} sm={12} md={6} lg={6} xl={6} className={'p-3 shadow border-3'}>
                        <Form onSubmit={submit}>

                            {childrenState?.subDTO ? childrenState?.subDTO?.map((age, index2) =>
                                    < div key={index2} className={'infoText d-flex justify-content-between '}>
                                        <div>{age?.ageGroupName}</div>
                                        <input type="number" className={"w-25"} value={age?.number}
                                               onWheel={e => e.target.blur()} onChange={onChangeKidsNumber(index2)}
                                               disabled={editState}/>
                                    </div>
                                ) :
                                <div>
                                    <span style={{
                                        color: '#944b0f',
                                        fontSize: 25
                                    }}>
                                        Bu kunga bolalar soni kiritilmagan</span>
                                    {getRoleStorage() !== 'ROLE_RAXBAR' ?
                                        <button className={'createButtons'} onClick={() => makeAgeGroup()}>
                                            Bolalar sonini
                                            kiritish
                                        </button> : null}
                                </div>
                            }
                            {childrenState?.status === "YANGI" && getRoleStorage() !== 'ROLE_RAXBAR' && editState ?
                                <button className={'createButtons mt-3'}
                                        onClick={() => setEditState(false)}>O'zgartirish</button> : null}
                            {getRoleStorage() !== 'ROLE_RAXBAR' && !editState ?
                                <button type={'submit'} className={'createButtons mt-3'}>Tayyor</button> : null}
                            {childrenState?.id !== null && getRoleStorage() === 'ROLE_RAXBAR' && childrenState?.status !== "TASDIQLANDI" ?
                                <button onClick={() => thisverifide()}
                                        className={'createButtons mt-3'}>Tasdiqlash</button> : null}
                        </Form>
                    </Col>

                </Row>
            </Container>
        </div>
    );
}

export default ChildrenNumber;