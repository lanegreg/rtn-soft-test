
import React, { Component } from 'react'
import debounce from 'javascript-debounce'
import { createService } from './services/api'
import Card from './Card'
import Spinner from './Spinner'


const formatDate = date => `${date.toDateString().replace(' ',', ')} at ${date.toLocaleTimeString().toLowerCase()}`


class App extends Component {
  constructor(props) {
    super(props)
    this.service = createService(({ tweets, fetchedOn }) => this.setState({ 
      fetchedOn: formatDate(new Date(fetchedOn)),
      querying: false,
      tweets
    }))

    this.inputNode = null
		this.onQueryChange = this._handleQueryChange.bind(this)
		this.onQueryFocus = this._handleQueryFocus.bind(this)

		//- initial state
		this.state = { 
      fetchedOn: '',
			querying: false, 
			inputValue: '', 
      tweets: []
    }
    
    
    const queryCardsDebounce = debounce(() => {
      let { inputValue } = this.state

      if(inputValue.length) {
        this.setState({ querying: true, tweets: [] })
        this.service.search(inputValue)
      }
    }, 1400)

    this._queryCards = () => {
      queryCardsDebounce()
    }
  }
  

  //- private funcs
	_highlightInput() {
		let { inputNode } = this

		if(inputNode) {
			inputNode.focus()
			inputNode.select()
		}
	}

	_handleQueryChange({ target }) {
		this.setState({ inputValue: target.value })
		this._queryCards()
	}

	_handleQueryFocus() {
		this._highlightInput()
	}



	// lifecycle funcs
	componentWillMount() {
		this._queryCards()
	}

	componentDidMount() {
		this.inputNode = document.getElementById('query')
		this._highlightInput()
	}

	componentDidUpdate() {
		setTimeout(() => {
			this.state.querying && this._highlightInput()
		}, 1000)
	}


  render() {
    return (
			<div>
				<div className="jumbotron">
					<div className="container">
						<div className="col-md-8"><h1>FEED ME TWEETS</h1></div>
						<div className="col-md-4">
							<form onSubmit={e => e.preventDefault()}>
								<input type="text" name="search" id="query" autoFocus
											placeholder="Search" autoComplete="off"
											className="form-control" 
											value={this.state.inputValue}
											onChange={this.onQueryChange}
											onFocus={this.onQueryFocus} />
							</form>
						</div>
					</div>
				</div>
				<div className="container">
          <span>fetched on: {this.state.fetchedOn}</span>
					{this.props.timestamp}
					{this.state.querying && <Spinner />}
					<div className="container-fluid">
						{this.state.tweets.map(tweet => <Card key={tweet.id} tweet={tweet} />)}
					</div>
				</div>
			</div>
    )
  }
}

export default App
