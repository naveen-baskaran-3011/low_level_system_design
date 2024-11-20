import { SAMPLE_MEETINGS } from "../constants/meetings";
import MeetingCard from "./MeetingCard";

export default function({ perMinuteUnit }) {
    return (
        <div>
            {SAMPLE_MEETINGS.map((meeting) => (
                <MeetingCard key={meeting.label} meeting={meeting} perMinuteUnit={perMinuteUnit} />
            ))}
        </div>
    );
}