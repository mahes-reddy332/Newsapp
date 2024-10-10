import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title,description,imageUrl,newsUrl,date,author,source}=this.props;
    return (
      <div className="card" style={{width: "18rem" }}>
        <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:'85%'}}>
          {source}
              <span class="visually-hidden">unread messages</span>
            </span>
        <img src={!imageUrl?"https://cdn.abcotvs.com/dip/images/15300346_tesla-fire.png?w=1600":imageUrl}/>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className='card-text'><small className='text-success'>By{!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Go somewhere</a>
          </div>
    </div>
    )
  }
}

export default NewsItem
