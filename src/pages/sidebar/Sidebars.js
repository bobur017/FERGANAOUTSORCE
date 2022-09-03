import React from 'react';
import Sidebar from "../components/Sidebar";
import {Route, Routes} from "react-router-dom";
import Dashboard from "./Dashboard";
import About from "./About";
import Comment from "./Comment";
import Analytics from "./Analytics";
import Product from "./Product";
import ProductList from "./ProductList";
import {Container, Nav, Navbar, Row} from "react-bootstrap";
import logo from "../login/image/img.png"

function Sidebars() {
    return (<div>
            <Navbar bg="light">
                <Container fluid={true}>
                    <Navbar.Brand>
                        <img src={logo} alt="" width={60} height={60}/>
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link>Farg`ona viloyat
                            <br/>
                            maktabgacha
                            ta`lim boshqarmasi
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <Sidebar>
                <Routes>
                    <Route path="/" element={<Dashboard/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/comment" element={<Comment/>}/>
                    <Route path="/analytics" element={<Analytics/>}/>
                    <Route path="/product" element={<Product/>}/>
                    <Route path="/productList" element={<ProductList/>}/>
                </Routes>
            </Sidebar>
        </div>);
}

export default Sidebars;