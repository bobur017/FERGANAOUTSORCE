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
import {GiGreenhouse, GiMeal, GiShoppingCart} from "react-icons/gi";
import {TbNumbers} from "react-icons/tb";

export const rolesList = (role) => {

    if (role === "ROLE_ADMIN") {
        return [
            {
                path: "/sidebar/about",
                name: "About",
                icon: <FaUserAlt />
            },
            {
                path: "/sidebar/product",
                name: "Mahsulotlar",
                icon: <GiShoppingCart />
            },
            {
                path: "/sidebar/age",
                name: "Yosh toifalari",
                icon: <TbNumbers />
            },
            {
                path: "/sidebar/mtt",
                name: "MTT",
                icon: <GiGreenhouse />
            },
            {
                path: "/sidebar/meal",
                name: "Taomlar",
                icon: <GiMeal />
            },
            {
                path: "/sidebar/meal",
                name: "Taomlar",
                icon: <GiMeal />
            },

        ];
    } else if (role === "ROLE_SUPER_ADMIN") {
        return [
            {
                path: "/sidebar/super-admin",
                name: "Bosh sahifa",
                icon: <FaHome />
            },
            {
                path: "/sidebar/region-department",
                name: "Boshqarmalar",
                icon: <FaNetworkWired />
            },
        ];
    }
}