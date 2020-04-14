import React, { Component } from 'react'
import { Card, Image, Divider, Dropdown, Button } from 'semantic-ui-react'
import { setAuthedUser } from '../redux/actions/authedUser';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Logo from './logo.jpeg';

class Login extends Component {
    state = {
        userId:  null
    }
    static defaultProps = {
        authUser: null,
        location: null,
      }

    handleDropdownSelection = (e, data) => {
        e.preventDefault()
        const id = data.value
        this.setState(() => ({
            userId: id
        }))
    }
    handleLogin = (e) => {
        e.preventDefault()
        const { dispatch } = this.props
        if(this.state.userId !== null) {
            dispatch(setAuthedUser(this.state.userId))
        }
        else {
            // Todo
        }
    }

    render() {
        const { authedUser,location } = this.props
        const { from } = location.state || { from: { pathname: '/' }}
        if(authedUser !== null) {
            return (
                <Redirect to={from} />
            )
        }
        return(
        <div className='login-container' style={{textAlign: 'center'}}>
            <div className='login-card-container'>
            <Card fluid raised style={{height:'300px'}}>
                <div style={{height:'50px',justifyContent:'center',alignContent:'center',textAlign:'center',background:"#f1f1f1"}}>
                    <Card.Content style={{display:'flex',flexDirection:'column'}}>
                        <Card.Header style={{flex:'70%',marginTop:2}} className='ui header' textAlign='center'>Please Sign in to play!</Card.Header>
                    </Card.Content>
                </div>
                <div>
                    <Divider fitted/>
                </div>
                <div>
                    <Image src ={ Logo } size='small' centered />
                </div>
                <div>
                    <p style={{color:"hotpink", fontSize:'18px', fontWeight:'bold'}}>Sign In</p>
                </div>
                <div>
                    <Dropdown fluid style={{width:'95%',marginLeft:9,marginTop:10}} placeholder='Select User'  selection options={this.props.userDetails} onChange={this.handleDropdownSelection} />
                </div>
                <div>
                    <Button fluid color='pink' style={{ width:'95%',justifyContent:'center',marginTop:'20px', marginBottom:'20px',marginLeft:9}} onClick={this.handleLogin}>Sign In</Button>
                </div>
            </Card>
            </div>
        </div>
        )
    }
}

function mapStateToProps({users, authedUser}) {
    const userDetails = Object.keys(users)
        .map((user) => {
            const userStrippedDetails = {
                text: users[user].name,
                value: users[user].id,
                image: {
                    avatar: true,
                    src: users[user].avatarURL
                }
            }
            return(userStrippedDetails)
        })
    return {
        userDetails,
        authedUser
    }
}

export default connect(mapStateToProps)(Login)