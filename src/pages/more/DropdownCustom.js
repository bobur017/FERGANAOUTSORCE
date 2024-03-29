import {Button, Dropdown} from "react-bootstrap";
import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';

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
                style={{...style,zIndex:100}}
                className={className}
                aria-labelledby={labeledBy}
            >
                <Form.Control
                    autoFocus
                    className="mx-3 my-2 w-auto"
                    placeholder="Qidirish..."
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                />
                <ul className="list-unstyled">
                    {React?.Children?.toArray(children)?.filter(
                        (child) =>
                            !value || child.props.children.toLowerCase().startsWith(value),
                    )}
                </ul>
            </div>
        );
    },
);

const numAndName = (name1, name2) => {
    if (name1) {
        return (name1 + name2);
    } else {
        return name2;
    }
}

function More({list, name, setData}) {
    const getItem = (data) => {
        setData(data);
    }

    return (
        <div >
            <Dropdown>
                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                    {name}
                </Dropdown.Toggle>

                <Dropdown.Menu as={CustomMenu}>
                    {
                        list?.map((item, index) =>
                            <Dropdown.Item key={index}
                                           onClick={() => getItem(item)}>{ item?.name}</Dropdown.Item>
                        )
                    }
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}

export default More;