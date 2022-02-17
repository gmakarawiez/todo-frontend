import * as React from 'react';
import {useState, useEffect} from 'react';
import { ReactSearchKit, InvenioSearchApi, SearchBar, ResultsList } from 'react-searchkit';
import ModelsService from "../../../services/models.services"
import {Cookies} from '../../../cookies';
from elasticsearch import Elasticsearch;

//const searchApi = new InvenioSearchApi({
//  axios: {
//    url: '/todos',
//    timeout: 5000,
//    headers: get_header(),
//  }
//});

const get_header = () => {
    const access_token = Cookies.get("access_token");
    const headers = {
        Authorization: `Token ${access_token}`
    }
    return headers
}


class MyResponseSerializer {
  serialize = payload => {
    console.log("payload: ", payload)
    return {
      hits: payload.results.map(result => result.title),
      total: payload.results.length,
      aggregations: {}
    }
  }
}




const searchApi = new Elasticsearch({
  axios: {
    url:  '/todos',
    timeout: 5000,
    headers: get_header(),
  },
  es: {
    responseSerializer: new MyResponseSerializer(),
  },
});



export default function ModelsList() {

    const renderResultsList = (results) => {
        return results.map(result => <div> {result.title}</div>)
    }

    return (
        <ReactSearchKit searchApi={searchApi}>
            <div style={{ margin: '2em auto', width: '50%' }}>
                <SearchBar />
                <ResultsList renderElement={renderResultsList}/>
            </div>
        </ReactSearchKit>
    );

}