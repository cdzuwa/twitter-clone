import * as React from "react";
import Tweet   from "../components/tweet/tweet";
import {withRouter} from "react-router";
import  Comment, {CommentDetails } from "../components/comment/comment";
import  Listview  from "../components/listview/listview";
import { getAuthToken } from "../components/with_auth/with_auth"
import * as H from 'history';
import  {TweetPreviewDetails } from "../components/tweet/tweet";

interface TweetData  extends TweetPreviewDetails{
    comments: CommentDetails[]
}

interface TweetDetailsProps {
    id: string;
	history: H.History;
}

interface TweetDetailsState {
    tweet: TweetData | null;
    newCommentContent: string;
	userName:string;
	commentUserMap: Map<any, string> | null;
}

export class TweetDetailsInternal extends React.Component<TweetDetailsProps, TweetDetailsState> {
    public constructor(props: TweetDetailsProps) {
        super(props);
        this.state = {
            tweet: null,
            newCommentContent: "",
			userName : "",
			commentUserMap: new Map()
        };
    }
    public componentWillMount() {
        (async () => {
			if(this.props.id){
				const data = await getData(this.props.id);
				let uId= data.userId;
				let coms = data.comments;
				var tempMap = new Map();
				for(var i = 0; i < coms.length; i++){
					let comUser = await getUserName(coms[i].userId)
					tempMap.set(coms[i].id, comUser.email)
				}
				const user = await getUserName(uId);
                this.setState({ tweet: data, userName : user.email, commentUserMap: tempMap});
			}
            
        })();
    }
    public render() {
        if (this.state.tweet === null) {
            return <div>
			Loading...
			</div>;
        } else {
            return <div>
                <Tweet userName = {this.state.userName}{...this.state.tweet} />
                <Listview
                    items={
                        this.state.tweet.comments.map((comment, commentIndex) => {
                            return (
                                <Comment key={commentIndex} userName = {this.state.commentUserMap ?this.state.commentUserMap.get(comment.id): ""}{...comment} />
                            );
                        })
                    }
                />
                {this._renderCommentEditor()}
            </div>;
        }
    }
    private _renderCommentEditor() {
        const token = getAuthToken();
        if (token) {
            return (
                <React.Fragment>
                    <div>
                        <textarea
                            className="input-text"
                            placeholder="Write your comment here"
                            value={this.state.newCommentContent}
                            onChange={(e) => this.setState({ newCommentContent: e.currentTarget.value })}
                        ></textarea>
                    </div>
                    <div>
                        <button
                            onClick={() => this._handleCreateComment()}
                            style={{ width: "100%" }}
                            className="btn"
                        >
                            Submit
                        </button>
						
                    </div>
                </React.Fragment>
            );
        } else {
            return <div>Please Sign In if you wish to write a comment...</div>;
        }
    }
    private _handleCreateComment() {
        (async () => {
            try {
                const token = getAuthToken();
                if (token && this.state.tweet) {
                    const newComment = await createComment(
                        this.state.tweet.id,
                        this.state.newCommentContent,
                        token
                    );
                }
				
            } catch (err) {

            }
        })();
    }
}

export const TweetDetails = withRouter(props => <TweetDetailsInternal id={props.match.params.id}{...props} />)

async function getData(id: string) {
    const response = await fetch(`/api/v1/tweets/${id}`);
    const json = await response.json();
    return json as TweetData;
}

async function createComment(tweetId: number, content: string, jwt: string) {
    const update = {
        tweetId: tweetId,
        content: content
    };
    const response = await fetch(
        "/api/v1/comments",
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
async function getUserName(id: number) {
    const response = await fetch(`/api/v1/users/${id}`);
    const json = await response.json();
    return json;
}
