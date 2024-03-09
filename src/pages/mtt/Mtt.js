import React, {useMemo} from 'react';
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Col, Form, Modal, Row, Table} from "react-bootstrap";
import {addMtt, deleteMtt, editMtt, getMtt} from "./MttReducer";
import {getDepartment} from "../departments/RegionDepartmentReducer";
import NavbarHeader from "../more/NavbarHeader";
import FromPageSizeBottom from "../fromPage/FromPageSizeBottom";


function Mtt() {
    const [show, setShow] = useState(false);
    const [mttState, setMttState] = useState({id: '', name: '', departmentId: '', number: '', street: ''});
    const [mtts, setMtts] = useState([]);
    const [mttNumber, setMttNumber] = useState(null);
    const [pageSize, setPageSize] = useState(20);
    const [mttPage, setMttPage] = useState(0);
    const [regionId, setRegionId] = useState(null);
    const handleClose = () => {
        setShow(false)
    };
    const handleShow = () => setShow(true);
    const dispatch = useDispatch();
    const firstUpdate = useRef(false);
    const mtt = useSelector(state => state.mtt)
    const departments = useSelector(state => state.department.departments);


    useEffect(() => {
        if (firstUpdate.current) {
            dispatch(getMtt());
            handleClose();
        }
    }, [mtt.result]);

    useMemo(() => {
        setMtts(mtt.mtts);
    }, [mtt.mtts]);

    useMemo(() => {
        setMttState(mttState);
    }, [mttState]);

    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getMtt());
            dispatch(getDepartment())
        }
    }, [])

    const submitMtt = (e) => {
        e.preventDefault();
        if (mttState.id !== '') {
            dispatch(editMtt(mttState));
        } else {
            dispatch(addMtt(mttState))
        }
    }

    const setNullDataToState = () => {
        setMttState({id: '', name: '', departmentId: '', number: '', street: ''})
        handleShow();
    }
    const onClickDepartment = (data, number) => {
        if (number === 1) {
            setMttState(data);
            handleShow();
        } else if (number === 2) {
            dispatch(deleteMtt(data));
        }
    }
    const submitSearch = (e) => {
        e.preventDefault();
        dispatch(getMtt({
            departmentId: regionId,
            number: mttNumber,
            pageNumber: mttPage,
            pageSize: pageSize
        }));
    }

    const onChangesDepartments = (e) => {
        setRegionId(e.target.value);
    }
    const onChanges = (e) => {
        setMttState({...mttState, [e.target.name]: e.target.value});
    }

    const numchange = (e) => {
        if (e.target.value) {
            setMttNumber(parseInt(e.target.value));
        } else {
            setMttNumber(null);
        }
    }
    const pageChanges = (number) => {
        dispatch(getMtt({
            departmentId: regionId,
            number: mttNumber,
            pageNumber: number,
            pageSize: pageSize
        }));
    }

    return (
        <div className={'allMain'}>
            <NavbarHeader name={"Magtabgacha ta'lim muassasalar bo'limi"} buttonName={"MTT qo'shish"}
                          handleShow={setNullDataToState}/>
            <br/>
            <Form onSubmit={submitSearch}>
                <Row className="mb-3 d-flex justify-content-center">
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Tumanlar</Form.Label>
                        <Form.Select name={"regionId"} onChange={onChangesDepartments}>
                            <option value={''}>Barcha bo'limlar</option>
                            {
                                departments?.map((item, index) =>
                                    <option key={index} selected={regionId === item.id}
                                            value={item.id}>{item.name}</option>
                                )
                            }
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Bog'cha raqami</Form.Label>
                        <Form.Control name={"kinderGartenNumber"} value={mttNumber} type={'number'}
                                      onWheel={e => e.target.blur()}
                                      onChange={numchange}/>
                    </Form.Group>
                    <Col className={'d-flex justify-content-center align-items-end'}>
                        <Button variant="success" type="submit">
                            Qidirish
                        </Button>
                        <Form.Group controlId="formGridState" className={'mx-4'}>
                            <Form.Label>Ma'lumotlar sizg'imi</Form.Label>
                            <Form.Select name={"pageSize"} onChange={(e) => setPageSize(e.target.value)}
                                         defaultValue={null}>
                                <option value={20}>20 qator</option>
                                <option value={30}>30 qator</option>
                                <option value={40}>40 qator</option>
                                <option value={50}>50 qator</option>
                            </Form.Select>
                        </Form.Group>

                    </Col>
                </Row>
            </Form>
            <div className={'figma-card'}>
                <div className={'tableCalendar'}>
                    <table className='text-center'>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Nomi</th>
                            <th>Tumani</th>
                            <th>Manzili</th>
                            <th>Holati</th>
                            <th>O'zgartirish</th>
                            <th>O'chirish</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            mtts?.list?.map((item, index) =>
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.departmentName}</td>
                                    <td>{item.street}</td>
                                    <td>{item.status}</td>
                                    <td>
                                        <Button variant='outline-info' size='sm'
                                                onClick={() => onClickDepartment(item, 1)}>
                                            O'zgartirish
                                        </Button>
                                    </td>
                                    <td>
                                        <Button variant='outline-danger' size='sm'
                                                onClick={() => onClickDepartment(item, 2)}>
                                            O'chirish
                                        </Button>
                                    </td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
                <br/>
                <FromPageSizeBottom currentPage={mtts.getPageNumber} pageSize={mtts.getPageSize}
                                    allPageSize={mtts.allPageSize} changesPage={pageChanges}/>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={submitMtt}>
                    <Modal.Header closeButton>
                        <Modal.Title>{mttState.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Control name='name' required value={mttState.name} onChange={onChanges}
                                      placeholder="DMTT nomi "/>
                        <br/>
                        <Form.Control name='number' type={'number'} onWheel={(e) => e.target.blur()} required
                                      value={mttState.number} onChange={onChanges}
                                      placeholder="DMTT raqami "/>
                        <br/>
                        <Form.Control name='street' type={'text'} required value={mttState.street} onChange={onChanges}
                                      placeholder="DMTT manzil:ko'cha/mahalla "/>
                        <br/>
                        <Form.Select name={"departmentId"} value={mttState.departmentId} onChange={onChanges}>
                            <option value="DEFAULT">Bo'limni tanlang</option>
                            {
                                departments?.map((item, index) =>
                                    <option key={index} selected={mttState.departmentId === item.id}
                                            value={item.id}>{item.name}</option>
                                )
                            }
                        </Form.Select>
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

export default Mtt;