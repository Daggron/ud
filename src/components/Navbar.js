import React, {Component} from 'react'
import { Menu, Image} from 'semantic-ui-react'
import { NavLink,withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import {logOut} from '../redux/actions/authedUser'
import Logo from './logo.jpeg'

class Navbar extends Component {

    handleLogout = (e, { name }) =>{
        const {history} = this.props
        e.preventDefault()
        if(name==='logOut'){
            this.props.dispatch(logOut())
            history.push('/login')
        }
    }

    handleDropdownLogoutClick = (e, {name}) => {
        const {history} = this.props
        e.preventDefault()
        this.props.dispatch(logOut())
        history.push('/login')
    }

    render() {
        const {authedUser,users} = this.props
        const user = users[authedUser]
        return(
        <div>
            <div>
                <Menu stackable pointing secondary>
                    <Menu.Item as={NavLink} name='home' exact to='/' color='pink' >
                        Home
                    </Menu.Item>
                    <Menu.Item as={NavLink} name='newQuestion' exact to='/add' color='pink'>
                        New Question
                    </Menu.Item>
                    <Menu.Item as={NavLink} name='leaderBoard' exact to='/leaderboard' color='pink'>
                        Leader Board
                    </Menu.Item>
                    {authedUser ?
                    <Menu.Menu position='right'>
                        <Menu.Item name='username' >
                            Hello, {user.name}
                        </Menu.Item>
                        <Image style={{marginTop:'0.35em'}} avatar src={user!== 'undefined' ? user.avatarURL : Logo}/>
                        <Menu.Item as={NavLink} name='logOut' exact to='/login' color='pink' onClick={this.handleLogout}>
                            Log Out
                        </Menu.Item>
                   </Menu.Menu>: <div></div>}
                </Menu>
            </div>
        </div>
        )
    }
}

function mapStateToProps ({authedUser,users}) {
    return {
        authedUser,
        users
    }
}

export default withRouter(connect(mapStateToProps)(Navbar))