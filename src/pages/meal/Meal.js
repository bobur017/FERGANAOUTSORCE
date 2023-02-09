import React from 'react';
import {useEffect, useRef, useState} from "react";
import MealList from "./MealList";
import MealCategory from "./MealCategory";
import MealTime from "./MealTime";
import NavbarHeader from "../more/NavbarHeader";
import {getMeal} from "./MealReducer";
import {getProduct} from "../product/ProductReducer";
import {getMealCategory} from "./MealCategoryReducer";
import {useDispatch} from "react-redux";
import {getAge} from "../age/AgeReducer";

function Meal() {
    const [current, setCurrent] = useState(0);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getProduct());
        dispatch(getMealCategory());
        dispatch(getAge());
    },[])

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