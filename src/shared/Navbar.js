import React from 'react';
import './Navbar.css';
import Link from "react-router-dom/Link";
import ReorderIcon from '@material-ui/icons/Reorder';

class Navbar extends React.Component {
    state ={className:"" , links:false};

    componentDidMount(){
        window.addEventListener("scroll", this.handleScroll);
    }

    handleScroll=()=>{
        if (window.pageYOffset > 0) {
            if(!this.state.className){
                this.setState({ className: "white" });
            }
        }else{
            if(this.state.className){
                this.setState({ className: "" });
            }
        }

    }
    showLinks = ()=>{
        this.setState({links:!this.state.links});
    }
    render(){
        return(
            <nav className={this.state.className}>
                <label className="logo">MFCalender</label>
                <ul>
                    <div className="links" id={this.state.links?"hl":""}>
                        <li><Link to="/" className="aClass" onClick={this.showLinks}>Home</Link></li>
                        <li><Link to="/feed" className="aClass" onClick={this.showLinks}>Feed</Link></li>
                        <li><Link to="/" className="aClass" onClick={this.showLinks}>Notifications</Link></li>
                        {!this.props.user?
                            <li><Link to="/login" className="aClass" onClick={this.showLinks}>Login</Link></li> :
                            <li><Link to="/login" className="aClass" onClick={this.showLinks}>Logout</Link></li>}


                    </div>
                    <button onClick={this.showLinks} className="hidden">
                        Menu<ReorderIcon className="reorder"/>
                    </button>
                </ul>
            </nav>
        );
    }
}
export default Navbar
