import React, {useState} from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import {Link} from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './NavRoutes.css';
import {IconContext} from 'react-icons';
import TokenService from '../services/token-service';

function NavRoutes() {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);
    
    const handleLogoutClick = () => {
      TokenService.clearAuthToken() 
     // this.props.clearItemsArray()
  }
  const renderLogoutLink = () => {
        return (
          <li className="nav-text">
            <Link
              onClick={handleLogoutClick}
              to='/' >
              Logout
            </Link> 
          </li>
        )
      };
    
     const renderLoginLink = () => {
        return (
          <>
            <li className="nav-text">
              <Link
                to='/register'>
                Register
              </Link>
              </li>

              <li className="nav-text">
              <Link
                to='/sign-in' className="nav-text">
                Sign in 
              </Link> 
            </li>
          </>
        )
      }
    return (
        <>
        <IconContext.Provider value={{color: '#fff'}}>
          <Link to='/map' className="pnyc"> PNYC </Link>
            <div className='navbar'>
                <Link to='#' className='menu-bars'>
                    <FaIcons.FaBars onClick={showSidebar} />
                </Link>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' onClick={showSidebar}>
                    <li className='navbar-toggle'>
                        <Link to='#' className='menu-bars'>
                            <AiIcons.AiOutlineClose />
                        </Link>
                    </li>
                    {TokenService.hasAuthToken()
                        ? renderLogoutLink()
                        : renderLoginLink()} 
                        
                    {SidebarData.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                  <span>{item.title}</span>  
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
            </IconContext.Provider>
        </>
    )
}

export default NavRoutes;