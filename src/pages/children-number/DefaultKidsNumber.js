import React from 'react';
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getDepartment} from "../departments/RegionDepartmentReducer";
import DistrictStyle from "../more/DistrictStyle";
import NavbarHeader from "../more/NavbarHeader";
import {Col, Row} from "react-bootstrap";
import {getDefaultKidsNumbers} from "./ChildrenNumberReducer";

function DefaultKidsNumber(props) {
    const [params, setParams] = useState({pageSize:20,page:0,departmentId:''});
    const dispatch = useDispatch();
    const kidsNumberDefault = useSelector(state => state.kidsNumber.kidsNumberDefault)
    const departments = useSelector(state => state.department.departments);
    const firstUpdate = useRef(false);

    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getDepartment());
        }
    }, []);

    const getDistrict = (data) => {
        console.log(data)
        let thisParams = {...params,departmentId:data?.id};
        dispatch(getDefaultKidsNumbers(thisParams));
        setParams(thisParams);
    }

    return (
        <div>
            <NavbarHeader name={"O'rtacha bolalar soni"}/>
            <Row>
                <Col sm={6} md={6} lg={5} xl={5} className={"figma-card-first mt-3"}>
                    <Row>
                        <Col sm={6} md={6} lg={6} xl={6}>
                            <DistrictStyle list={departments} getData={getDistrict}/>
                        </Col>
                        <Col sm={6} md={6} lg={6} xl={6}>
                            <DistrictStyle list={departments} getData={getDistrict}/>
                        </Col>
                    </Row>
                </Col>
                <Col sm={6} md={6} lg={7} xl={7}>
                    <div  className={"figma-card-first mt-3"}>
                        
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default DefaultKidsNumber;