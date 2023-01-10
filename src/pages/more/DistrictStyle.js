import React, {useState} from 'react';
import main from "../relationMultiMenu/relationStyle.module.scss";
import {AiOutlineEnvironment} from "react-icons/ai";

function DistrictStyle({list, getData}) {
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
                     style={{backgroundColor: currentData?.id !== item?.id ? 'white' : '#48B1AB'}}>
                    <div className={`d-flex`}
                         onClick={() => getMttsByDepartment2(item)}>
                        <div style={{
                            color: currentData?.id !== item.id ? '#48B1AB' : 'white',
                            paddingLeft: 10,
                            borderColor: currentData?.id !== item.id ? '#48B1AB' : 'white'
                        }}
                             className={main.leftLine}>
                            <AiOutlineEnvironment
                                size={30}/>
                        </div>
                        <div className={'mx-2'}
                             style={{color: currentData?.id === item.id ? 'white' : '#000'}}>{item?.name?.substring(0, 15)}{item?.name?.length > 10 ? "..." : ""}</div>
                    </div>
                </div>
            )
        }</div>
    );
}

export default DistrictStyle;