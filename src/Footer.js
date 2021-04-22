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
                        <p>Groupe Banque Populaire</p>
                    </div>
                </div>
                <div className="box">
                    <h2>Mentions légales</h2>
                    <div className="content">
                        <label>Politique de confidentialité</label>
                        <label>Conditions d'utilisation</label>
                        <label>FAQ</label>
                    </div>
                </div>
                <div className="box">
                    <h2>Suivez-nous sur Linkedin</h2>
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
