import React from 'react'
import { Button, Table, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { useSelector } from "react-redux";



export default function SearchTable() {

    const [show, setShow] = useState(false);
    const [value, setValue] = useState();
    const [selectedRow,setSelectedRow]=useState();
    //const [currentState,setCurrentState]=useState();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let state = useSelector(state => state.listItem);
    //setCurrentState(state);
    const handleOnChange = (item,checkState) => {
        
        state=state.map((data)=>{
            if(item.id===data.id)
            {
                // data.isCheck=true;
                setSelectedRow(item.id);
            }
            else {
                data.isCheck=false;
            }

        return data;
    });
}
   
    return (
        <div>
            <Table hover>
                <thead>
                    <tr>
                        <th></th>
                        <th>Acronmy</th>
                        <th>Name</th>
                        <th>Amount</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {state?.map((item) => {

                        return <tr>
                            <td><input
                                type="checkbox"
                                id="topping"
                                name="topping"
                                value="Paneer"
                                checked={ item.id===selectedRow}
                                onChange={() => handleOnChange(item,item?.isCheck)} />
                            </td>
                            <td>{item?.currency}</td>
                            <td>{item?.name}</td>
                            <td>{item?.amount}</td>
                            <td><Button disabled={item.id!==selectedRow} onClick={handleShow}>BUY</Button></td>
                            <td><Button disabled={item.id!==selectedRow} onClick={handleShow}>SELL</Button></td>
                        </tr>
                    })}

                </tbody>
            </Table>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className="m-auto">
                        <Button >TRY</Button>
                        <Button >USD</Button>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="m-auto">Amount : <input
                    type="text"
                    onChange={e => setValue(e.target.value)}
                    value={value}
                /></Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" className="m-auto" onClick={handleClose}>
                        Exchange
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

