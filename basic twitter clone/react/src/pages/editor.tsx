import * as React from "react";
import { withRouter } from "react-router";
import  {CommentDetails } from "../components/comment/comment";
import { getAuthToken } from "../components/with_auth/with_auth";
import * as H from 'history';

interface TweetData {
    id: number;
    content: string;
	date:string;
	userName:string;
    userId: number;
    commentCount: number | null;
    likeCount: number | null;
    comments: CommentDetails[]

	
}

interface TweetDetailsProps {
    id: string;
	history: H.History;
}

interface TweetDetailsState {
    tweet: TweetData | null;
    newTweetContent: string
}

export class TweetEditorInternal extends React.Component<TweetDetailsProps, TweetDetailsState> {
    public constructor(props: TweetDetailsProps) {
        super(props);
        this.state = {
            tweet: null,
            newTweetContent: ""
        };
    }
    public render() {
            return <div>
                {this._renderTweetEditor()}
            </div>
        }
		
    private _renderTweetEditor() {
        const token = getAuthToken();
        if (token) {
            return (
                <React.Fragment>
                    <div>
                        <textarea
                            className="input-text"
                            placeholder="Write your tweet here"
                            value={this.state.newTweetContent}
                            onChange={(e) => this.setState({ newTweetContent: e.currentTarget.value })}
                        ></textarea>
                    </div>
                    <div>
                        <button
                            onClick={() => this._handleCreateTweet()}
                            style={{ width: "100%" }}
                            className="btn"
                        >
                            Submit
                        </button>
						</div>
                </React.Fragment>
            );
        }
    }
    private _handleCreateTweet() {
        (async () => {
            try {
                const token = getAuthToken();
				var d = new Date().toUTCString();;
                if (token) {
                    const newTweet = await createTweet(
                        d,
                        this.state.newTweetContent,
                        token
                    );
					this.props.history.push('/')
                }
            } catch (err) {

            }
        })();
    }
}

export const TweetEditor = withRouter(props => <TweetEditorInternal id={props.match.params.id}{...props} />)


async function createTweet(date: string, content: string, jwt: string) {
    const update = {
        date: date,
        content: content
    };
    const response = await fetch(
        "/api/v1/tweets",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": jwt
            },
            body: JSON.stringify(update)
        }
    );
    const json = await response.json();
    return json;
}
