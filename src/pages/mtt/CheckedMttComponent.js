import React from 'react';
import main from "../relationMultiMenu/relationStyle.module.scss";
import {GoCheck} from "react-icons/go";

function CheckedMttComponent({item, getChange, name ,index}) {
    return (
        <div className={main.main}>
            <div className={`d-flex p-2 mt-1 ${main.district}`}
                 style={{backgroundColor: 'white', position: 'relative'}}>
                <div style={{
                    color: item?.checked ? '#8CC152' : '#E9573F',
                    paddingLeft: 10,
                    borderColor: item?.checked ? '#8CC152' : '#E9573F'
                }}
                     className={`d-flex justify-content-center align-items-center ${main.leftLine}`}>
                    <div className={main.dotIcon}
                         onClick={() => getChange(item, !item.checked,index)}
                         style={{borderColor: item?.checked ? '#8CC152' : '#E9573F', cursor: 'pointer'}}>
                        {item.checked ?
                            <GoCheck color={item?.checked ? '#8CC152' : '#E9573F'}/> : null}
                    </div>
                </div>
                <div className={'mx-2'}>{item.number ? item.number : ''}{item[name]}</div>
            </div>
        </div>
    );
}

export default CheckedMttComponent;