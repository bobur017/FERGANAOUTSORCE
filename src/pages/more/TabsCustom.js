import React, {useState} from 'react';

function TabsCustom({listTabs, currentTabs}) {
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
                            <span style={current === index ? {color: '#48B1AB'} : {color: '#777B82'}}>{item.name}</span>
                            <div style={current === index ? {} : {display: 'none'}} className={'myLineNavs'}></div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default TabsCustom;