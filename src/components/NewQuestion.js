import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Card, Input, Button } from 'semantic-ui-react'
import { handleAddQuestion } from '../redux/actions/questions';
import { Redirect } from 'react-router-dom';

class NewQuestion extends Component {
    state = {
        optionOneText:'',
        optionTwoText:''
    }
     handleSubmit = (e) => {
        e.preventDefault()
        const {dispatch, authedUser, history} = this.props
        const {optionOneText,optionTwoText} = this.state

        if(optionOneText&&optionTwoText) {
            dispatch(handleAddQuestion({optionOneText,optionTwoText,authedUser}))
        }

        history.push('/');
    };

    handleInputOneChange = (e, data) => {
        e.preventDefault()
        this.setState({
            optionOneText:data.value
        })
    };

    handleInputTwoChange = (e, data) => {
        e.preventDefault()
        this.setState({
            optionTwoText:data.value
        })
    };

    render() {
        const {authedUser} = this.props;
        if(!authedUser) return(
            <Redirect to="/login" />
        )
        return(
            <div className='add-new-question-form'>
                <Card fluid>
                    <Card.Header  textAlign='center' style={{ marginTop:7.5, marginBottom:0,height:40, fontSize:25}} className='ui header'>Add A New Question</Card.Header>
                    <Card.Content>
                        <Card.Description ></Card.Description>
                        <Card.Header  style={{marginTop:'20px', marginBottom:'10px'}}>Would you rather ...</Card.Header>
                        <Input fluid placeholder='Enter Option One Text Here' style={{marginTop:'20px'}}  onChange={this.handleInputOneChange}></Input>
                        <h3 style={{textAlign:'center'}}>
                            OR
                        </h3>
                        <Input fluid placeholder='Enter Option Two Text Here' onChange={this.handleInputTwoChange}></Input>
                        <Button fluid color='pink' style={{ justifyContent:'center',marginTop:'20px', marginBottom:'10px'}} onClick={this.handleSubmit}>Submit</Button>
                    </Card.Content>
                </Card>
            </div>
        )
    }
}

function mapStateToProps({authedUser}) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(NewQuestion)