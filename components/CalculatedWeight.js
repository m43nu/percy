import React from 'react'
import styles from '../styles/Home.module.css';

function roundHalf(num) {
    return Math.round(num*2)/2;
}

const CalculatedWeight = ({percentage, weight}) => {
    return (
        <div className={styles.card}>
            <h2>{percentage}%</h2>
            <h3>{weight ? roundHalf(weight/100 * percentage) : '-'}</h3>
        </div>
    );
}

export default CalculatedWeight