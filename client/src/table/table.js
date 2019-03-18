import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import DetailsModal from '../DetailsModal.js';

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDetails: false,
            showEditable: false,
            properties: null,
            newProperties: this.props.properties
        };
        this.showDetails = this.showDetails.bind(this);
        this.hideDetails = this.hideDetails.bind(this);
        this.showEditableDetails = this.showEditableDetails.bind(this);
        this.hideEditableDetails = this.hideEditableDetails.bind(this);
        this.handleSaveEdit = this.handleSaveEdit.bind(this);
    }

    handleBuy() {

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
                        {this.props.editable
                            ? null
                            : <button onClick={() => this.handleBuy(row.original)}>Buy</button>}
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