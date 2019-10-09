import * as React from "react";
import  Listview  from "../components/listview/listview";
import { Link } from "react-router-dom";
import  Tweet, {TweetPreviewDetails } from "../components/tweet/tweet";
import { getAuthToken } from "../components/with_auth/with_auth";

interface TweetsProps {
    //
}

interface TweetsState {
    tweets: TweetPreviewDetails[] | null;
    query: string;
	usersMap : Map<any, string> | null;
}

export class Tweets extends React.Component<TweetsProps, TweetsState> {
    public constructor(props: TweetsProps) {
        super(props);
        this.state = {
            tweets: null,
            query: "",
			usersMap: null
        };
    }
    public componentWillMount() {
        (async () => {
			const data = await getData();
			const len = data.length;
			var arr = new Map();
			for(var i = 0; i < len; i++){
				let uuid = await getUserName(data[i].userId);
				let tweetId = data[i].id;
				let mail= uuid.email;
				arr.set(tweetId, mail);
			}
            this.setState({ tweets: data, usersMap : arr});
        })();
    }
    public render() {
		var token =  getAuthToken();
        if (this.state.tweets === null) {
            return <div>Loading...</div>;
        } else {
			const filteredTweets = this.state.tweets.filter((tweet) => {
					return tweet.content.indexOf(this.state.query) !== -1;
				});
			let searchBox = <input
						className="input-text"
						placeholder="Search"
						type="text"
						onKeyUp={(e) => this._onSearch(e.currentTarget.value)}
					/>
					
			let tweetList = <Listview
						items={
							filteredTweets.map((tweet, tweetIndex) => {
								return (
									<Link to={`/tweet_details/${tweet.id}`}>
										<Tweet userName = {this.state.usersMap ?this.state.usersMap.get(tweet.id): ""}key={tweetIndex} {...tweet}/>
									</Link>
									
								);
							})
						}
					/>
			if(token){
				return <div>
					{searchBox}
					<div><Link to="/tweet_editor/">New Tweet</Link></div>
					<br />
					{tweetList}
				</div>;
			}else{
				return <div>
					{searchBox}
					{tweetList}
				</div>;
				
			}
        }
    }
    private _onSearch(query: string) {
        this.setState({ query: query });
    }
}

async function getData() {
    const response = await fetch("/api/v1/tweets/");
    const json = await response.json();
    return json as TweetPreviewDetails[];
}

async function getUserName(id: number) {
    const response = await fetch(`/api/v1/users/${id}`);
    const json = await response.json();
    return json;
}


