import React, {useState} from 'react';
import main from "../relationMultiMenu/relationStyle.module.scss";
import {BsHouseDoor} from "react-icons/bs";

function DistrictStyle({list, getData,subItem,subItemName}) {
    const [currentData, setCurrentData] = useState();
    const getMttsByDepartment2 = (data) => {
        setCurrentData(data);
        getData(data);
    }
    return (
        <div>{
            list?.map((item, index) =>
                <div key={index}
                     className={`d-flex justify-content-between align-items-center  p-2 mt-1 my-Hover district`}
                     style={{backgroundColor: currentData?.id !== item?.id ? 'white' : '#48B1AB', position: 'relative'}}>
                    <div className={`d-flex`}
                         onClick={() => getMttsByDepartment2(item)}>
                        <div style={{
                            color: currentData?.id !== item.id ? '#48B1AB' : 'white',
                            paddingLeft: 10,
                            borderColor: currentData?.id !== item.id ? '#48B1AB' : 'white'
                        }}
                             className={main.leftLine}>
                            <BsHouseDoor
                                size={30}/>
                        </div>
                        <div className={'mx-2'}
                             style={{color: currentData?.id === item.id ? 'white' : '#000'}}>{item?.number}{item?.name?.substring(0, 15)}{item?.name?.length > 10 ? "..." : ""}</div>
                    </div>
                    {subItem ? <div style={{
                        position: 'absolute',
                        bottom: 1,
                        right: 4,
                        fontSize: 10,
                        color: '#737373'
                    }}>{ item[subItemName] ? <span style={{color:'green'}}>Kiritilgan</span>:<span style={{color:'red'}}>Kiririlmagan</span>}</div>:null}
                </div>
            )
        }</div>
    );
}

export default DistrictStyle;