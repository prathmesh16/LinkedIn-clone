import React from 'react'
import './Header.css'
import SearchIcon from '@material-ui/icons/Search'
import HeaderOption from './HeaderOption'
import HomeIcon from '@material-ui/icons/Home'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount'
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter'
import ChatIcon from '@material-ui/icons/Chat'
import NotificationsIcon from '@material-ui/icons/Notifications'
import { useDispatch } from 'react-redux'
import { logout } from './features/userSlice'
import { auth } from './firebase'
import { setIndicator } from './features/indicatorSlice'
import { useHistory } from 'react-router-dom'

function Header() {

    const history = useHistory();
    const dispatch = useDispatch();

    const logoutOfApp = () => {
        dispatch(logout());
        auth.signOut();
        dispatch(setIndicator(""))
    };


    return (
        <div className="header">
            <div className="header__left">
                <img src="https://www.flaticon.com/svg/static/icons/svg/174/174857.svg" alt="" />
                <div className="header__search">
                    <SearchIcon/>
                    <input type="text" placeholder="Search"/>    
                </div>           
            </div>
            <div className="header__right">
                <HeaderOption Icon={HomeIcon} title='Home' onClick={() =>{history.push('/home'); dispatch(setIndicator("Home")); }}/>
                <HeaderOption Icon={SupervisorAccountIcon} title='My network' onClick={() => { history.push('/mynetwork');dispatch(setIndicator("My network")); }}/>
                <HeaderOption Icon={BusinessCenterIcon} title='Jobs' onClick={() => dispatch(setIndicator("Jobs"))}/>
                <HeaderOption Icon={ChatIcon} title='Messaging' onClick={() => dispatch(setIndicator("Messaging"))}/>
                <HeaderOption Icon={NotificationsIcon} title='Notifications' onClick={() => dispatch(setIndicator("Notifications"))}/>
                <HeaderOption avatar={true} onClick={logoutOfApp} />
            </div>
        </div>
    )
}

export default Header
