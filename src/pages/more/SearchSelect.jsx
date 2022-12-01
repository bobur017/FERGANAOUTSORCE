import React from 'react';
import main from '../relationMultiMenu/relationStyle.module.scss'
import {Form} from "react-bootstrap";
import {useState} from "react";

function SearchSelect({list, setData, itemName}) {
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchList, setSearchList] = useState(list);
    const [currentItem, setCurrentItem] = useState({[itemName]: "Tanlang"});

    const myOncklick = (data) => {
        setCurrentItem(data)
        setData(data);
    }
    const blur = (e) => {
        setTimeout(() => {
            setSearchOpen(!searchOpen);
            setSearchList(list);
        }, 300);
    }
    const focus = (e) => {
        setSearchOpen(!searchOpen);
    }
    const search = (e) => {
        setSearchList(list.filter(item => item[itemName].toLowerCase().includes(e.target.value.toLowerCase())))
    }
    return (
        <div className={`w-100 ${main.main}`}>
            <div className={main.search}>
                <Form.Control type={'text'}
                              placeholder={currentItem[itemName]}
                              onChange={search}
                              onBlur={(e) => blur(e)}
                              onFocus={(e) => focus(e)}/>
                {searchOpen ? <div className={main.subSearch}>
                    {
                        searchList?.map((item, index) =>
                            <div key={index} className={main.subSearchItems}
                                 onClick={() => myOncklick(item)}>{item[itemName]}</div>
                        )
                    }
                </div> : null}
            </div>
        </div>
    );
}

export default SearchSelect;