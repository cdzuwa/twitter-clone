import React from 'react';
import { Link } from "react-router-dom";
import './font-awesome/css/font-awesome.css';

export interface TweetPreviewDetails {
    id  ?: any;
	content : string;
	date ?: any;
	userName ?: any;
    userId: number;
    onLike: number | null;
}

interface TweetEntry extends TweetPreviewDetails {
}

const Tweet = (props:TweetEntry) => {
        return (
            <table className="table-details">
                <tbody>
                    <tr>
                        <td className="left">
                            <div className="fa fa-thumbs-up"></div>
                            <div>{props.onLike ? props.onLike : 0}</div>
                            <div className="fa fa-thumbs-down"></div>
                        </td>
                        <td className="right">
                            <div className="audit">{renderTimeSinceDate(props.date)} ago by <Link to = {`/user_details/${props.userId}`}> {props.userName}</Link></div>
                            <h2 className="content">{props.content}</h2>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    function renderTimeSinceDate(jsonDate: string) {
        const time = Date.parse(jsonDate);
        const now = new Date().getTime();
        const difference = (now - time) / 1000;
        const seconds = Math.ceil(difference);
        const minutes = Math.ceil(seconds / 60);
        const hours = Math.ceil(minutes / 60);
        const days = Math.ceil(hours / 24);
        if (seconds < 60) {
            return `${seconds} seconds`;
        } else if (minutes < 60) {
            return `${minutes} minutes`;
        } else if (hours < 24) {
            return `${hours} hours`;
        } else {
            return `${days} days`;
        }
    }
}
export default Tweet;
