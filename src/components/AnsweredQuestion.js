import React from 'react'
import Question from './Question/Question';

export default function AnsweredQuestion({answeredQuestions}) {
    return (
        <div>
            { answeredQuestions.map((id) => {
                return(
                    <li key={id} >
                        <Question id={id}/>
                    </li>
                )
            })}
        </div>
    )
}
