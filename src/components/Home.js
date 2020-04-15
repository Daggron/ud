import React, {Component} from 'react'
import { Tab } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import UnansweredQuestion from './UnansweredQuestion';
import AnsweredQuestion from './AnsweredQuestion';

class Home extends Component {

    render() {
        const {unansweredQuestions, answeredQuestions, authedUser} = this.props;

        if(!authedUser){
            return(
                <Redirect to="/login" />
            )
        }

        const panes = [
            {
                menuItem: 'Unanswered Questions',
                render: () => <Tab.Pane attached='bottom'> <UnansweredQuestion unansweredQuestions={unansweredQuestions} /> </Tab.Pane>
            },
            {
                menuItem: 'Answered Questions',
                render: () => <Tab.Pane attached='bottom'> <AnsweredQuestion answeredQuestions={answeredQuestions} /> </Tab.Pane>
            }
          ]

        return(
            <div className='container'>
                <Tab menu={{ widths: 2, color:'pink', attached: true, tabular: false }} panes={panes}/>
            </div>
        )
    }
}

function mapStateToProps({authedUser,questions}) {
    const unansweredQuestions = Object.entries(questions)
        .filter(([id , eachQuestion]) => (
            !eachQuestion.optionOne.votes.includes(authedUser) &&
            !eachQuestion.optionTwo.votes.includes(authedUser)
        ))
        .sort((a,b)=>{
            return b[1].timestamp - a[1].timestamp
        })
        const answeredQuestions = Object.entries(questions)
        .filter(([id , eachQuestion]) => (
            eachQuestion.optionOne.votes.includes(authedUser) ||
            eachQuestion.optionTwo.votes.includes(authedUser)
        ))
        .sort((a,b)=>{
            return b[1].timestamp - a[1].timestamp
        })

        const aQ = answeredQuestions.map(eachQuestion=>{
            return eachQuestion[0];
        });

        const uAQ = unansweredQuestions.map(eachQuestion=>{
            return eachQuestion[0];
        })
    return {
        authedUser,
        unansweredQuestions:uAQ,
        answeredQuestions:aQ,
    }
}
export default connect (mapStateToProps)(Home)