import  {FC} from 'react';
import {formatDistanceToNow, parseISO} from "date-fns";

interface TimeAgoProps {
    timestamp?: string
}

const TimeAgo: FC<TimeAgoProps> = ({timestamp}) => {
    let timeAgo = ''
    if (timestamp) {
        const date = parseISO(timestamp)
        const timePeriod = formatDistanceToNow(date)
        timeAgo = `${timePeriod} ago`
    }
    return (
        <span title={timestamp}>
            &nbsp; <i>{timeAgo}</i>
        </span>
    );
}

export default TimeAgo;
;