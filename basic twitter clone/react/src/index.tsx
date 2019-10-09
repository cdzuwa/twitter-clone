import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Tweets } from "./pages/tweets";
import { TweetDetails } from './pages/tweet_details';
import { SignIn, SignUp } from './pages/login';
import { UserDetails } from './pages/user_details';
import { PageHeader } from "./components/page_header/page_header";
import  {TweetEditor} from "./pages/editor";
import  Footer  from './components/footer/footer'

ReactDOM.render(
    // This is the router component
    <BrowserRouter>
        <div>
            <PageHeader/>
            {
                /*
                    The Switch component will render one of the components
                    The rendered component will be the one in the Route with
                    the matching path
                */
            }
            <div className="container">
                <Switch>
				   <Route exact path="/" component={Tweets} />
                   <Route exact path="/tweet_details/:id" component={TweetDetails} />
                   <Route exact path="/sign_in" component={SignIn} />
                   <Route exact path="/sign_up" component={SignUp} />
                   <Route exact path="/user_details/:id" component={UserDetails} />
				   <Route exact path="/tweet_editor/" component={TweetEditor} />
                </Switch>
            </div>
			<Footer />
        </div>
    </BrowserRouter>,
    document.getElementById('root')
);
serviceWorker.unregister();

