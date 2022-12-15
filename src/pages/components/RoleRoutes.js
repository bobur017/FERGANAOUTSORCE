import {
    FaCommentAlt,
    FaHome,
    FaNetworkWired,
} from "react-icons/fa";
import React from "react";
import { GiGreenhouse, GiMeal, GiShoppingCart } from "react-icons/gi";
import { TbNumbers } from "react-icons/tb";
import {CgMenuHotdog} from "react-icons/cg";
import {BsFillMenuButtonFill} from "react-icons/bs";
import {TiInfoLargeOutline} from "react-icons/ti";
import {FaUserCog} from "react-icons/fa";
import {HiOutlineDocumentText, HiOutlineTruck} from "react-icons/hi";
import {MdOutlinePriceChange} from "react-icons/md";

export const rolesList = (role) => {

    if (role === "ROLE_ADMIN") {
        return [
            {
                path: "/sidebar/info",
                name: "Ma'lumotlar",
                icon: <TiInfoLargeOutline size={25}/>
            },
            {
                path: "/sidebar/user",
                name: "Xodimlar",
                icon: <FaUserCog size={25}/>
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
                path: "/sidebar/relation-view",
                name: "Menyularni biriktirish",
                icon: <BsFillMenuButtonFill size={25}/>
            },
            {
                path: "/sidebar/price",
                name: "Narx-navo",
                icon: <MdOutlinePriceChange size={25}/>
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
    } else  if(role === "ROLE_BO`LIM_BUXGALTER"){
        return [
            {
                path: "/sidebar/info",
                name: "Ma'lumotlar",
                icon: <TiInfoLargeOutline size={25}/>
            },
            {
                path: "/sidebar/contract",
                name: "Ma'lumotlar",
                icon: <HiOutlineDocumentText size={25}/>
            },
            {
                path: "/sidebar/supplier",
                name: "Ma'lumotlar",
                icon: <HiOutlineTruck size={25}/>
            },
        ];
    }else  if(role === "ROLE_XODIMLAR_BO`LIMI"){
        return [
            {
                path: "/sidebar/info",
                name: "Ma'lumotlar",
                icon: <TiInfoLargeOutline size={25}/>
            },
            {
                path: "/sidebar/users-department",
                name: "Xodimlar",
                icon: <FaUserCog size={25}/>
            },
        ];
    }
}