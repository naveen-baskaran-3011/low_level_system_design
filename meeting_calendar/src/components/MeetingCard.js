import calculatePositionFromTop from '../position_util';
import styles from './MeetingCard.module.css';

export default function({ meeting, perMinuteUnit }) {
    const top = calculatePositionFromTop(meeting.startTime, perMinuteUnit);
    const endTimeFromTop = calculatePositionFromTop(meeting.endTime, perMinuteUnit);
    const height = endTimeFromTop - top;

    return (
        <div className={styles["meeting-card-container"]} style={{
            top: `${top}px`,
            height: `${height}px`
        }}>
            {meeting.label}
            <p>{meeting.startTime} - {meeting.endTime}</p>
        </div>
    );
}