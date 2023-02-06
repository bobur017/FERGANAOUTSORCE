import React from 'react';
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getDepartment} from "../departments/RegionDepartmentReducer";
import NavbarHeader from "../more/NavbarHeader";
import {Col, Container, Row} from "react-bootstrap";
import DistrictStyle from "../more/DistrictStyle";
import {getByDepartmentMtt} from "../mtt/MttReducer";
import KindergartenStyle from "../more/KindergartenStyle";
import ProductFromAdd from "../product/ProductFromAdd";

function AddProductToWarehouse() {
    const [Kindergarten, setKindergarten] = useState();
    const dispatch = useDispatch();
    const departments = useSelector(state => state.department.departments);
    const mtts = useSelector(state => state.mtt.mttsByDepartment);
    const firstUpdate = useRef(false);
    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getDepartment())
        }
    }, []);

    const getOneDistrict = (data) => {
        dispatch(getByDepartmentMtt(data.id));
    }
    const getOneMtt = (data) => {
      setKindergarten(data);
    }
    return (
        <div className={"mt-3"}>
            <Container fluid={true}>
                <Row>
                    <Col sm={6} md={6} className={"d-flex figma-card-first"}>
                        <div className={"mx-1"}>
                            <DistrictStyle list={departments} getData={getOneDistrict}/>
                        </div>
                        <div>
                            <KindergartenStyle list={mtts} getData={getOneMtt}/>
                        </div>
                    </Col>
                    <Col sm={6} md={6}>
                        <div className={"figma-card"}>
                        <ProductFromAdd/>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default AddProductToWarehouse;