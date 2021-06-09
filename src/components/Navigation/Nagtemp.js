import React from 'react';

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
              <span className="logo" style={{color:"#fff" , fontsize: "100px",fontWeight:"500"}}>Crytocurrecy Prediction</span>
              <nav>
                <ul
                  className="mainNav"
                  style={this.state.sideBar ? { transform: "translateX(0)" } : null}
                  >
                  <li>
                    <a className="mainNavLink" href="#">
                      Dummy 1
                    </a>
                  </li>
                  <li>
                    <a className="mainNavLink" href="#">
                      Dummy 2
                    </a>
                  </li>
                  <li>
                    <a className="mainNavLink" href="#">
                      Dummy 4
                    </a>
                  </li>
                </ul>
              </nav>
              <button
                onClick = {this.handleSidebar}
                className={`navToggle ${this.state.sideBar ? "open" : null}`}>
                <span />
                <span />
                <span />
              </button>
              <div
                onClick={this.handleSidebar.bind(this)}
                className={`overlay ${this.state.sideBar ? "open" : ""}`}
                />
            </div>
          </header>
          <div className ="wrapper"></div>
        </div>
  
      );
    }
  
  }
  

export default NavBar;