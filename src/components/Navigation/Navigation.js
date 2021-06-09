import React from 'react';

import Filters from '../Filters/Filters.js';
import icon from "./icon.png";
import './Navigation.css';

// const NavBar = () => (
//     <header className='navbar'>
//         <div className='navbar__title navbar__item'>Cutco</div>
//         <div className='navbar__item'>About Us</div>
//         <div className='navbar__item'>Contact</div>
//         <div className='navbar__item'>Help</div>        
//     </header>
// );

class NavBar extends React.Component{
    constructor(props){
      super(props);
      this.state={
        sideBar: false
      }
  
      this.handleSidebar = this.handleSidebar.bind(this);
    }
  
    handleSidebar(){
      this.setState({
        sideBar : !this.state.sideBar
      });
    }
  
    render(){
      return(
        <div>
          <header className="header">
            <div className="navContainer">
              <span className="logo"><span style={{fontSize:"60px"}}>C</span>RYPTOCURRENCY <span style={{fontSize:"60px"}}>D</span>ASHBOARD</span>
              <div
                onClick={this.handleSidebar.bind(this)}
                className={`overlay ${this.state.sideBar ? "open" : ""}`}
                />
            </div>
          </header>
          <div className ="wrapper">
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <Filters/>
          </div>
        </div>
  
      );
    }
  
  }
  

export default NavBar;