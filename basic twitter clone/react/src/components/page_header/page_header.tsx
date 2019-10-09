import * as React from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../with_auth/with_auth";

interface HeaderProps {
    token: string | null;
}

interface HeaderState {}

class Header extends React.Component<HeaderProps, HeaderState> {
    public render() {
        return (
            <div className="top-navbar">
                <div className="container">
                    <Link className="left" to="/">Tweets</Link>
                    {this._renderLoginOrProfile()}
                </div>
            </div>
        );
    }
    private _renderLoginOrProfile() {
        if (this.props.token) {
            return( 
		<div className = "profile right">{(window as any).__email}</div>
			);
        } else {
            return <React.Fragment>
                <Link className="btn right" to="/sign_in">Sign In</Link>
                <Link className="btn right" to="/sign_up">Sign Up</Link>
            </React.Fragment>
        }
    }
	
	
}

export const PageHeader = withAuth(props => <Header token={props.authToken} />)

