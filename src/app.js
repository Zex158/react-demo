import React from 'react'
import axios from 'axios'
import { hot } from 'react-hot-loader/root'
class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: null,
      isLoaded: false
    }
  }
  componentDidMount() {
    const _this = this
    axios
      .get('/api/example')
      .then(function(response) {
        _this.setState({
          status: response.status
        })
      })
      .catch(function(error) {
        console.log(error)
        _this.setState({
          status: 'failed'
        })
      })
  }
  render() {
    return (
      <div>
        <p> load {this.state.status} </p>
      </div>
    )
  }
}

export default hot(App)
