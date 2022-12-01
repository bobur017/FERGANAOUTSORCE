import {
    FaCommentAlt,
    FaHome,
    FaNetworkWired,
    FaRegChartBar,
    FaShoppingBag,
    FaTh,
    FaThList,
    FaUserAlt
} from "react-icons/fa";
import React from "react";
import { GiGreenhouse, GiMeal, GiShoppingCart } from "react-icons/gi";
import { TbNumbers } from "react-icons/tb";
import {CgMenuHotdog} from "react-icons/cg";
import {BsFillMenuButtonFill, BsFillMenuButtonWideFill} from "react-icons/bs";

export const rolesList = (role) => {

    if (role === "ROLE_ADMIN") {
        return [
            {
                path: "/sidebar/about",
                name: "About",
                icon: <FaUserAlt size={25}/>
            },
            {
                path: "/sidebar/product",
                name: "Mahsulotlar",
                icon: <GiShoppingCart size={25}/>
            },
            {
                path: "/sidebar/age",
                name: "Yosh toifalari",
                icon: <TbNumbers size={25}/>
            },
            {
                path: "/sidebar/mtt",
                name: "MTT",
                icon: <GiGreenhouse size={25}/>
            },
            {
                path: "/sidebar/meal",
                name: "Taom",
                icon: <GiMeal size={25}/>
            },
            {
                path: "/sidebar/department",
                name: "Bo'linmalar",
                icon: <FaNetworkWired size={25}/>
            },
            {
                path: "/sidebar/multiMenu",
                name: "Taomnomalar",
                icon: <CgMenuHotdog size={25}/>
            },
            {
                path: "/sidebar/relation-menu",
                name: "Menyularni biriktirish",
                icon: <BsFillMenuButtonFill size={25}/>
            },

        ];
    } else if (role === "ROLE_SUPER_ADMIN") {
        return [
            {
                path: "/sidebar/super-admin",
                name: "Bosh sahifa",
                icon: <FaHome size={25}/>
            },
            {
                path: "/sidebar/region-department",
                name: "Boshqarmalar",
                icon: <FaNetworkWired size={25}/>
            },
        ];
    }
}