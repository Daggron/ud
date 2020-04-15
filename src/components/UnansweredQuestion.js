import React from 'react'
import Question from './Question/Question';

export default function UnansweredQuestion({unansweredQuestions}) {
    return (
        <div>
             { unansweredQuestions.map((id) => {
                 return(
                    <li key={id} >
                        <Question id={id}/>
                    </li>
                )
            })}
        </div>
    )
}
