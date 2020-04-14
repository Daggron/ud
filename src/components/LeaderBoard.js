import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Card,Image,Label} from 'semantic-ui-react'
import { Redirect } from 'react-router-dom';

class LeaderBoard extends Component {
    render() {
        const {usersDetails,authedUser} = this.props;
        if(!authedUser) return <Redirect to="/login" />
        return(
            <div className='leaderboard-list-container'>
                { usersDetails.map((user) => (
                    <li key={user.name} >
                    <div className='leaderboard-card-container'>
                        <Card fluid raised style={{height:'140px'}}>
                            <Card.Content className='leaderboard-card-content'>
                            <div style={{display:'flex',height:'110px',width:'20%',justifyContent:'center',alignItems:'center'}}>
                                <Image src={user.avatarURL} size ='tiny' circular verticalAlign='middle' spaced='left'/>
                            </div>
                            <div style={{width:'60%',height:'110px'}}>
                                <div className='divider-leaderboard-left'></div>
                                <Card.Content style={{display:'flex',flexDirection:'column',paddingLeft:25,paddingRight:30}}>
                                    <Card.Header className='ui header' style={{fontSize:25}}>{user.name}</Card.Header>
                                    <div style={{display:'flex',flexDirection:'row',paddingTop:'10px'}}>
                                        <p style={{textAlign:'left',flex:'90%'}}>Answered questions</p>
                                        <p style={{textAlign:'right',flex:'10%'}}>{user.questionsAnswered}</p>
                                    </div>
                                    <div style={{display:'flex',flexDirection:'row',paddingTop:'5px'}}>
                                        <p style={{textAlign:'left',flex:'90%'}}>Created questions</p>
                                        <p style={{textAlign:'right',flex:'10%'}}>{user.createdQuestions}</p>
                                    </div>
                                </Card.Content>
                                <div className='divider-leaderboard-right'></div>
                            </div>
                            <div style={{width:'20%'}}>
                                <Card centered style={{height:'110px'}}>
                                    <Card.Header className='ui header' textAlign='center' style={{height:30,marginTop:8}}>Score</Card.Header>
                                    <Card.Content style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                        <Label circular color='pink' size='huge'>{user.rank}</Label>
                                    </Card.Content>
                                </Card>
                            </div>
                            </Card.Content>
                        </Card>
                        </div>
                    </li>
                ))}
            </div>
        )
    }
}

function mapStateToProps({users,authedUser}) {
    const usersDetails = Object.keys(users)
        .map((user) => {
            const userCardDetails = {
                name: users[user].name,
                avatarURL: users[user].avatarURL,
                questionsAnswered: Object.keys(users[user].answers).length,
                createdQuestions: users[user].questions.length
            }
            const rank = userCardDetails.questionsAnswered + userCardDetails.createdQuestions
            userCardDetails.rank = rank;
            return(userCardDetails)
        })
        .sort((a,b) => (b.rank - a.rank))
    return {
        usersDetails,
        authedUser
    }
}

export default connect (mapStateToProps)(LeaderBoard)