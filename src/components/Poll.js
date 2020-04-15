import React, { Component } from 'react'
import { Card, Image, Checkbox, Button, Progress,Label,Message} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { handleAddAnswer } from '../redux/actions/questions';
import { withRouter, Redirect } from 'react-router-dom'
import Error404 from './Error/Error404';
import style from './Poll.module.css';

class Poll extends Component {
    state = {
        selectedCheckbox: ''
    }

    handleChange = (e, {value}) => {
        this.setState({selectedCheckbox:value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const {dispatch,authedUser,id} = this.props
        const {selectedCheckbox} = this.state

        if(selectedCheckbox !== null) {
            dispatch(handleAddAnswer({
                authedUser:authedUser,
                questionId: id,
                answer:selectedCheckbox
            }))
        }
    }

    render() {
        const {question,authorAvatar,isError,userName,answer} = this.props
        if(isError) {
            return (
                <div>
                    <Error404 />
                </div>
            )
        }
        let isVotedOptionOne=false
        let isVotedOptionTwo =false
        let optOneColor = 'grey'
        let optTwoColor = 'grey'
        let optOneVotes = question.optionOne.votes.length
        let optTwoVotes = question.optionTwo.votes.length
        let totalVotes = optOneVotes + optTwoVotes
        let hasQuestionNotAnswered = true
        if(answer!==null){
            hasQuestionNotAnswered = false
            if(answer==='optionOne') {isVotedOptionOne=true; optOneColor='pink'}
            if(answer==='optionTwo') {isVotedOptionTwo=true; optTwoColor='pink'}
        }
        const {authedUser} = this.props;
        if(!authedUser) return <Redirect to="/" />
        return(
            <div>
            { hasQuestionNotAnswered ?
            (<div className={style.container}>
            <div className={style.unanswered}>
                <Card fluid raised style={{height:'230px'}}>
                    <div style={{display:'flex',background:'#f1f1f1',height:40,alignItems:'center'}}>
                        <Card.Header textAlign='left' className='ui header' style={{ fontSize:17,marginLeft:'15px'}}>{userName} Asks:</Card.Header>
                    </div>
                    <Card.Content className={style.puac}>
                        <div style={{display:'flex',height:'160px',width:'35%',justifyContent:'center',alignItems:'center'}}>
                            <Image src = {authorAvatar} size ='small' circular verticalAlign='middle' spaced='right'/>
                        </div>
                        <div style={{width:'65%',marginLeft:'15px'}}>
                            <div>
                                <Card.Header className='ui header' style={{fontSize:22}}>Would You Rather ...</Card.Header>
                            </div>
                            <div style={{display:'flex',flexDirection:'column',paddingTop:'20px'}}>
                                <Checkbox radio name='checkboxOne' label={question.optionOne.text} value='optionOne' checked={this.state.selectedCheckbox === 'optionOne'} onChange={this.handleChange}/>
                                <Checkbox radio name='checkboxTwo' style={{paddingTop:'15px'}} label={question.optionTwo.text} value='optionTwo' checked={this.state.selectedCheckbox === 'optionTwo'} onChange={this.handleChange}/>
                            </div>
                            <Button fluid color='pink' style={{ justifyContent:'center',marginTop:'20px', marginBottom:'10px'}} onClick={this.handleSubmit}>Submit</Button>
                        </div>
                    </Card.Content>
                </Card>
            </div>
            </div>)

            : (<div className={style.container}>
                <div className={style.pac}>
                    <Card fluid raised style={{height:'340px'}}>
                        <div style={{display:'flex',background:'#f1f1f1',height:40,alignItems:'center'}}>
                            <Card.Header textAlign='left' className='ui header' style={{ fontSize:17,marginLeft:'15px'}}>Asked by {userName}</Card.Header>
                        </div>
                        <Card.Content className={style.cardContent}>
                            <div style={{display:'flex',height:'265px',width:'35%',justifyContent:'center',alignItems:'center'}}>
                                <Image src = {authorAvatar} size ='medium' circular verticalAlign='middle' spaced='right'/>
                            </div>
                            <div style={{width:'65%',marginLeft:'15px'}}>
                                <div>
                                    <Card.Header className='ui header' style={{fontSize:22}}>Results:</Card.Header>
                                </div>
                                <div className='message info'>
                                    <Message color={optOneColor} style={{marginTop:'10px',height:'115px'}}>
                                        <div>{ isVotedOptionOne ?
                                            <Label circular floating color='pink'>Your Vote</Label> : <div></div> }
                                                <div style={{display:'flex',flexDirection:'column'}}>
                                                    <Message.Header className='ui header' style={{fontSize:14,marginBottom:0,flex:'40%'}}>{question.optionOne.text}</Message.Header>
                                                    <Progress value={optOneVotes} total={totalVotes} progress='percent' precision={1} color='pink' style={{marginBottom:0,marginTop:'25px',flex:'40%'}}/>
                                                    <Message.Header className='ui header' style={{fontSize:12,textAlign:'center',marginTop:0,flex:'20%',color:'black'}}>{optOneVotes} out of {totalVotes} votes</Message.Header>
                                            </div>
                                        </div>
                                    </Message>
                                </div>
                                <div>
                                    <Message color={optTwoColor} style={{marginTop:'10px',height:'115px'}}>
                                        <div> {isVotedOptionTwo ?
                                            <Label circular floating color='yellow'>Your Vote</Label> : <div></div> }
                                                <div style={{display:'flex',flexDirection:'column'}}>
                                                    <Message.Header className='ui header' style={{fontSize:14,marginBottom:0,flex:'40%'}}>{question.optionTwo.text}</Message.Header>
                                                    <Progress value={optTwoVotes} total={totalVotes} progress='percent' color='pink' precision={1} style={{marginBottom:0,marginTop:'25px',flex:'40%'}}/>
                                                    <Message.Header className='ui header' style={{fontSize:12,textAlign:'center',marginTop:0,flex:'20%',color:'black'}}>{optTwoVotes} out of {totalVotes} votes</Message.Header>
                                                </div>
                                            </div>
                                    </Message>
                                </div>
                            </div>
                        </Card.Content>
                    </Card>
                </div>
                </div>) }
        </div>
        )
    }
}

function mapStateToProps({authedUser, questions, users},{match}) {
    if(questions[match.params.question_id] === undefined) {
        const isError = true;
        return {
            isError
        }
    }
    const userName = users[questions[match.params.question_id].author].name
    const id = match.params.question_id
    const question = questions[id]

    let answer=''
    if(question.optionOne.votes.includes(authedUser)) {
        answer = 'optionOne'
    } else if (question.optionTwo.votes.includes(authedUser)) {
        answer = 'optionTwo'
    } else {
        answer = null
    }
    const authorAvatar = users[question.author].avatarURL
    const isError = false
    return {
        id,
        question,
        answer,
        authedUser,
        userName,
        authorAvatar,
        isError
    }
}

export default withRouter(connect(mapStateToProps)(Poll))