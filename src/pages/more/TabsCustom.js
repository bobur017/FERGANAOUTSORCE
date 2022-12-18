import React, {useState} from 'react';
import {useMediaQuery} from "react-responsive";

function TabsCustom({listTabs, currentTabs}) {
    const isBigScreen = useMediaQuery({query: '(max-width: 576px)'});
    const [current, setCurrent] = useState(0);
    const changeCurrent = (num) => {
        setCurrent(num);
        currentTabs(num);
    }

    return (
        <div className={'allMain'}>
            <div className={'d-flex lineFromNavs'}>
                {
                    listTabs?.map((item, index) =>
                        <div key={index} className={`mx-2 myNavs`} onClick={() => changeCurrent(index)}>
                            <span style={current === index ? {
                                color: '#48B1AB',
                                fontSize: isBigScreen ? 10 : ''
                            } : {color: '#777B82', fontSize: isBigScreen ? 10 : ''}}>{item.name}</span>
                            <div style={current === index ? {} : {display: 'none'}} className={'myLineNavs'}></div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default TabsCustom;