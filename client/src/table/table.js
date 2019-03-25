import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import matchSorter from 'match-sorter';
import {userEmail} from '../App';
import DetailsModal from '../DetailsModal.js';
import BuyingDetailsModal from '../BuyingDetailsModal.js';

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userEmail: userEmail,
            showDetails: false,
            showEditable: false,
            properties: null,
            newProperties: this.props.properties,
            showBuyingDetails: false,
            curRow: null,
            orderNumber: null,
            paymentNumber: null,
            curAmount: null
        };
        this.showDetails = this.showDetails.bind(this);
        this.hideDetails = this.hideDetails.bind(this);
        this.showEditableDetails = this.showEditableDetails.bind(this);
        this.hideEditableDetails = this.hideEditableDetails.bind(this);
        this.handleSaveEdit = this.handleSaveEdit.bind(this);
        this.showBuyingDetails = this.showBuyingDetails.bind(this);
        this.hideBuyingDetails = this.hideBuyingDetails.bind(this);
        this.createPaymentandOrder = this.createPaymentandOrder.bind(this);
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

    showBuyingDetails(row) {
        console.log("Got into showBuyingDetails!!");
        let random1 = Math.floor((Math.random() * 10000) + 1);
        let random2 = random1 + 100;
        console.log(row);
        this.setState({
            showBuyingDetails: true,
            curRow: row,
            curAmount: row.originalprice,
            orderNumber: random1,
            paymentNumber: random2
        });
    }

    hideBuyingDetails() {
        this.setState({ showBuyingDetails: false });
    }

   createPaymentandOrder = async(paymentMethod) => {
       console.log("Creating payment and order... with email: ", this.state.userEmail);
        const response = await fetch("api/createOrder", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ordernumber: this.state.orderNumber,
                date: this.getDate(),
                email: this.state.userEmail,
                listedprice: this.state.curRow.originalprice,
                propertynumber: this.state.curRow.propertynumber,
                status: "pending"
            })
        });
        const body = await response.text();
        console.log("Order has been created!");
        

        const createPaymentResponse = await fetch("api/createPayment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                paymentnumber: this.state.paymentNumber,
                ordernumber: this.state.orderNumber,
                method: paymentMethod,
                amount: this.state.curAmount
            })
        });
        const createPaymentResponseBody = await createPaymentResponse.text();
        console.log("Payment has been created!");

        this.hideBuyingDetails();
    }

    showDetails(e) {
        this.setState({
            showDetails: true,
            properties: e
        });
    }

    hideDetails(e) {
        this.setState({ showDetails: false });
    }

    showEditableDetails(e) {
        this.setState({
            showEditable: true,
            properties: e
        });
    }

    hideEditableDetails() {
        this.setState({ showEditable: false });
    }

    handleSaveEdit(propertyNumber, originalPrice, propertyAddress, yearBuilt, propertyType, totalBeds, totalBaths) {
        this.setState({
            properties: {
                propertynumber: propertyNumber,
                originalprice: originalPrice,
                propertyaddress: propertyAddress,
                yearbuilt: yearBuilt,
                propertytype: propertyType,
                totalbeds: totalBeds,
                totalbaths: totalBaths
            }
        }, () => {
            this.udpateProperty();
        });
        this.hideEditableDetails();
    }

    udpateProperty = async () => {
        fetch("/api/updateProperty", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                propertyNumber: this.state.properties.propertynumber,
                originalPrice: this.state.properties.originalprice,
                propertyAddress: this.state.properties.propertyaddress,
                yearBuilt: this.state.properties.yearbuilt,
                propertyType: this.state.properties.propertytype,
                totalBeds: this.state.properties.totalbeds,
                totalBaths: this.state.properties.totalbaths
            })
        });

        let newProperties = [];
        for (let property of this.props.properties) {
            if (property.propertynumber === this.state.properties.propertynumber) {
                property = this.state.properties;
            }
            newProperties.push(property);
        }
        this.props.updateProperties(newProperties);
    };

    handleDelete(e) {
        fetch("/api/deleteProperty", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                propertyNumber: e.propertynumber
            })
        });

        let newProperties = [];
        for (let property of this.props.properties) {
            if (property.propertynumber !== e.propertynumber) {
                newProperties.push(property);
            }
        }
        this.props.updateProperties(newProperties);
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
                        {this.props.editable
                            ? null
                            : <button onClick={() => this.showBuyingDetails(row.original)}>Buy</button>}
                        {this.props.editable
                            ? <button onClick={() => this.handleDelete(row.original)}>Delete</button>
                            : null}
                        {this.props.editable
                            ? <button onClick={() => this.showEditableDetails(row.original)}>Edit</button>
                            : <button onClick={() => this.showDetails(row.original)}>Details</button>}
                        {this.state.showDetails ? (
                            <DetailsModal
                                show={this.state.showEditable}
                                onHide={this.hideDetails}
                                item={this.state.properties}
                                readOnly={true}
                            />
                        ) : null}

                        {this.state.showEditable ? (
                            <DetailsModal
                                show={this.state.showEditable}
                                onHide={this.hideEditableDetails}
                                item={this.state.properties}
                                readOnly={false}
                                submitForm={this.handleSaveEdit}
                            />
                        ) : null}

                        {this.state.showBuyingDetails ? (
                            <BuyingDetailsModal
                                show={this.state.showBuyingDetails}
                                onHide={this.hideBuyingDetails}
                                paymentNumber={this.state.paymentNumber}
                                orderNumber={this.state.orderNumber}
                                submitForm={this.createPaymentandOrder}
                                curAmount={this.state.curAmount}
                                email={this.state.userEmail}
                            />
                        ) : null}
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
                    defaultFilterMethod={(filter, row) => String(row[filter.id] === filter.value)}
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