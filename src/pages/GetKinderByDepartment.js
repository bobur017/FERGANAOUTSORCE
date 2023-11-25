import React from 'react';
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import main from "./relationMultiMenu/relationStyle.module.scss";
import {AiOutlineEnvironment} from "react-icons/ai";
import {getByDepartmentMtt} from "./mtt/MttReducer";
import {getDepartment} from "./departments/RegionDepartmentReducer";

function GetKinderByDepartment({getDepartmentId,getKinderId}) {
    const dispatch = useDispatch();
    const departments = useSelector(state => state.department.departments);
    const firstUpdate = useRef(false);
    const mtts = useSelector(state => state.mtt.mtts);
    const [departmentId, setDepartmentId] = useState();
    const [kindergarten, setKindergarten] = useState();

    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getDepartment());

        }else {

        }
    }, []);
    const getMttsByDepartment2 = (data) => {
        getDepartmentId(data);
        setDepartmentId(data);
        dispatch(getByDepartmentMtt(data.id))
    }

    const getKindergartenDays = (data) => {
        getKinderId(data);
        setKindergarten(data);
    }

    return (
        <div className={`figma-card-first d-flex justify-content-between p-1 ${main.main}`} style={{overflowY:'auto'}}>
            <div className={'w-50'}>
                <div className={`${main.card}`} style={{backgroundColor: '#FFFFFF'}}>
                    {
                        departments?.map((item, index) =>
                            <div key={index}
                                 className={`d-flex justify-content-between align-items-center  p-2 mt-1 my-Hover ${main.district}`}
                                 style={{backgroundColor: departmentId?.id !== item?.id ? 'white' : '#48B1AB'}}>
                                <div className={`d-flex`}
                                     onClick={() => getMttsByDepartment2(item)}>
                                    <div style={{
                                        color: departmentId?.id !== item.id ? '#48B1AB' : 'white',
                                        paddingLeft: 10,
                                        borderColor: departmentId?.id !== item.id ? '#48B1AB' : 'white'
                                    }}
                                         className={main.leftLine}>
                                        <AiOutlineEnvironment
                                            size={30}/>
                                    </div>
                                    <div className={'mx-2'}
                                         style={{color: departmentId?.id === item.id ? 'white' : '#000'}}>{item?.name?.substring(0, 15)}{item?.name?.length > 10 ? "..." : ""}</div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            <div  style={{maxHeight:'80vh'}} className={'px-2 w-50'}>
                <div className={`${main.card}`} style={{backgroundColor: '#FFFFFF'}}>
                    {
                        mtts?.map((item, index) =>
                            <div key={index} className={`d-flex p-2 mt-1 ${main.district}`}
                                 style={item.id === kindergarten?.id ? {
                                     backgroundColor: '#48B1AB',
                                     cursor: 'pointer',
                                     position: 'relative',
                                     color: 'white'
                                 } : {
                                     backgroundColor: 'white',
                                     cursor: 'pointer',
                                     position: 'relative'
                                 }}
                                 onClick={() => getKindergartenDays(item)}>
                                <div style={{
                                    color: item.id !== kindergarten?.id ? '#48B1AB' : 'white',
                                    paddingLeft: 10,
                                    borderColor: item.id !== kindergarten?.id ? '#48B1AB' : 'white'
                                }}
                                     className={`d-flex justify-content-center align-items-center ${main.leftLine}`}>
                                    <div className={main.dotIcon}
                                         style={{borderColor: item.id !== kindergarten?.id ? '#48B1AB' : 'white'}}>
                                    </div>
                                </div>
                                <div className={'mx-2'}>{item.name}</div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default GetKinderByDepartment;