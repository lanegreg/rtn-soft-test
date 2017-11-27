
import React, { Component } from 'react'


const formatDate = date => {
	let dt = new Date(date),
			datetime = `${dt.toDateString().replace(' ',', ')} at ${dt.toLocaleTimeString().toLowerCase()}`

	return `${datetime.substr(0,datetime.lastIndexOf(':'))}${datetime.substr(-2)}`
}



class Card extends Component {
	constructor(props) {
		super(props)
		this.onCloseClick = this._handleCloseClick.bind(this)
  }

	_handleCloseClick({ target: { id } }) {
		document.getElementById(id).parentNode.parentNode.style.display = 'none'
	}


	render() { 
		const { tweet } = this.props
		return (
			<div className="col-lg-6">
				<div className="card">
					<span className="close" 
								id={tweet.id} onClick={this.onCloseClick}>X</span>
					<p className="author"><b>{tweet.author}</b></p>
					{tweet.media && <p className="media"><img src={tweet.media} alt="" /></p>}
					<p className="description" dangerouslySetInnerHTML={{ __html: tweet.description }}></p>
					<p className="date">{formatDate(tweet.date)}</p>
				</div>
			</div>
		)
	}
}


export default Card
