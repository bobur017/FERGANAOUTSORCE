import React, {useState} from 'react';
import './product.css'
import ProductList from "./ProductList";
import ProductCategory from "./ProductCategory";
import Sanpin from "./Sanpin";
import NavbarHeader from "../more/NavbarHeader";

const Product = () => {

    const [current, setCurrent] = useState(0);
    return (
        <div className={'allMain'}>
            <NavbarHeader name={"Mahsulotlar bo'limi"} buttonName={null}
                          navs={[{name: "Mahsulotlar"}, {name: "Mahsulot turlari"}, {name: 'SANPIN meyor'}]} currentNavs={setCurrent}/>

            <div className={'card mt-3'}>
                {current === 0 ? <ProductList/> : null}
                {current === 1 ? <ProductCategory/> : null}
                {current === 2 ? <Sanpin/> : null}
            </div>
        </div>
    );
};

export default Product;