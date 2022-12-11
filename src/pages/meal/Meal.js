import React from 'react';
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addMeal, deleteMeal, editMeal, getMeal} from "./MealReducer";
import {Button, Col, Form, Modal, Row, Tab, Table, Tabs} from "react-bootstrap";
import {GrAdd} from "react-icons/gr";
import MealList from "./MealList";
import MealCategory from "./MealCategory";
import MealTime from "./MealTime";
import NavbarHeader from "../more/NavbarHeader";

function Meal() {
    const [current, setCurrent] = useState(0);

    return (
        <div className={'allMain'}>
            <NavbarHeader name={"Taomlar bo'limi"} buttonName={null}
                          navs={[{name: "Taomlar"}, {name: "Taom turlari"}, {name: 'Taomlanish vaqtlari'}]}
                          currentNavs={setCurrent}/>

            <div className={'card mt-3'}>
                {current === 0 ? <MealList/> : null}
                {current === 1 ? <MealCategory/> : null}
                {current === 2 ? <MealTime/> : null}
            </div>
        </div>
    );
}

export default Meal;