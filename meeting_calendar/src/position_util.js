import { DAY_CONFIG } from "./constants/days";

export default function calculatePositionFromTop(time, perMinuteUnit) {
    let isAm = time.includes('am');
    let am_pm_regex = new RegExp(/[a|p]m/g);
    let [hour, minute] = time.replaceAll(am_pm_regex, '').split(':');
    let hourIndex = DAY_CONFIG.findIndex(el => el === `${hour} ${isAm ? 'am' : 'pm'}`)

    return ((perMinuteUnit * 60) * +hourIndex) + (perMinuteUnit * +minute);
}