import * as React from "react";
import Listview  from "../components/listview/listview";
import { withRouter } from "react-router";
import pic from '../images/profile.png';
import {UserProfile } from "../components/profile/profile";

interface Comment {
    id: number;
    userId: number;
    tweetId: number;
    content: string;
}

interface Tweet{
    id: number;
    date: string;
    content: string;
    userId: number;
}

interface User {
    email: string;
    id: number;
	bio : string;
	pic : string;
	tweets: Tweet[];
    comments: Comment[];
}

interface UserProps {
    id: string | undefined;
}

interface UserState {
    user : User | null;
}

export class DetailsInternal extends React.Component<UserProps, UserState> {
    public constructor(props: UserProps) {
        super(props);
        this.state = {
            user : null
        };
    }
    public componentWillMount() {
        (async () => {
            if (this.props.id) {
				let profileId= parseInt(this.props.id);
                const user = await getUser(profileId);
				user.pic = pic;
				user.bio = "short bio for user.";
                this.setState({ user: user });
            } 
        })();
    }
    public render() {
		if(this.state.user){
			return (
			<div>
               <UserProfile email = {this.state.user.email} bio = {this.state.user.bio} pic = {this.state.user.pic} />
                <Listview
                    items={
                        this.state.user.tweets.map(tweet => <div>
							<table className="table-details">
								<tbody>
									<tr>
										<td className="right">
											<h3>{tweet.content}</h3>
										</td>
								   </tr>
								</tbody>
							</table>
                        </div>)
                    }
                />
				<Listview
					items={
						 this.state.user.comments.map(comment => <div>
						 <table className="table-details">
								<tbody>
									<tr>
										<td className="right">
											<p>{comment.content}</p>
										</td>
								   </tr>
							</tbody>
					  </table>
						</div>)}
					/>			
            </div>
			
			);
		}
		else{
			return <div>Loading Profile...</div>;
		}
    }
}
export const UserDetails = withRouter(props => <DetailsInternal id={props.match.params.id} />);


async function getUser(id: number) {
    const response = await fetch(`/api/v1/users/${id}`);
    const json = await response.json();
    return json;
}
