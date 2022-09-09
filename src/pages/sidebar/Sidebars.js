import React from 'react';
import Sidebar from "../components/Sidebar";
import { Route, Routes } from "react-router-dom";
import About from "./About";
import Product from "./Product";
import { Container, Nav, Navbar } from "react-bootstrap";
import logo from "../login/image/img.png"
import Admin from "./Admin";
import RegionDepartment from "./RegionDepartment";
import Age from "../age/Age";

function Sidebars() {
    return (
        <div>
            <Navbar bg="light">
                <Container fluid={true}>
                    <Navbar.Brand>
                        <img src={logo} alt="" width={60} height={60} />
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link>Farg`ona viloyat
                            <br />
                            maktabgacha
                            ta`lim boshqarmasi
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <Sidebar>
                <Routes>
                    <Route path="/about" element={<About />} />
                    <Route path="/product" element={<Product />} />
                    <Route path="/age" element={<Age />} />
                    <Route path="/admin" element={<About />} />
                    <Route path="/super-admin" element={<About />} />
                    <Route path="/region-department" element={<RegionDepartment />} />
                </Routes>
            </Sidebar>
        </div>
    );
}

export default Sidebars;