import React from 'react'
import { Link } from 'react-router-dom'
import style from './Error.module.css';

const Error404 = () => {
    return(
        <div className={style.errorPage}>
            <div>
                <h1 style={{color:'red',fontSize:100}}>
                    404
                </h1>
                <h3>
                    Oopsie
                </h3>
               <p className={style.danger}>
                   The Page you are looking for 
                   <br/>
                   doesn't exists
               </p>
               <p className={style.normal}>
                   Try go back to <Link to="/">Home</Link>
               </p>
            </div>
        </div>
    )
}
export default Error404;