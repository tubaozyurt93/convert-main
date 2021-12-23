/*eslint array-callback-return: "error"*/

import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import request from '../service/request'
import CardData from './CardData'
import SearchTable from './SearchTable';
import { useDispatch } from 'react-redux';



export default function Search() {
    const [queryString, setQueryString] = useState('');
    const [search, setSearch] = useState();
    const dispatch = useDispatch();


    const addList = (newList) => {
        console.log('new List', typeof newList)
        dispatch({ type: 'GET_LIST', payload: newList })
    }

    useEffect(() => {
        getApi();
    }, [])



    const getApi = async () => {
        const data = await axios.get(request.baseUrl);
        setSearch(data?.data?.supported_codes);
    };
    console.log('QUery', queryString)
    return (

        <div>
            <input style={{ marginTop: "15px", width: "100%" }}
                value={queryString}
                onChange={e => setQueryString(e.target.value)}
                placeholder="Search..."
            />
            {search?.filter((item) => {
                if (queryString === '') {
                    return null;
                }

                else if (item[0].toLowerCase().includes(queryString.toLowerCase()) || item[1].toLowerCase().includes(queryString.toLowerCase())) {
                    return item;
                }

            }
            ).map((value) => {

                return <CardData key={value.id} data={value} addList={addList} />
            })
            }
            <SearchTable />
        </div>
    );

}
