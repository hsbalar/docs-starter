import React, { Component } from 'react';
import axios from 'axios';

import { BaseURL, INSTANCES, User, Organization } from '../reference/api.constant';

class Home extends Component {
  
  state = {
    data: [],
    loading: false
  }

  componentDidMount() {
    this.setState({ loading: true });
    axios.get(`${BaseURL}${INSTANCES}`, {
      headers: { 'Authorization': `User ${User}, Organization ${Organization}` }
    })
    .then(res => {
      this.setState({ data: res.data.data, loading: false });        
    })
    .catch(res => {
      this.setState({ loading: false });
    })
  }

  getImageUrl = (logo) => {
    return `https://my-staging.cloudelements.io/assets/img/elements/${logo}.svg`
  }

  instanceClick(row) {
    this.props.history.push(`/contents/${row.token}`)
  }

  render() {
    return (
    <div>
      <div
        className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h3 className="h2">Element Instances</h3>
      </div>
      <div className="card-columns">
        {this.state.loading && 
          <div className="loaders">
            <div className="loader circle-loader-1"></div>
          </div>
        }
        { this.state.data.map(row =>
          <div className="card point instance" key={row.id} onClick={() => this.instanceClick(row)}>
            <img src={this.getImageUrl(row.element.logo)} className="card-img-top" alt="..." height="150px;"/>
            <div className="card-body">
              <h5 className="card-title">{row.element.name}</h5>
              { row.tags.map(i => <span key={i} className="badge badge-secondary">{i}</span>) }
            </div>
          </div>
        )}
      </div>
    </div>
    )
  }
}

export default Home;