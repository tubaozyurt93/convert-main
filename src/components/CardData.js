import React, { useEffect } from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';

const API_KEY = '46dca3aaf9374f8545787a60'
export default function CardData({ data, addList }) {


    const [currency, setCurrency] = useState('USD')
    const [show, setShow] = useState(false);
    const [moneyType, setMoneyType] = useState();
    const [listItem, setListItem] = useState();
    const [longMoneyName, setLongMoneyName] = useState();
    const [value, setValue] = useState();
    const state = useSelector(state => state)
    const handleClose = () => setShow(false);
    const dispatch = useDispatch()

    useEffect(() => {
        localStorage.setItem('total', 10000);

    }, [])


    const handleShowModal = (moneyUnitType, longMoneyName) => {
        console.log(moneyUnitType);
        axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${moneyUnitType}`).then(item => dispatch({ type: 'GET_CONVERSION_RATE', payload: item.data.conversion_rates }));
     
        setShow(true);
        console.log(data);
        setMoneyType(moneyUnitType);
        setLongMoneyName(longMoneyName);
    }

    const handleClick = (type = 'USD') => {
        setCurrency(type)
        axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${type}`).then(item => dispatch({ type: 'GET_CONVERSION_RATE', payload: item.data.conversion_rates }))
    }

    const handleExchange = () => {
        const data = {
            isCheck: false,
            name: longMoneyName,
            currency: moneyType,
            amount: value,
            id: new Date().getUTCMilliseconds()
        }
        setListItem(data)
        setShow(false);
        console.log('listItem', listItem)
        const totalMoney = localStorage.getItem('total')
        const rate_ = state.rate[data['0']]
        if (Number(value) > totalMoney) {
        }
        else {


            const exchange = value * rate_
            localStorage.setItem('total', (totalMoney - exchange))


            dispatch({ type: 'CHANGE_CURRENCY', payload: { rate: exchange } })
        }

        addList(data);

    }
    

    return (
        <div>
            <Card className="m-auto hover" style={{ width: '65rem' }}>
                <ListGroup variant="flush">
                    <ListGroup.Item onClick={() => handleShowModal(data[0], data[1])} >{data[0] + " - " + data[1]}</ListGroup.Item>
                </ListGroup>
            </Card>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className="m-auto">
                        <Button style={{ marginRight: '50px' }} onClick={() => handleClick('TRY')}>TRY</Button>
                        <Button onClick={() => handleClick('USD')}>USD</Button>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="m-auto">
                    <Card.Text>
                        <span>{currency + " to " + moneyType + " -" + longMoneyName}</span>
                        <hr />
                        <b>RATE : </b> <span>{state?.rate[data['0']]}</span> 
                          
                    </Card.Text>
                    <hr />
                    Amount : <input
                        type="number"
                        onChange={e => setValue(e.target.value)}
                        defaultValue={value}
                    /></Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" className="m-auto" onClick={handleExchange}>
                        Exchange
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
