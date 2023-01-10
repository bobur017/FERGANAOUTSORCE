import React from 'react';
import {BiDotsVerticalRounded} from "react-icons/bi";
function MoreButtons({active,setActive, list, getDate,data}) {


    return (
        <button className={'myDots'}
                onBlur={() => setActive(null)}
                onFocus={() => setActive(data)}
        >
            <BiDotsVerticalRounded size={25}/>
            {
                active ? <div className={'more shadow'} style={{right:15}}>
                    {list.map((item, index) =>
                        < div className={'sub-more'}
                              key={index}
                              onClick={() => getDate(index,item?.data)}>
                            {item.icon}
                            <span>{item?.name}</span>
                        </div>
                    )
                    }
                </div> : null
            }
        </button>
    );
}
export default MoreButtons;