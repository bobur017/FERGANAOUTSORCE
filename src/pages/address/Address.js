import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { getAddress } from './AddressReducer';

function Address({ district }) {
    const [addressState, setAddressState] = useState([]);
    const [regionState, setRegionState] = useState([]);
    const address = useSelector(state => state.address.address)
    const error = useSelector(state => state.address.error)
    const dispatch = useDispatch();
    const firstUpdate = useRef(false);


    useEffect(() => {
        if (!firstUpdate.current) {

        } else {
            // toast.error(error?.code);
        }
    }, [error]);


    const message = () => {
        toast.error(error?.code);
    }

    useEffect(() => {
        setAddressState(address);
        console.log('sssss', address);
    }, [address]);


    useEffect(() => {
        if (!firstUpdate.current) {
            firstUpdate.current = true;
            dispatch(getAddress());
        }
    }, []);


    const getRegion = (e) => {
        var list = addressState.filter(item => item.id === parseInt(e.target.value));
        if (list[0] !== undefined) {
            setRegionState(list[0].districtList);
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
            <Form.Select required name='district' onChange={getDistrict}>
                <option value="">Tumanni tanlang</option>
                {
                    regionState?.map((item, index) => (
                        <option key={index} value={item.id}>{item.name}</option>
                    ))
                }
            </Form.Select>
        </>
    );
}

export default Address;