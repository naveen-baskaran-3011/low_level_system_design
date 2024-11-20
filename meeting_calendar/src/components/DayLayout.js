import styles from './DayLayout.module.css';

export default function({ config }) {
    return(
        <div className={styles['day-container']}>
            {config.map(el => (
                <div className={styles['time-container']} key={el}>
                    <div className={styles.label}>{el}</div>
                    <div className={styles.lines}></div>
                </div>
            ))}
        </div>
    )
};