import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import ReactTable from "react-table";
import "react-table/react-table.css";
import matchSorter from 'match-sorter';
import {userEmail} from '../App';


class Table extends Component {
    state = {
        userEmail: userEmail
    }

    getDate() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1;
        var yyyy = today.getFullYear();
        if(dd<10) {
            dd = '0'+dd
        } 
        if(mm<10) {
            mm = '0'+mm
        }
        today = mm + '/' + dd + '/' + yyyy;
        return today;
    }

    handleBuy = async(row) => {
        console.log(row);
        const response = await fetch("api/createOrder", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ordernumber: Math.floor((Math.random() * 10000) + 1),
                date: this.getDate(),
                email: this.state.userEmail,
                listedprice: row.originalprice,
                propertynumber: row.propertynumber
            })
        });
        const body = await response.text();
    }

    handleDetails() {

    }

    render() {
        const columns = [
            {
                Header: "Property Number",
                accessor: "propertynumber"
            },
            {
                Header: "Original Price",
                accessor: "originalprice"
            },
            {
                Header: "Property Address",
                id:"propertyaddress",
                accessor: d => d.propertyaddress,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["propertyaddress"] }),
                  filterAll: true
            },
            {
                Header: "Year Built",
                accessor: "yearbuilt"
            },
            {
                Header: "Property Type",
                accessor: "propertytype",
                filterable: false
            },
            {
                Header: "Total Beds",
                accessor: "totalbeds"
            },
            {
                Header: "Total Baths",
                accessor: "totalbaths"
            },
            {
                Header: '',
                filterable: false,
                Cell: row => (
                    <div>
                        <button onClick={() => this.handleBuy(row.original)}>Buy</button>
                        <button onClick={() => this.handleDetails(row.original)}>Details</button> 
                    </div>
                )
             }
        ]
        if (this.props.properties) {
            return (
                <ReactTable
                    columns={columns}
                    data={this.props.properties}
                    filterable
                >
                </ReactTable>
            )
        } else {
            return (
                <div></div>
            )
        }
        
    }
}

export default Table;