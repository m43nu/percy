import React from 'react'
import styles from '../styles/Home.module.css';


const CalculatedWeight = ({percentage, weight}) => {
    return (
        <div className={styles.card}>
            <h3>{percentage}%</h3>
            <h4>{weight ? parseInt(weight/100 * percentage) : '-'}</h4>
        </div>
    );
}

export default CalculatedWeight