import React, {useState} from 'react';
import NavbarHeader from "../more/NavbarHeader";
import DefaultKidsNumber from "./DefaultKidsNumber";
import TimeKidsNumber from "./TimeKidsNumber";

function KidsNumberOther() {
    const [currentNavs, setCurrentNavs] = useState(0);
    return (
        <div>
            <NavbarHeader name={"Bolalar soni"} navs={[{name: "O'rtacha bola soni"}, {name: "Bola soni vaqti"}]}
                          currentNavs={setCurrentNavs}/>
            {currentNavs === 0 ? <DefaultKidsNumber/>:null}
            {currentNavs === 1 ? <TimeKidsNumber/>:null}
        </div>
    );
}

export default KidsNumberOther;