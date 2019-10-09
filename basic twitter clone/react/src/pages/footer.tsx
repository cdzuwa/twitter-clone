import * as React from "react";
import { Link } from "react-router-dom";

const Footer =  () => {
        return (
            <div className="top-navbar">
                <div className="container">
                    <p className="left">{1}</p>
                    <Link className="btn right" to="/sign_in">Logout </Link>
                </div>
            </div>
        );
		
}

export default Footer;



