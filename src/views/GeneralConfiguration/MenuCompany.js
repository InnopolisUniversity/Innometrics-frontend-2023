import React, {Component} from 'react'
import {
  Card,
  Badge,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Button
} from 'reactstrap'
import {withRouter} from 'react-router-dom'

import {connect} from 'react-redux'
import {fromJS} from 'immutable'
import {getData, localStorageKey} from "../../redux/utils";
import {actionCreator} from "../../redux/generalConfiguration/action-creators";

class MenuCompany extends Component {
  state = {companies: []}
  createNewCompany = () => {
    this.props.history.push(this.props.history.location.pathname + '/create')
  }
  goToCompany = (id) => {
    this.props.history.push(this.props.history.location.pathname + '/' + id)
  }
  componentDidMount(){
    const token = getData(localStorageKey).token;
    actionCreator.fetchCompanies(token)(this.props.dispatch)
  }
  badge = (status)=>{
    if(status === "Y")return(<Badge color="success">Active</Badge>);
    else return(<Badge color="danger">Not active</Badge>)
  }
  render() {
    const companies = this.props.companies
    companies.sort((a,b)=>a.companyid - b.companyid)
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
            <Card>
              <CardHeader>
                List of companies
              </CardHeader>
              <CardBody>
                <Table responsive striped hover>
                  <tbody>
                  <tr>
                    <td><strong>Company id</strong></td>
                    <td><strong>Company Name</strong></td>
                    <td><strong>Update By</strong></td>
                    <td><strong>Is Active</strong></td>
                  </tr>
                  {companies.map((value, idx) => {
                    return (
                      <tr key={idx} onClick={()=>{this.goToCompany(value.companyid)}}>
                        <td>{value.companyid}</td>
                        <td>{value.companyname}</td>
                        <td>{value.updateby}</td>
                        <td>{this.badge(value.isactive)}</td>
                      </tr>
                    )
                  })}
                  </tbody>
                </Table>
                <Button color="primary" onClick={this.createNewCompany}>Create New Company</Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default withRouter(
  connect((state) => ({
    companies: fromJS(state.configuration.get('companies')).toJS(),
  }))(MenuCompany),
)
