import React, { Component } from 'react';
import axios from 'axios';

import { BaseURL, CONTENTS, FILES, User, Organization } from '../reference/api.constant';

const cardFontStyle = { paddingTop: '20px' };
const cardStyle = { textAlign: 'center' };
const uploadWidth = { width: '100%' };
const fileStyle = { display: 'none' };

class Contents extends Component {
  
  state = {
    data: [],
    loading: false,
    uploading: false,
    fileUpload: {
      percentage: null,
      success: false
    },
    activeBreadcrumbItem: {
      name: 'Home',
      path: '/',
      id: 'home'
    },
    breadcrumbItems: [{
      name: 'Home',
      path: '/',
      id: 'home'
    }]
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.getContents();
  }
  
  getSubContents = (id) => {
    this.setState({ loading: true });
    axios.get(`${BaseURL}${CONTENTS}/${id}`, {
      headers: { 'Authorization': `User ${User}, Organization ${Organization}, Element ${this.props.match.params.id}` }
    })
    .then(res => {
      this.setState({ data: res.data.data, loading: false });      
    }).catch(err => { this.setState({ loading: false }); });
  }

  getContents = () => {
    this.setState({ loading: true });
    axios.get(`${BaseURL}${CONTENTS}?path=/`, {
      headers: { 'Authorization': `User ${User}, Organization ${Organization}, Element ${this.props.match.params.id}` }
    })
    .then(res => {
      this.setState({ data: res.data.data, loading: false });  
    }).catch(err => { this.setState({ loading: false }); });    
  }

  itemClick = (el) => {
    if (el.directory) {
      this.getSubContents(el.id);
      this.setState({ activeBreadcrumbItem: el, breadcrumbItems: [...this.state.breadcrumbItems, el] });
    } else {
      this.getFile(el);
    }
  }

  breadcrumbItemClick = (item, index) => {
    if (item.id == this.state.activeBreadcrumbItem.id) return;
    if (item.path == '/') {
      this.getContents();
    } else {
      this.getSubContents(item.id);
    }
    this.state.breadcrumbItems.splice(index + 1, this.state.breadcrumbItems.length - (index + 1) );
    this.setState({ activeBreadcrumbItem: item, breadcrumbItems: [...this.state.breadcrumbItems] });
  }

  getFile = (item) => {
    axios.get(`${BaseURL}${FILES}/${item.id}`, {
      headers: { 'Authorization': `User ${User}, Organization ${Organization}, Element ${this.props.match.params.id}` }
    })
    .then(data => {
      const blob = new Blob([data], { type: 'application/octet-stream' });
      let fileName = item.name;
      let url = URL.createObjectURL(blob);
      let link = document.createElement("a");
      if (link.download !== undefined) {
        link.setAttribute("href", url);
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }).catch(err => {});
  }

  uploadFileClick = () => {
    document.getElementById('upload-file').click();
  }

  uploadFileChange = (e) => {
    let formData = new FormData();
    this.setState({ uploading: true });
    let files = e.target.files;
    formData.append('file', files[0]);
    axios.post(`${BaseURL}${FILES}?path=${this.state.activeBreadcrumbItem.path}`, formData, {
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        'Authorization': `User ${User}, Organization ${Organization}, Element ${this.props.match.params.id}` }
    })
    .then(data => {
      this.setState({ uploading: false });
      if (this.state.activeBreadcrumbItem.path == '/') {
        this.getContents();
      } else {
        this.getSubContents(this.state.activeBreadcrumbItem.id)
      }
    }).catch(err => {
      this.setState({ uploading: false });
    })
  }

  instanceClick() {
    this.props.history.push(`/`);
  }

  render() {
    return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h3 className="h2"><a href="#" onClick={() => this.instanceClick()}>Instances </a> | Contents</h3>
        <div className="btn-toolbar mb-2 mb-md-0">
          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => this.uploadFileClick()}>
            <i className="fa fa-upload"></i> Upload File
          </button>
          <input type="file" style={fileStyle} onChange={this.uploadFileChange} id="upload-file"/>
        </div>
      </div>
      {this.state.uploading &&
        <div className="progress">
          <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={uploadWidth} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
            Uploading file...
          </div>
        </div>
        }
      <br/>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
        { this.state.breadcrumbItems.map((el, i) => 
          <li key={i} className={`breadcrumb-item ${el.id == this.state.activeBreadcrumbItem.id ? 'active' : ''}`}>
            <a href="#" onClick={() => this.breadcrumbItemClick(el, i)}>{el.name}</a>
          </li>
        )}
        </ol>
      </nav>

        {this.state.loading && 
          <div className="loaders">
            <div className="loader circle-loader-1"></div>
          </div>
        }
      <div className="row">
        { this.state.data.map(row =>
          <div className="col-md-3" key={row.id}>
            <div className="card mb-3 shadow-sm">
              <div className="bd-placeholder-img card-img-top" style={cardStyle}>
                { row.properties && row.properties.thumbnailLink &&
                  <img src={row.properties.thumbnailLink} width="100%" height="100" alt=""/>
                }
                {row.directory && <i className="fa fa-folder-o fa-4x" style={cardFontStyle}></i>}
              </div>
              <div className="card-body">
                <p className="card-text">{row.name}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => this.itemClick(row)}>{row.directory ? 'View' : 'Download'}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    )
  }
}

export default Contents;