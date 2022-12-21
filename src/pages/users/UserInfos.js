import React from 'react';
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUserData} from "./UserReducer";
import {Col, Container, Row} from "react-bootstrap";
import NavbarHeader from "../more/NavbarHeader";

function UserInfos() {
    const [state, setState] = useState();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.userData)
    const firstUpdate = useRef(false);

    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getUserData());
        } else {
            console.log(user, "user");
        }
    }, [user]);

    return (
        <Container fluid>
            <NavbarHeader name={"Ma'lumotlar"}/>
            <Row className={'mt-3'}>
                <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                    <div className={'figma-card-first'}>
                        <div className={"my-4 fs-3 text-center fw-bolder"}>Mening ma'lumotlarim</div>
                        <div className={'infoText'}>
                            <div>Ismi</div>
                            <div>{user?.name}</div>
                        </div>
                        <div className={'infoText'}>
                            <div>Familyasi</div>
                            <div>{user?.surname}</div>
                        </div>
                        <div className={'infoText'}>
                            <div>Sharifi</div>
                            <div>{user?.fatherName}</div>
                        </div>
                        <div className={'infoText'}>
                            <div>Manzili</div>
                            <div>{user?.departmentName}</div>
                        </div>
                        <div className={'infoText'}>
                            <div>Telefon raqami</div>
                            <div>{user?.phoneNumber}</div>
                        </div>
                        <div className={'infoText'}>
                            <div>Lavozimi</div>
                            <div>{user?.positionName}</div>
                        </div>
                        <div className={'infoText'}>
                            <div>Login</div>
                            <div>{user?.username}</div>
                        </div>
                    </div>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6} xl={6} className={'figma-card-first d-flex justify-content-center'}>
                    <img src="https://avatars.mds.yandex.net/i?id=0213782fa2f027aab3965b1d66e913c0195b45eb-5232391-images-thumbs&n=13&exp=1" alt="" width={"70%"}/>
                </Col>
            </Row>
        </Container>
    );
}

export default UserInfos;