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

export const rolesList = (role) => {

    if (role === "ROLE_ADMIN") {
        return [
            {
                path: "/sidebar/",
                name: "Dashboard",
                icon: <FaTh/>
            },
            {
                path: "/sidebar/about",
                name: "About",
                icon: <FaUserAlt/>
            },
            {
                path: "/sidebar/analytics",
                name: "Analytics",
                icon: <FaRegChartBar/>
            },
            {
                path: "/sidebar/comment",
                name: "Comment",
                icon: <FaCommentAlt/>
            },
            {
                path: "/sidebar/product",
                name: "Product",
                icon: <FaShoppingBag/>
            },
            {
                path: "/sidebar/productList",
                name: "Product List",
                icon: <FaThList/>
            }
        ];
    } else if (role === "ROLE_SUPER_ADMIN") {
        return [
            {
                path: "/sidebar/admin",
                name: "Bosh sahifa",
                icon: <FaHome/>
            },
            {
                path: "/sidebar/region-department",
                name: "Boshqarmalar",
                icon: <FaNetworkWired/>
            }
        ];
    }
}