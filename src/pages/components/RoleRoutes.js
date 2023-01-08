import {
    FaChild,
    FaCommentAlt,
    FaHome,
    FaNetworkWired,
} from "react-icons/fa";
import React from "react";
import { GiGreenhouse, GiMeal, GiShoppingCart } from "react-icons/gi";
import {TbBuildingWarehouse, TbLockAccess, TbNumbers, TbReportAnalytics} from "react-icons/tb";
import {CgMenuHotdog} from "react-icons/cg";
import {BsArrowDownUp, BsFillMenuButtonFill} from "react-icons/bs";
import {TiInfoLargeOutline} from "react-icons/ti";
import {FaUserCog} from "react-icons/fa";
import {HiOutlineDocumentText, HiOutlineTruck} from "react-icons/hi";
import {MdOutlinePriceChange} from "react-icons/md";
import {RiDeleteBin6Line, RiNotification2Line} from "react-icons/ri";
import {BiMailSend} from "react-icons/bi";
import {FiPackage} from "react-icons/fi";

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
                path: "/sidebar/permission",
                name: "Ruxsat-taqiq",
                icon: <TbLockAccess size={25}/>
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
                name: "Shartnomalar",
                icon: <HiOutlineDocumentText size={25}/>
            },
            {
                path: "/sidebar/supplier",
                name: "Ta'minotchilar",
                icon: <HiOutlineTruck size={25}/>
            },
            {
                path: "/sidebar/input-output-admin",
                name: "Kirim chiqim",
                icon: <BsArrowDownUp size={25}/>
            },
            {
                path: "/sidebar/report-kids-number",
                name: "Bolalar soni",
                icon: <FaChild size={25}/>
            },
            {
                path: "/sidebar/relation-view",
                name: "Menyularni biriktirish",
                icon: <BsFillMenuButtonFill size={25}/>
            },
            {
                path: "/sidebar/remove-product",
                name: "Chiqidlar",
                icon: <RiDeleteBin6Line size={25}/>
            },
            {
                path: "/sidebar/warehouse-admin",
                name: "Omborxona",
                icon: <TbBuildingWarehouse size={25}/>
            },
            {
                path: "/sidebar/permission",
                name: "Ruxsat-taqiq",
                icon: <TbLockAccess size={25}/>
            },
        ];
    }else if(role === "ROLE_OMBORCHI"){
        return [
            {
                path: "/sidebar/info",
                name: "Ma'lumotlar",
                icon: <TiInfoLargeOutline size={25}/>
            },
            {
                path: "/sidebar/menu-mtt",
                name: "Kunlik menu",
                icon: <HiOutlineDocumentText size={25}/>
            },
            {
                path: "/sidebar/warehouse",
                name: "Omborxona",
                icon: <TbBuildingWarehouse size={25}/>
            },
            {
                path: "/sidebar/report-warehouse",
                name: "Hisobot",
                icon: <TbReportAnalytics size={25}/>
            },

        ];
    }else    if(role === "ROLE_HAMSHIRA"){
        return [
            {
                path: "/sidebar/info",
                name: "Ma'lumotlar",
                icon: <TiInfoLargeOutline size={25}/>
            },
            {
                path: "/sidebar/input-output-admin",
                name: "Kirim chiqim",
                icon: <BsArrowDownUp size={25}/>
            },
            {
                path: "/sidebar/menu-mtt",
                name: "Kunlik menu",
                icon: <HiOutlineDocumentText size={25}/>
            },
            {
                path: "/sidebar/children-number",
                name: "Bolalar soni",
                icon: <FaChild size={25}/>
            },
            {
                path: "/sidebar/report-paramedic",
                name: "Hisobot",
                icon: <TbReportAnalytics size={25}/>
            },
            {
                path: "/sidebar/warehouse",
                name: "Omborxona",
                icon: <TbBuildingWarehouse size={25}/>
            },
        ];
    }else  if(role === "ROLE_RAXBAR"){
        return [
            {
                path: "/sidebar/info",
                name: "Ma'lumotlar",
                icon: <TiInfoLargeOutline size={25}/>
            },
            {
                path: "/sidebar/menu-mtt",
                name: "Kunlik menu",
                icon: <HiOutlineDocumentText size={25}/>
            },
            {
                path: "/sidebar/children-number",
                name: "Bolalar soni",
                icon: <FaChild size={25}/>
            },
            {
                path: "/sidebar/report-paramedic",
                name: "Hisobot",
                icon: <TbReportAnalytics size={25}/>
            },
            {
                path: "/sidebar/warehouse",
                name: "Omborxona",
                icon: <TbBuildingWarehouse size={25}/>
            },
        ];
    }else  if(role === "ROLE_BOSHQARMA_BUXGALTER"){
        return [
            {
                path: "/sidebar/info",
                name: "Ma'lumotlar",
                icon: <TiInfoLargeOutline size={25}/>
            },
            {
                path: "/sidebar/report-kids-number",
                name: "Bolalar soni",
                icon: <FaChild size={25}/>
            },
            {
                path: "/sidebar/reports",
                name: "Hisobotlar",
                icon: <TbReportAnalytics size={25}/>
            },
            {
                path: "/sidebar/warehouse",
                name: "MTT Omborxonalari",
                icon: <TbBuildingWarehouse size={25}/>
            },
            {
                path: "/sidebar/price",
                name: "Narx-navo",
                icon: <MdOutlinePriceChange size={25}/>
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
                path: "/sidebar/contract",
                name: "Shartnomalar",
                icon: <HiOutlineDocumentText size={25}/>
            },
            {
                path: "/sidebar/warehouse-admin",
                name: "Omborxona",
                icon: <TbBuildingWarehouse size={25}/>
            },
            {
                path: "/sidebar/remove-product",
                name: "Chiqidlar",
                icon: <RiDeleteBin6Line size={25}/>
            },
        ];
    }else  if(role === "ROLE_BUXGALTER"){
        return [
            {
                path: "/sidebar/info",
                name: "Ma'lumotlar",
                icon: <TiInfoLargeOutline size={25}/>
            },
            {
                path: "/sidebar/contract",
                name: "Shartnomalar",
                icon: <HiOutlineDocumentText size={25}/>
            },
            {
                path: "/sidebar/supplier",
                name: "Ta'minotchilar",
                icon: <HiOutlineTruck size={25}/>
            },
            {
                path: "/sidebar/input-output-admin",
                name: "Kirim chiqim",
                icon: <BsArrowDownUp size={25}/>
            },
            {
                path: "/sidebar/report-kids-number",
                name: "Bolalar soni",
                icon: <FaChild size={25}/>
            },
            {
                path: "/sidebar/relation-view",
                name: "Menyularni biriktirish",
                icon: <BsFillMenuButtonFill size={25}/>
            },
            {
                path: "/sidebar/warehouse-admin",
                name: "Omborxona",
                icon: <TbBuildingWarehouse size={25}/>
            },

        ];
    }else  if(role === "ROLE_TEXNOLOG"){
        return [
            {
                path: "/sidebar/info",
                name: "Ma'lumotlar",
                icon: <TiInfoLargeOutline size={25}/>
            },
            {
                path: "/sidebar/report-kids-number",
                name: "Bolalar soni",
                icon: <FaChild size={25}/>
            },
            {
                path: "/sidebar/reports",
                name: "Hisobotlar",
                icon: <TbReportAnalytics size={25}/>
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
                path: "/sidebar/meal",
                name: "Taom",
                icon: <GiMeal size={25}/>
            },
            {
                path: "/sidebar/input-output-admin",
                name: "Kirim chiqim",
                icon: <BsArrowDownUp size={25}/>
            },
            {
                path: "/sidebar/warehouse-admin",
                name: "Omborxona",
                icon: <TbBuildingWarehouse size={25}/>
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
                path: "/sidebar/send-notification",
                name: "Bildirishnoma yuborish",
                icon: <RiNotification2Line size={25}/>
            },
            {
                path: "/sidebar/users-department",
                name: "Xodimlar",
                icon: <FaUserCog size={25}/>
            },
            {
                path: "/sidebar/relation-view",
                name: "Menyularni biriktirish",
                icon: <BsFillMenuButtonFill size={25}/>
            },
            {
                path: "/sidebar/multiMenu",
                name: "Taomnomalar",
                icon: <CgMenuHotdog size={25}/>
            },
            {
                path: "/sidebar/product-pack",
                name: "Mahsulot qadoqlari",
                icon: <FiPackage size={25}/>
            },
        ];
    }
}