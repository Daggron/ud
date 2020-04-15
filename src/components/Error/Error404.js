import React from 'react'
import { Link } from 'react-router-dom'
import NotFound from '../notfound.png';
import style from './Error.module.css';

const Error404 = () => {
    return(
        <div className={style.errorPage}>
            <div>
                <img src={NotFound} style={{height: 400}} alt="kylo ren"/>
                <h3>
                    Oopsie
                </h3>
               <p className={style.danger}>
                   You Dared to enter the dark side of the force
                   <br/>
                   Kylo ren is there waiting for you
               </p>
               <p className={style.normal}>
                   Try go back to <Link to="/">Falcon 1</Link> to be safe
               </p>
            </div>
        </div>
    )
}
export default Error404;