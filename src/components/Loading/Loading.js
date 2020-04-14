import React from 'react';
import loading from "../kyloren.png";
import style from './Loading.module.css';

const Loading = () => {
    return(
        <div className={style.flex}>
            <img src={loading} alt="loading" style={{height: 300}} />
            <h1>
                Loading ... 
            </h1>
        </div>
    )
}

export default Loading;