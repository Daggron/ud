import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Card,Image,Label} from 'semantic-ui-react'
import { Redirect } from 'react-router-dom';
import style from './LeaderBoard.module.css';

class LeaderBoard extends Component {
    render() {
        const {usersDetails,authedUser} = this.props;
        if(!authedUser) return <Redirect to="/login" />

        return(
            <div className={style.container}>
                { usersDetails.map((user) => (
                    <li key={user.name} >
                    <div className={style.card}>
                        <Card fluid raised style={{padding: 10}}>
                            <Card.Content className={style.cardContent}>
                            <div>
                                <Image src={user.avatarURL} size ='tiny' circular verticalAlign='middle' spaced='left'/>
                            </div>
                            <div style={{width:'60%',height:'110px'}}>
                                <div className={style.dividerLeft} />
                                <div style={{display:'flex',flexDirection:'column',paddingLeft:25,paddingRight:30}}>
                                    <Card.Header className='ui header' style={{fontSize:25,color:'hotpink'}}>{user.name}</Card.Header>
                                    <div className={style.body}>
                                        <p>Answered questions</p>
                                        <p>{user.questionsAnswered}</p>
                                    </div>
                                    <div className={style.body}>
                                        <p>Created questions</p>
                                        <p>{user.createdQuestions}</p>
                                    </div>
                                </div>
                                <div className={style.dividerRight} />
                            </div>
                            <div style={{width:'20%'}}>
                                <Card centered style={{height:'110px'}}>
                                    <Card.Header style={{textAlign:'center',fontSize:20,height:30,marginTop:5}}>Score</Card.Header>
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