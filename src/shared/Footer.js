import React from "react";
import './Footer.css';
import LinkedInIcon from '@material-ui/icons/LinkedIn';


const Footer = () => {

    return(
        <footer>

            <div className="main-content">
                <div className="left box">
                    <h2>Mediafinance</h2>
                    <div className="content">
                        <p>BCP Securities Services</p>
                    </div>
                </div>
                <div className="box">
                    <h2>Legal</h2>
                    <div className="content">
                        <label>Privacy Policy</label>
                        <label>FAQ</label>
                    </div>
                </div>
                <div className="box">
                    <h2>Follow us on Linkedin</h2>
                    <div className="content">
                        <LinkedInIcon fontSize={"large"}/>
                    </div>
                </div>
            </div>
            <div className="legal">
                <label>&copy; 2021 Copyright, All right reserved.</label>
            </div>
        </footer>
    );
}
export default Footer;
