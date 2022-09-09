import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { getAddress } from './AddressReducer';

function Address({ district, region, view, getOrNo }) {
    const [addressState, setAddressState] = useState([]);
    const [regionState, setRegionState] = useState([]);
    const address = useSelector(state => state.address.address)
    const error = useSelector(state => state.address.error)
    const dispatch = useDispatch();
    const firstUpdate = useRef(false);


    useEffect(() => {
        setAddressState(address);
    }, [address]);


    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            if (address.length === 0) {
                dispatch(getAddress());
            }
        }
    }, []);


    const getRegion = (e) => {
        var list = addressState.filter(item => item.id === parseInt(e.target.value));
        if (list[0] !== undefined) {
            setRegionState(list[0].districtList);
            region(list[0])
        }
    }
    const getDistrict = (e) => {
        var list = regionState.filter(item => item.id === parseInt(e.target.value));
        if (list[0] !== undefined) {
            district(list[0]);
        }
    }

    return (
        <>
            <Form.Select required name='region' onChange={getRegion}>
                <option value="">Viloyatni tanlang</option>
                {
                    addressState?.map((item, index) => (
                        <option key={index} value={item.id} >{item.name}</option>
                    ))
                }
            </Form.Select>
            <br />
            {view ? <Form.Select required name='district' onChange={getDistrict}>
                <option value="">Tumanni tanlang</option>
                {
                    regionState?.map((item, index) => (
                        <option key={index} value={item.id}>{item.name}</option>
                    ))
                }
            </Form.Select> : null}
        </>
    );
}

export default Address;