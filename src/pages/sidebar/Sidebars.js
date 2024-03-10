import React from 'react';
import Sidebar from "../components/Sidebar";
import { Link, Route, Routes } from "react-router-dom";
import About from "./About";
import Product from "../product/Product";
import { Container, Nav, Navbar } from "react-bootstrap";
import userLogo from "../image/img.png"
import RegionDepartment from "../departments/RegionDepartment";
import Age from "../age/Age";
import Department from "../departments/Department";
import Mtt from "../mtt/Mtt";
import Meal from "../meal/Meal";
import MultiMenu from "../multimenu/MultiMenu";
import MultiMenuOne from "../multimenu/MultiMenuOne";
import { TbBell } from "react-icons/tb";
import { BiMessageDetail } from "react-icons/bi";
import '../allStyle.scss';
import '../allStyle2.scss';
import Users from "../users/Users";
import MenuView from "../relationMultiMenu/MenuView";
import UsersDepartment from "../users/UsersDepartment";
import Supplier from "../supplier/Supplier";
import Price from "../price/Price";
import Contract from "../contract/Contract";
import CreateContract from "../contract/CreateContract";
import EditContract from "../contract/EditContract";
import { useMediaQuery } from "react-responsive";
import ChildrenNumber from "../children-number/ChildrenNumber";
import Warehouse from "../warehouse/Warehouse";
import GetOneDayMenu from "../report/GetOneDayMenu";
import OneDayMenu from "../multimenu/OneDayMenu";
import OneDayWithMttFromUsers from "../report/OneDayWithMttFromUsers";
import InputOutput from "../report/InputOutput";
import InputOutputFromAdmin from "../report/InputOutputFromAdmin";
import InputOutputKidsNumber from "../report/InputOutputKidsNumber";
import InputOutputKidsNumberFromAdmin from "../report/InputOutputKidsNumberFromAdmin";
import UserInfos from "../users/UserInfos";
import { useDispatch, useSelector } from "react-redux";
import WareHousProductByKinderGarten from "../warehouse/WareHousProductByKinderGarten";
import Notification from "../notification/Notification";
import SendNotifications from "../notification/SendNotifications";
import ProductPack from "../productPack/ProductPack";
import PermissionsFromRelation from "../permission/PermissionsFromRelation";
import MultiMenuOneFromOther from "../multimenu/MultiMenuOneFromOther";
import { getUserData } from "../users/UserReducer";
import { useEffect, useRef } from "react";
import KidsNumberOther from "../children-number/KidsNumberOther";
import Order from "../order/Order";
import OneOrder from "../order/OneOrder";
import ContractByOrder from "../contract/ContractByOrder";
import AddProductToWarehouse from "../warehouse/AddProductToWarehouse";
import Accountant from "../accountant/Accountant";
import LoadingPageReducer from "../loading/LoadingPageReducer";

function Sidebars() {
    const user = useSelector(state => state.user.userData)
    const isBigScreen3 = useMediaQuery({ query: '(min-width: 1090px)' });
    const isBigScreen2 = useMediaQuery({ query: '(min-width: 576px)' });
    const isBigScreen = useMediaQuery({ query: '(max-width: 576px)' });
    const dispatch = useDispatch();
    const firstUpdate = useRef(false);

    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getUserData());
        }
    }, []);

    return (
        <div className={'h-100'}>
            <Navbar bg="light" style={{ height: '10%' }}>
                {!isBigScreen ? <Container fluid={true}>
                    <div className={'d-flex justify-content-between w-100'}>
                        <div className={'d-flex '}>
                            <Navbar.Brand className={"d-flex align-items-center"}>
                                <svg width="50" height="50" viewBox="0 0 3300 3300" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="3300" height="3300" rx="700" fill="white" />
                                    <ellipse cx="1615.87" cy="1518.5" rx="1257.87" ry="1172.5" fill="#48B1AB" />
                                    <ellipse cx="1725.85" cy="1639.5" rx="1325.14" ry="1236.5" fill="white" />
                                    <path d="M2244.81 620H1876.41V1718L2244.81 1683.5V620Z" fill="#EBA73E" stroke="#EBA73E" stroke-width="5" />
                                    <path d="M2710.9 266H2342.51V1677.5C2494.39 1655.91 2574.83 1635.07 2710.9 1581V266Z" fill="#48B1AB" stroke="#48B1AB" stroke-width="5" />
                                    <path d="M1781.38 1125H1412.98V1755.5L1781.38 1724.5V1125Z" fill="#48B1AB" stroke="#48B1AB" stroke-width="5" />
                                    <path d="M1317.42 804.5H949.023V1827C1090.07 1792.57 1171.39 1779.64 1317.42 1767V804.5Z" fill="#B1B838" stroke="#B1B838" stroke-width="5" />
                                    <path d="M490.393 1997L482.93 2001.5V1421H851.322V1850C701.928 1893.56 623.271 1926.51 490.393 1997Z" fill="#48B1AB" />
                                    <path d="M482.93 1420V1421M482.93 1421V2001.5L490.393 1997C623.271 1926.51 701.928 1893.56 851.322 1850V1421H482.93Z" stroke="#48B1AB" stroke-width="5" />
                                    <path d="M364.651 2960V2523.64H662.52V2609.29H470.119V2698.78H643.557V2784.64H470.119V2960H364.651ZM715.627 2960V2523.64H1019.89V2609.29H821.096V2698.78H1004.33V2784.64H821.096V2874.35H1019.89V2960H715.627ZM1085.94 2960V2523.64H1390.2V2609.29H1191.41V2698.78H1374.65V2784.64H1191.41V2874.35H1390.2V2960H1085.94ZM1617.54 2960H1456.25V2523.64H1617.33C1661.79 2523.64 1700.07 2532.37 1732.18 2549.84C1764.42 2567.17 1789.28 2592.17 1806.75 2624.84C1824.22 2657.37 1832.96 2696.29 1832.96 2741.61C1832.96 2787.06 1824.22 2826.12 1806.75 2858.79C1789.42 2891.46 1764.63 2916.53 1732.39 2934.01C1700.14 2951.34 1661.86 2960 1617.54 2960ZM1561.72 2870.09H1613.5C1637.93 2870.09 1658.6 2865.97 1675.5 2857.73C1692.54 2849.35 1705.4 2835.78 1714.06 2817.03C1722.87 2798.14 1727.27 2773 1727.27 2741.61C1727.27 2710.21 1722.87 2685.21 1714.06 2666.61C1705.26 2647.86 1692.26 2634.36 1675.07 2626.12C1658.03 2617.74 1637 2613.55 1612 2613.55H1561.72V2870.09ZM2265.91 2523.64V2960H2176.42L2002.77 2708.15H2000V2960H1894.53V2523.64H1985.3L2157.03 2775.06H2160.66V2523.64H2265.91ZM2332.23 2960V2523.64H2636.49V2609.29H2437.7V2698.78H2620.94V2784.64H2437.7V2874.35H2636.49V2960H2332.23ZM2688.27 2609.29V2523.64H3057.09V2609.29H2924.77V2960H2820.79V2609.29H2688.27Z" fill="#48B1AB" />
                                    <path d="M246.48 2342.79L187 2394L206.07 2342.79L234.87 2293.04L275.279 2237.8L318.315 2189.51L377.794 2136.11L444.764 2084.17L497.529 2048.31L565.246 2011.75L627.71 1982.11L696.202 1953.57L797.195 1917.36L913.557 1884.06L1009.33 1859.55L1135.81 1836.15L1275.36 1817.85L1433.23 1800.67L1571.29 1786.78L1722.81 1776.89L1863.5 1764.84L2009.02 1752.38L2122.01 1741.05L2251.09 1727.87L2310.95 1719.11L2405.62 1705.19L2470.35 1693.87L2519.36 1684.71L2569.85 1671.55L2627.48 1655.09L2672.37 1639.72L2720.27 1621.42L2762.91 1599.13L2796.97 1580.83L2821.29 1566.56L2843.34 1549.73L2869.16 1527.05L2887.51 1505.46L2900.59 1488.65L2910.7 1468.17L2921.57 1446.96L2926.04 1426.09V1405.23L2921.57 1389.88L2916.31 1379.64L2906.23 1369.4L2895.36 1360.97L2880.77 1349.99L2860.95 1343.05L2840.36 1338.67L2808.19 1334.27L2786.49 1329.89L2771.51 1326.24L2806.31 1320L2834.39 1316H2870.68L2910.7 1320L2932.04 1323.67L2959.71 1329.89L2985.52 1343.05L3009.84 1360.97L3027.06 1382.94L3037.9 1401.58L3045.78 1419.88L3048.76 1439.63L3051 1484.98L3048.76 1513.51L3037.9 1553.02L3013.96 1599.48L2965.32 1661.31L2894.97 1726.06L2813.44 1778L2734.47 1820.42L2633.84 1854.45L2543.29 1878.96L2460.23 1897.98L2369.33 1914.06L2273.17 1930.9L2195.37 1945.51L2087.24 1959.43L1927.84 1974.43L1789.04 1983.21L1645.76 1992.35L1490.48 1999.67L1342.33 2010.99L1197.91 2024.53L1073.7 2037.72L941.253 2058.93L835.753 2077.96L725.36 2105.74L619.114 2138.3L509.855 2183.68L402.117 2235.61L319.061 2287.17L246.48 2342.79Z" fill="#48B1AB" stroke="#48B1AB" stroke-width="5" />
                                </svg>
                            </Navbar.Brand>
                            <Nav className="me-auto">
                                <Nav.Link>
                                    <span style={{ fontSize: isBigScreen3 ? 25 : !isBigScreen2 ? 25 : 20 }}
                                    >
                                        Feednet - ovqatlantirishni nazorat qilish tizimi!
                                        <span style={{ color: 'red', marginLeft: 4, fontSize: 15 }}> Dastur test rejimida!</span>
                                    </span>
                                </Nav.Link>
                            </Nav>
                        </div>
                        <div className={"d-flex w-25 align-items-center justify-content-around"}>
                            <div className={'p-2'}
                                style={{
                                    backgroundColor: '#eeeeee',
                                    borderRadius: "50%",
                                    cursor: 'pointer',
                                    position: 'relative'
                                }}>
                                {user?.notification !== 0 ? <span style={{
                                    paddingLeft: 2,
                                    paddingRight: 2,
                                    backgroundColor: '#f1a603',
                                    borderRadius: 30,
                                    position: 'absolute',
                                    top: -3,
                                    left: -3
                                }}>{user?.notification}</span> : null}
                                <Link
                                    to={"/sidebar/notification"} className={"link-none"}><TbBell size={25} /></Link>
                            </div>
                            <div className={'p-2'}
                                style={{ backgroundColor: '#eeeeee', borderRadius: "50%", cursor: 'pointer' }}>
                                <BiMessageDetail size={25} /></div>
                            <div className={'d-flex justify-content-between align-items-center'}>
                                <div className={'px-2'}>{user?.name?.substring(0, 1)}.{user?.surname}</div>
                                <img src={userLogo} alt="" width={35} />
                            </div>
                        </div>
                    </div>
                </Container> :
                    <Container fluid={true}>
                        <div className={'w-100 d-flex justify-content-between align-items-center'}>
                            <div className={'d-flex'}>
                            <svg width="50" height="50" viewBox="0 0 3300 3300" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="3300" height="3300" rx="700" fill="white" />
                                    <ellipse cx="1615.87" cy="1518.5" rx="1257.87" ry="1172.5" fill="#48B1AB" />
                                    <ellipse cx="1725.85" cy="1639.5" rx="1325.14" ry="1236.5" fill="white" />
                                    <path d="M2244.81 620H1876.41V1718L2244.81 1683.5V620Z" fill="#EBA73E" stroke="#EBA73E" stroke-width="5" />
                                    <path d="M2710.9 266H2342.51V1677.5C2494.39 1655.91 2574.83 1635.07 2710.9 1581V266Z" fill="#48B1AB" stroke="#48B1AB" stroke-width="5" />
                                    <path d="M1781.38 1125H1412.98V1755.5L1781.38 1724.5V1125Z" fill="#48B1AB" stroke="#48B1AB" stroke-width="5" />
                                    <path d="M1317.42 804.5H949.023V1827C1090.07 1792.57 1171.39 1779.64 1317.42 1767V804.5Z" fill="#B1B838" stroke="#B1B838" stroke-width="5" />
                                    <path d="M490.393 1997L482.93 2001.5V1421H851.322V1850C701.928 1893.56 623.271 1926.51 490.393 1997Z" fill="#48B1AB" />
                                    <path d="M482.93 1420V1421M482.93 1421V2001.5L490.393 1997C623.271 1926.51 701.928 1893.56 851.322 1850V1421H482.93Z" stroke="#48B1AB" stroke-width="5" />
                                    <path d="M364.651 2960V2523.64H662.52V2609.29H470.119V2698.78H643.557V2784.64H470.119V2960H364.651ZM715.627 2960V2523.64H1019.89V2609.29H821.096V2698.78H1004.33V2784.64H821.096V2874.35H1019.89V2960H715.627ZM1085.94 2960V2523.64H1390.2V2609.29H1191.41V2698.78H1374.65V2784.64H1191.41V2874.35H1390.2V2960H1085.94ZM1617.54 2960H1456.25V2523.64H1617.33C1661.79 2523.64 1700.07 2532.37 1732.18 2549.84C1764.42 2567.17 1789.28 2592.17 1806.75 2624.84C1824.22 2657.37 1832.96 2696.29 1832.96 2741.61C1832.96 2787.06 1824.22 2826.12 1806.75 2858.79C1789.42 2891.46 1764.63 2916.53 1732.39 2934.01C1700.14 2951.34 1661.86 2960 1617.54 2960ZM1561.72 2870.09H1613.5C1637.93 2870.09 1658.6 2865.97 1675.5 2857.73C1692.54 2849.35 1705.4 2835.78 1714.06 2817.03C1722.87 2798.14 1727.27 2773 1727.27 2741.61C1727.27 2710.21 1722.87 2685.21 1714.06 2666.61C1705.26 2647.86 1692.26 2634.36 1675.07 2626.12C1658.03 2617.74 1637 2613.55 1612 2613.55H1561.72V2870.09ZM2265.91 2523.64V2960H2176.42L2002.77 2708.15H2000V2960H1894.53V2523.64H1985.3L2157.03 2775.06H2160.66V2523.64H2265.91ZM2332.23 2960V2523.64H2636.49V2609.29H2437.7V2698.78H2620.94V2784.64H2437.7V2874.35H2636.49V2960H2332.23ZM2688.27 2609.29V2523.64H3057.09V2609.29H2924.77V2960H2820.79V2609.29H2688.27Z" fill="#48B1AB" />
                                    <path d="M246.48 2342.79L187 2394L206.07 2342.79L234.87 2293.04L275.279 2237.8L318.315 2189.51L377.794 2136.11L444.764 2084.17L497.529 2048.31L565.246 2011.75L627.71 1982.11L696.202 1953.57L797.195 1917.36L913.557 1884.06L1009.33 1859.55L1135.81 1836.15L1275.36 1817.85L1433.23 1800.67L1571.29 1786.78L1722.81 1776.89L1863.5 1764.84L2009.02 1752.38L2122.01 1741.05L2251.09 1727.87L2310.95 1719.11L2405.62 1705.19L2470.35 1693.87L2519.36 1684.71L2569.85 1671.55L2627.48 1655.09L2672.37 1639.72L2720.27 1621.42L2762.91 1599.13L2796.97 1580.83L2821.29 1566.56L2843.34 1549.73L2869.16 1527.05L2887.51 1505.46L2900.59 1488.65L2910.7 1468.17L2921.57 1446.96L2926.04 1426.09V1405.23L2921.57 1389.88L2916.31 1379.64L2906.23 1369.4L2895.36 1360.97L2880.77 1349.99L2860.95 1343.05L2840.36 1338.67L2808.19 1334.27L2786.49 1329.89L2771.51 1326.24L2806.31 1320L2834.39 1316H2870.68L2910.7 1320L2932.04 1323.67L2959.71 1329.89L2985.52 1343.05L3009.84 1360.97L3027.06 1382.94L3037.9 1401.58L3045.78 1419.88L3048.76 1439.63L3051 1484.98L3048.76 1513.51L3037.9 1553.02L3013.96 1599.48L2965.32 1661.31L2894.97 1726.06L2813.44 1778L2734.47 1820.42L2633.84 1854.45L2543.29 1878.96L2460.23 1897.98L2369.33 1914.06L2273.17 1930.9L2195.37 1945.51L2087.24 1959.43L1927.84 1974.43L1789.04 1983.21L1645.76 1992.35L1490.48 1999.67L1342.33 2010.99L1197.91 2024.53L1073.7 2037.72L941.253 2058.93L835.753 2077.96L725.36 2105.74L619.114 2138.3L509.855 2183.68L402.117 2235.61L319.061 2287.17L246.48 2342.79Z" fill="#48B1AB" stroke="#48B1AB" stroke-width="5" />
                                </svg>
                                <span style={{ fontSize: 12 }} className={'fw-bolder mx-2'}>
                                    Feednet - ovqatlantirishni nazorat qilish tizimi!
                                    <br />
                                    <span
                                        style={{ color: 'red', marginLeft: 4, fontSize: 15 }}> Dastur test rejimida!</span>
                                </span>
                            </div>
                            <div className={"d-flex align-items-center justify-content-around w-75"}>
                                <div className={'px-1'}
                                    style={{ backgroundColor: '#eeeeee', borderRadius: "30%", cursor: 'pointer' }}>
                                    <Link
                                        to={"/sidebar/notification"} className={"link-none"}>
                                        <span className={"fs-3"}>{user?.notification}</span>
                                        <TbBell
                                            size={15} /></Link></div>
                                <div className={'px-1'}
                                    style={{ backgroundColor: '#eeeeee', borderRadius: "30%", cursor: 'pointer' }}>
                                    <BiMessageDetail size={15} /></div>
                                <div className={'d-flex justify-content-between align-items-center'}>
                                    <div className={'px-2'}
                                        style={{ fontSize: 10 }}>{user?.name?.substring(0, 1)}.{user?.surname}</div>
                                    <img src={userLogo} alt="" width={15} />
                                </div>
                            </div>
                        </div>
                    </Container>}
            </Navbar>
            <Sidebar>
                <Routes>
                    <Route path="/user" element={<Users />} />
                    <Route path="/users-department" element={<UsersDepartment />} />
                    <Route path="/info" element={<UserInfos />} />
                    <Route path="/mtt" element={<Mtt />} />
                    <Route path="/meal" element={<Meal />} />
                    <Route path="/product" element={<Product />} />
                    <Route path="/age" element={<Age />} />
                    <Route path="/admin" element={<About />} />
                    <Route path="/super-admin" element={<About />} />
                    <Route path="/region-department" element={<RegionDepartment />} />
                    <Route path="/department" element={<Department />} />
                    <Route path="/multiMenu" element={<MultiMenu />} />
                    <Route path="/multi-menu-one/:id" element={<MultiMenuOne />} />
                    <Route path="/relation-view" element={<MenuView />} />
                    {/*<Route path="/relation-menu" element={<RelationMenu/>}/>*/}
                    <Route path="/supplier" element={<Supplier />} />
                    <Route path="/price" element={<Price />} />
                    <Route path="/contract" element={<Contract />} />
                    <Route path="/contract/:orderId" element={<ContractByOrder />} />
                    <Route path="/create-contract" element={<CreateContract />} />
                    <Route path="/edit-contract/:id" element={<EditContract />} />
                    <Route path="/children-number" element={<ChildrenNumber />} />
                    <Route path="/warehouse" element={<Warehouse />} />
                    <Route path="/warehouse/product" element={<AddProductToWarehouse />} />
                    <Route path="/warehouse-admin" element={<WareHousProductByKinderGarten />} />
                    <Route path="/report-warehouse" element={<InputOutput />} />
                    <Route path="/one-day-menu/:id" element={<GetOneDayMenu />} />
                    <Route path="/one-day-menu" element={<OneDayMenu />} />
                    <Route path="/menu-mtt" element={<OneDayWithMttFromUsers />} />
                    <Route path="/input-output-admin" element={<InputOutputFromAdmin />} />
                    <Route path="/report-paramedic" element={<InputOutputKidsNumber />} />
                    <Route path="/report-kids-number" element={<InputOutputKidsNumberFromAdmin />} />
                    <Route path="/notification" element={<Notification />} />
                    <Route path="/send-notification" element={<SendNotifications />} />
                    <Route path="/product-pack" element={<ProductPack />} />
                    <Route path="/permission" element={<PermissionsFromRelation />} />
                    <Route path="/default-kids-number" element={<KidsNumberOther />} />
                    <Route path="/order" element={<Order />} />
                    <Route path="/order/:id" element={<OneOrder />} />
                    <Route path="/one-multi-menu-other/:id" element={<MultiMenuOneFromOther />} />
                    <Route path="/accountant" element={<Accountant />} />
                </Routes>
                <br /><br />
            </Sidebar>
            <LoadingPageReducer />
        </div>
    );
}

export default Sidebars;
