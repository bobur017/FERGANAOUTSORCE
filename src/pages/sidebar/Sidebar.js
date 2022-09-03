import React from 'react';
import {ProSidebar, Menu, MenuItem, SubMenu, SidebarContent, SidebarFooter, SidebarHeader} from 'react-pro-sidebar';
import {FaGem, FaHeart} from "react-icons/fa";



function Sidebar() {
    return (
        <ProSidebar breakPoint={["xl","xs"]}>
           <SidebarHeader>
               <Menu iconShape="square">
                   <MenuItem icon={<FaGem />}>Dashboard</MenuItem>
                   <SubMenu title="Components" icon={<FaHeart />}>
                       <MenuItem>Component 1</MenuItem>
                       <MenuItem>Component 2</MenuItem>
                   </SubMenu>
               </Menu>
           </SidebarHeader>
            <SidebarContent>
                <Menu iconShape="square">
                    <MenuItem icon={<FaGem />}>Dashboard</MenuItem>
                    <SubMenu title="Components" icon={<FaHeart />}>
                        <MenuItem>Component 1</MenuItem>
                        <MenuItem>Component 2</MenuItem>
                    </SubMenu>
                </Menu>
            </SidebarContent>
            <SidebarFooter>
                Chiqish
            </SidebarFooter>
        </ProSidebar>
    );
}

export default Sidebar;