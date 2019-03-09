import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";

class AccountTable extends Component {
    render() {
        const columns = [
            {
                Header: "Order Number",
                accessor: "ordernumber"
            },
            {
                Header: "Order Date",
                accessor: "date"
            },
            {
                Header: "Listed Price",
                accessor: "listedprice"
            },
            {
                Header: "Property Number",
                accessor: "propertynumber"
            },
            {
                Header: "Payment Method",
                accessor: "method"
            },
            {
                Header: "Payment Amount",
                accessor: "amount"
            },
            {
                Header: ''
            }
        ]
        if (this.props.orders) {
            return (
                <ReactTable
                    columns={columns}
                    data={this.props.orders}
                >
                </ReactTable>
            )
        } else {
            return (
                <div>NO ORDERS</div>
            )
        }
        
    }
}

export default AccountTable;