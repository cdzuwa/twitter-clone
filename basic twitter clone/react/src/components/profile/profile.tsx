import * as React from "react";
import { getAuthToken } from "../with_auth/with_auth";
import Listview  from "../listview/listview";
import { withRouter } from "react-router";


export interface ProfileProps {
	id ?: number;
    email : string;
	pic : string;
	bio : string;
}


interface ProfileState {
    //
}

export class UserProfile extends React.Component<ProfileProps, ProfileState> {
    public render() {
            return <div>
                      <div>
					   <img src={this.props.pic} />
					  <p>{this.props.email}</p>
					  <div>
						 {this.props.bio}
					  </div>
					  </div>
                 </div>
    }
}


