import React from 'react'
import styles from '../styles/Home.module.css';
import roundHalf from "../lib/round-half";

const CalculatedWeight = ({percentage, weight}) => {
    return (
        <div className={styles.card}>
            <h2>{percentage}%</h2>
            <h3>{weight ? roundHalf(weight/100 * percentage) : '-'}</h3>
        </div>
    );
}

export default CalculatedWeight