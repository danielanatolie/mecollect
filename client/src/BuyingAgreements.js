import React, { Component, Fragment } from "react";
import "./App.css";
import Header from "./Header.js";
import ReactTable from "react-table";
import "react-table/react-table.css";

class BuyingAgreements extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buyingAgreements: null,
      search: "",
      user_permissions: null,
      is_agent: false
    };
  }

  componentDidMount() {
    this.getUserPermissions()
      .then(data => {
        this.setState({ user_permissions: data });
      })
      .catch(err => {});

    this.getBuyingAgreements()
      .then(data => this.setState({ buyingAgreements: data }))
      .catch(err => console.log(err));
  }

  approveAgreement = async propertyNum => {
    //console.log(propertyNum);
    const response = await fetch("/api/approve_agreement", {
      method: "POST",
      body: JSON.stringify({
        propertyNumber: propertyNum
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (response.status === 200) window.location.reload();
  };
  getUserPermissions = async () => {
    var email = window.user_email;

    const response = await fetch("/api/permissions", {
      method: "POST",
      body: JSON.stringify({
        user_email: email
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const body = await response.json();
    if (response.status === 200) {
      this.setState({
        user_permissions: body.data[0].permissions
      });
      if (this.state.user_permissions === "agent") {
        this.setState({
          is_agent: true
        });
      }
    }
  };

  getBuyingAgreements = async () => {
    const response = await fetch("/api/agreements", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const body = await response.json();
    if (response.status === 200) {
      return body.data;
    }
  };

  approveAgreement = async propertyNum => {
    const response = await fetch("/api/approve_agreement", {
      method: "POST",
      body: JSON.stringify({
        propertyNumber: propertyNum
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (response.status === 200) window.location.reload();
  };

  sendAgreementForm = async (propertyNum, price, date, orderNum) => {
    const response = await fetch("/api/send_agreement_form", {
      method: "POST",
      body: JSON.stringify({
        title: "Buying Agreement Summary",
        price: price,
        date: date,
        ordernumber: orderNum,
        propertynumber: propertyNum
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
  };

  render() {
    let data = this.state.buyingAgreements;
    if (this.state.search && data != null) {
      data = data.filter(row => {
        return (
          String(row.date).includes(this.state.search) ||
          String(row.ordernumber).includes(this.state.search)
        );
      });
    }
    const columns = [
      {
        Header: "Order #",
        accessor: "ordernumber",
      },
      {
        Header: "Property #",
        accessor: "propertynumber",
      },
      {
        Header: "Date Purchased",
        accessor: "date",
      },
      {
        Header: "Final Price",
        Cell: props => (
          <Fragment>
            {/* <span>Listed price: $</span> */}
            <span>${props.original.listedprice} CAD</span>
            {/* <br />
            <span>Buyer e-mail: </span>
            <span className="buyer account">{props.original.email}</span> */}
          </Fragment>
        ),
        filterable: false,
        sortable: false,
      },
      {
        Header: "Status",
        Cell: props => (
          <span>
            <span
              style={{
                color:
                  props.original.status === "pending" ? "#ffbf00" : "green",
                transition: "all .5s ease"
              }}
            >
              &#x25cf;
            </span>{" "}
            {props.original.status === "pending" ? "Pending" : "Approved"}
            <br />
            {props.original.status === "pending" ? (
              <button
                disabled={!this.state.is_agent}
                onClick={e => {
                  if (props.original.status === "pending") {
                    this.approveAgreement(props.original.propertynumber);
                    this.sendAgreementForm(
                      props.original.propertynumber,
                      props.original.listedprice,
                      props.original.date,
                      props.original.ordernumber
                    );
                  }
                }}
              >
                Approve
              </button>
            ) : null}
          </span>
        ),
        filterable: false,
        sortable: false,
      }
    ];

    if (data) {
      return (
        <div>
          <Header />
          <h1 style={{textAlign: 'center'}}>Buying Agreements</h1>
          <p style={{textAlign: 'center'}}>Check the status of any buying agreement.</p>
          Search:{" "}
          <input
            placeholder="Order #, Date"
            value={this.state.search}
            onChange={e => this.setState({ search: e.target.value })}
          />
          <br />
          <br/>
          <ReactTable
            className="-striped -highlight"
            columns={columns}
            data={data}
            sortable={true}
            order={["ordernumber"]}
            defaultSorted={[
              {
                id: "ordernumber",
                acsc: true
              }
            ]}
          />
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default BuyingAgreements;
