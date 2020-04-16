import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Card, Input, Button } from 'semantic-ui-react'
import { handleAddQuestion } from '../../redux/actions/questions';
import { Redirect } from 'react-router-dom';
import style from './NewQuestion.module.css';

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

    handleInputOne = (e, data) => {
        e.preventDefault()
        this.setState({
            optionOneText:data.value
        })
    };

    handleInputTwo = (e, data) => {
        e.preventDefault()
        this.setState({
            optionTwoText:data.value
        })
    };

    render() {
        const {authedUser} = this.props;
        if(!authedUser) return(
            <Redirect to={{pathname:'/login',state:{from: '/add'}}} />
        )
        return(
            <div className={style.form}>
                <Card fluid>
                    <Card.Header textAlign='center' style={{ marginTop:7.5, marginBottom:0,height:40, fontSize:25}} className='ui header'>Add A New Question</Card.Header>
                    <Card.Content>
                        <Card.Header  style={{marginTop:'20px', marginBottom:'10px'}}>Would you rather ...</Card.Header>
                        <Input fluid placeholder='Enter Option One Here' style={{marginTop:'20px'}}  onChange={this.handleInputOne} />
                        <h3 style={{textAlign:'center'}}>
                            OR
                        </h3>
                        <Input fluid placeholder='Enter Option Two Here' onChange={this.handleInputTwo} />
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