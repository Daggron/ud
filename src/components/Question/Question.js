import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, CardContent, Image, Button } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'
import style from './Question.module.css'

class Question extends Component {
    handleViewPoll = (e) => {
        e.preventDefault()
        const {id,history} = this.props
        history.push({
            pathname: `/questions/${id}`,
            state:{id:id}
        })
    }

    render() {
        const {question,user,id} = this.props
        return (
            <Link to={`/questions/${id}`}>
            <div className={style.center} style={{padding:10}}>
                <Card fluid raised style={{paddingBottom:20}}>
                    <Card.Content style={{background:"#f1f1f1",height:40 }}>
                        <Card.Header>{user.name} says:</Card.Header>
                    </Card.Content>
                    <CardContent style={{height:110}}>
                        <Image src={user.avatarURL} size ='tiny' circular verticalAlign='middle' spaced='left'/>
                        <div className={style.divider}/>
                        <div className={style.info}>
                        <Card.Header className='ui header'>Would you rather!</Card.Header>
                        <Card.Description style={{marginBottom:8}}>.... {question.optionOne.text} ....</Card.Description>
                        <Button fluid basic color='pink' style={{height:30,fontSize:12}} onClick={this.handleViewPoll}>View Poll</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
            </Link>
        )
    }
}

function mapStateToProps({questions, users}, {id}) {
    const question = questions[id]
    const user = users[question.author]
    return {
        question,
        user
    }
}

export default withRouter(connect(mapStateToProps)(Question))