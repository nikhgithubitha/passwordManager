import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import './App.css'

class App extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    list: [],
    searchValue: '',
    isTrue: false,
    isShow: false,
  }

  changeWebsite = event => {
    this.setState({website: event.target.value})
  }

  changeUsername = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  submitForm = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const newItem = {
      id: uuidv4(),
      website,
      username,
      password,
    }
    this.setState(prevValue => ({
      list: [...prevValue.list, newItem],
      website: '',
      username: '',
      password: '',
      searchValue: '',
      isTrue: true,
    }))
  }

  showPassword = event => {
    if (event.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  changeSearch = event => {
    this.setState({searchValue: event.target.value})
  }

  deleteItem = id => {
    const {list} = this.state
    const filteredList = list.filter(each => each.id !== id)
    const caseOf = filteredList.length !== 0
    this.setState({list: filteredList, isTrue: caseOf})
  }

  render() {
    const {website, username, password, searchValue, list, isShow} = this.state
    const {isTrue} = this.state
    const newList = list.filter(each =>
      each.website.toLowerCase().includes(searchValue.toLowerCase()),
    )

    return (
      <div className="pro">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="style"
        />
        <div className="card">
          <div>
            <form onSubmit={this.submitForm}>
              <h1>Add New Password</h1>
              <div className="hor">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png "
                  alt="website"
                />
                <input
                  placeholder="Enter Website"
                  type="text"
                  onChange={this.changeWebsite}
                  value={website}
                />
              </div>
              <div className="hor">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png "
                  alt="username"
                />
                <input
                  placeholder="Enter Username"
                  type="text"
                  onChange={this.changeUsername}
                  value={username}
                />
              </div>
              <div className="hor">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png "
                  alt="password"
                />
                <input
                  placeholder="Enter Password"
                  type="password"
                  onChange={this.changePassword}
                  value={password}
                />
              </div>
              <button type="submit">Add</button>
            </form>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="sizing"
          />
        </div>
        <div>
          <h1>Your Passwords</h1>
          <p>{newList.length}</p>
          <div className="hro">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
              alt="search"
            />
            <input
              type="search"
              value={searchValue}
              placeholder="Search"
              onChange={this.changeSearch}
            />
          </div>
          <hr />
          <input type="checkbox" id="check" onChange={this.showPassword} />
          <label htmlFor="check">Show passwords</label>
          {!isTrue && (
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
              />
              <p>No Passwords</p>
            </div>
          )}
          {isTrue && (
            <ul>
              {newList.map(each =>
                each(
                  <li key={each.id} id={each.id}>
                    <p>{each.website}</p>
                    <p>{each.username}</p>
                    {!isShow && (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        alt="stars"
                      />
                    )}
                    {isShow && <p>{each.password}</p>}
                    <button
                      type="button"
                      onClick={this.deleteItem}
                      data-testid="delete"
                    >
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                        alt="delete"
                      />
                    </button>
                  </li>,
                ),
              )}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
