import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from "react-redux";

function Address() {
    const [state, setState] = useState();
    const address = useSelector(state = state.address)
    const dispatch = useDispatch();
    const firstUpdate = useRef(false);
    useEffect(() => {
        if (!firstUpdate) {
            firstUpdate.current = true;
        }
    }, [])

    return (
        <div>

        </div>
    );
}

export default Address;