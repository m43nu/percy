import React from 'react'
import styles from '../styles/Home.module.css';


const CalculatedWeight = ({percentage, weight}) => {
    return (
        <div className={styles.card}>
            <h2>{percentage}%</h2>
            <h3>{weight ? parseInt(weight/100 * percentage) : '-'}</h3>
        </div>
    );
}

export default CalculatedWeight