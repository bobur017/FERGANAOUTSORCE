import React, {useEffect, useState} from 'react';
import {FormCheck, ToggleButton} from "react-bootstrap";
import {forEach} from "react-bootstrap/ElementChildren";
import CheckedMttComponent from "../mtt/CheckedMttComponent";

function CheckBoxCustom({list, getChecked, name, allChecked}) {
    const [checked, setChecked] = useState(false);

    const checkedItem = (data, checked,index) => {
        getChecked(data, checked,index);
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
                    <CheckedMttComponent item={item} key={index} getChange={checkedItem} name={name} index={index}/>
                )
            }
        </div>
    );
}

export default CheckBoxCustom;