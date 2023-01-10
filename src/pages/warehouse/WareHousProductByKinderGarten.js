import React from 'react';
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import FromPageSizeBottom from "../fromPage/FromPageSizeBottom";
import {Col, Container, Row} from "react-bootstrap";
import {getWarehouse} from "./WarehouseReducer";
import {getGetFiles} from "../getFiles/GetFilesReducer";
import GetKinderByDepartment from "../GetKinderByDepartment";
import NavbarHeader from "../more/NavbarHeader";

function WareHousProductByKinderGarten(props) {
    const [params, setParams] = useState({pageSize: 10, pageNumber: 0, kindergartenId: ''})
    const dispatch = useDispatch();
    const firstUpdate = useRef(false);
    const warehouses = useSelector(state => state.warehouse.warehouses);

    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
        }
    }, []);
    const getPdf = (e) => {
        dispatch(getGetFiles(params));
    }
    const changePage0 = (pageNumber) => {
        dispatch(getWarehouse({pageNumber, pageSize: 10}));
        setParams({...params, pageNumber});
    }
    const getDepartmentId = (data) => {

    }
    const getKinderId = (data) => {
        dispatch(getWarehouse({...params, getKinderId: data?.id}));
    }
    return (
        <Container fluid={true}>
            <NavbarHeader name={"Ombordagi qoldiqlar "}/>
            <Row className={'mt-3'}>
                <Col>
                    <GetKinderByDepartment getDepartmentId={getDepartmentId} getKinderId={getKinderId}/>
                </Col>
                <Col className={'figma-card'}>
                    {warehouses?.list?.length > 0 ?
                        <>
                            <div className={'w-100 d-flex justify-content-end'}>
                                <button className={'buttonPdf my-2'} onClick={getPdf}>PDF</button>
                            </div>
                            <div className={'tableCalendar'}>
                                <table>
                                    <thead>
                                    <tr>
                                        <th>№</th>
                                        <th>Mahsulot nomi</th>
                                        <th>Miqdor</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        warehouses?.list?.map((product, index) =>
                                            <tr key={index} style={{cursor: 'pointer'}}>
                                                <td>{index + 1}</td>
                                                <td>{product.productName}</td>
                                                <td>{product.weight}</td>
                                            </tr>
                                        )
                                    }
                                    </tbody>
                                </table>
                                <br/>
                                <FromPageSizeBottom currentPage={warehouses?.getPageNumber}
                                                    pageSize={warehouses?.getPageSize} changesPage={changePage0}
                                                    allPageSize={warehouses?.allPageSize}/>
                            </div>
                        </>
                        : !warehouses?.list ? <div className={"text-center"}>Ma'lumotlar mavjud emas</div>:<div className={"text-center"}>Omborda mahsulot mavjud emas</div>}
                </Col>

            </Row>
        </Container>
    );
}

export default WareHousProductByKinderGarten;