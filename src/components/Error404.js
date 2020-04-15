import React from 'react'
import { Link } from 'react-router-dom'
import NotFound from './notfound.png';

//Stateless Functional Component is used as we're using only render method
const Error404 = () => {
    return(
        <div>
            <div style={{textAlign:'center'}}>
                <img src={NotFound} style={{height: 400}} alt="kylo ren"/>
                <h3>
                    Oopsie
                </h3>
               <p style={{color: "red",fontSize: 20, lineHeight: 1.5}}>
                   You Dared to enter the dark side of the force
                   <br/>
                   Kylo ren is there waiting for you
               </p>
               <p style={{color: "black",fontSize: 20, lineHeight: 1.5}}>
                   Try go back to <Link to="/">Falcon 1</Link> to be safe
               </p>
            </div>
        </div>
    )
}
export default Error404;