import React, {useEffect, useState} from 'react';
import {FormCheck, ToggleButton} from "react-bootstrap";
import {forEach} from "react-bootstrap/ElementChildren";
import CheckedMttComponent from "../mtt/CheckedMttComponent";
import CheckedMttComponent2 from "../mtt/CheckedMttComponent2";

function CheckBoxCustom({list, getChecked, name, allChecked,clickItem}) {
    const [checked, setChecked] = useState(false);
    const [activeItem, setActiveItem] = useState(false);
    const checkedItem = (data, checked, index) => {
        getChecked(data, checked, index);
    }
    const onClicked = (data,index) => {
        if (data === activeItem) {
            setActiveItem(null);
        } else {
            clickItem(data,index);
            setActiveItem(data);
        }
    }
    const allCh = (checkedThis) => {
        setChecked(checkedThis);
        allChecked(checkedThis);
    }

    return (
        <div>
            <br/>
            <ToggleButton
                className="mb-2"
                type="checkbox"
                variant={checked ? "outline-primary" : "outline-secondary"}
                checked={checked}
                onClick={() => allCh(!checked)} value={"1"}>
                Hammasini belgilash
            </ToggleButton>
            <br/>
            {
                list?.map((item, index) =>
                    <CheckedMttComponent2 item={item} key={index} getChange={checkedItem} name={name} index={index}
                                         active={activeItem === item} onClickName={onClicked}/>
                )
            }
        </div>
    );
}

export default CheckBoxCustom;