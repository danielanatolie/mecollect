import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import ReactTable from "react-table";
import "react-table/react-table.css";
import matchSorter from 'match-sorter';

class Table extends Component {

    handleBuy() {

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