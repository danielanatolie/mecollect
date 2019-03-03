import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import ReactTable from "react-table";
import "react-table/react-table.css";

class Table extends Component {

    handleBuy() {

    }

    handleDetails() {

    }

    render() {
        console.log(this.props.properties)
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
                accessor: "propertyaddress"
            },
            {
                Header: "Year Built",
                accessor: "yearbuilt"
            },
            {
                Header: "Property Type",
                accessor: "propertytype"
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