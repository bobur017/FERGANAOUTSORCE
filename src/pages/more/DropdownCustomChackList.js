import {Button, Dropdown, InputGroup} from "react-bootstrap";
import React, {useEffect, useMemo, useState} from 'react';
import Form from 'react-bootstrap/Form';
import {toast} from "react-toastify";
import {ImBin} from "react-icons/im";

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = React.forwardRef(({children, onClick}, ref) => (
    <Button
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
        variant={'outline-dark'}
        size={'sm'}
        className={"shadow"}
    >
        {children}
    </Button>
));

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = React.forwardRef(
    ({children, style, className, 'aria-labelledby': labeledBy}, ref) => {
        const [value, setValue] = useState('');

        return (
            <div
                ref={ref}
                style={style}
                className={className}
                aria-labelledby={labeledBy}
            >
                <Form.Control
                    autoFocus
                    className="mx-3 my-2 w-auto"
                    placeholder="   Qidirish..."
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                />
                <ul className="list-unstyled">
                    {React.Children.toArray(children).filter(
                        (child) =>
                            !value || child.props.children.toLowerCase().startsWith(value),
                    )}
                </ul>
            </div>
        );
    },
);

function MyDropdown({list, name, setData, editList, param}) {
    const [lists, setLists] = useState(list);
    const [stateList, setStateList] = useState([])

    const getItem = (data) => {
        const currentList = [...stateList];
        currentList.push({...data, "productId": data.id});
        console.log("getItem")
        if (stateList?.some(item => item[param] === data[param])) {
            toast.error("Bu avval tanlangan!");
        } else {
            setData(currentList);
            setStateList(currentList);
        }
    }

    useEffect(() => {
        console.log(editList, "editList");
        // eslint-disable-next-line valid-typeof
        if (editList?.length !== 0) {
            setStateList(editList);
        }
    }, [editList]);

    const removeItem = (index) => {
        const currentList = [...stateList];
        currentList.splice(index, 1);
        setData(currentList);
        setStateList(currentList);
    }
    // const checkWeight = (index,e) => {
    //     let ok = false;
    //       console.log(stateList[index]?.weight,e.target.name,parseFloat(e.target.value).toFixed(2));
    //   if ((parseFloat(e.target.value).toFixed(2) <= parseFloat(stateList[index]?.weight).toFixed(2)) && (e.target.name === "waste")){
    //       ok = true;
    //   }else {
    //       if (parseFloat(e.target.value).toFixed(2) >= stateList[index]?.waste && stateList[index]?.weight && e.target.name !== "waste" ){
    //           console.log("oooooo")
    //           ok = true;
    //       }
    //   }
    //   return ok;
    // }
    const onChangeList = (index) => (e) => {
        // if (checkWeight(index,e)) {
            let myList = [...stateList];
            myList[index] = {...myList[index], [e.target.name]: e.target.value}
            setData(myList);
            setStateList(myList);
        // }else {
        //     toast.error("Chiqidli mahsulotning miqdori chiqidsizning miqdoridan katta yoki teng");
        // }
    }

    return (
        <>
            <Dropdown>
                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                    {name}
                </Dropdown.Toggle>
                <Dropdown.Menu as={CustomMenu}>
                    {
                        lists?.map((item, index) =>
                            <Dropdown.Item key={index} value={item.id}
                                           onClick={() => getItem(item)}>{item?.name}</Dropdown.Item>
                        )
                    }
                </Dropdown.Menu>
            </Dropdown>
            <div className={'d-flex justify-content-between'}>
                <span></span>
                <span className={"d-flex justify-content-center w-50"}>
                    <span>Chiqidli</span>
                    <span className={'mx-5'}>Chiqidsiz</span>
                </span>
            </div>
            {
                stateList?.map((item, index) =>
                    <span key={index}>
                    <InputGroup size="sm" className="mb-2">
                        <InputGroup.Text id="inputGroup-sizing-sm" style={{width: '50%'}}>{item.name}</InputGroup.Text>
                        <Form.Control type={'number'} step={"0.01"} required name={"weight"} size={'sm'}
                                      value={item.weight ? item.weight : ""} onWheel={(e) => e.target.blur()}
                                      onChange={onChangeList(index)} placeholder={"vazni"}/>
                        <Form.Control type={'number'} step={"0.01"} required name={"waste"} size={'sm'}
                                      value={item?.waste ? item?.waste : ""} onWheel={(e) => e.target.blur()}
                                      onChange={onChangeList(index)} placeholder={"vazni"}/>
                        <InputGroup.Text><Button variant={'danger'} size={'sm'}
                                                 onClick={() => removeItem(index)}><ImBin/></Button> </InputGroup.Text>
                    </InputGroup>
                    </span>
                )
            }
        </>
    );
}

export default MyDropdown;