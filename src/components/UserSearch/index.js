import React from 'react'
import styles from "./UserSearch.module.css";
import Button from '../Button';
import Input from '../Input';

class UserSearch extends React.Component{
  state = {
    value: this.props.user
  }
  handleChange = e => {
    this.setState({value: e.target.value})
  }
  onSubmit = e => {
    this.props.onUserSearch(this.state.value)
    e.preventDefault()
  }
  render(){
    const {value} = this.state
    return (
      <div className={styles.userSearch}>
        <form className={styles.form} onSubmit={this.onSubmit}>
          <Input 
            placeholder={"Search Users"}
            handleChange={this.handleChange}
            value={value}
          />
          <Button type={"submit"}>
            Search
          </Button>
        </form>
      </div>
    )
  } 
}

export default UserSearch
