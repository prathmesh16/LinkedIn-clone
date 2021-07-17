import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getIndicator } from './features/indicatorSlice'
import { selectUser } from './features/userSlice'
import './HeaderOption.css'


function HeaderOption({avatar, Icon, title, onClick}) {

    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const indicator = useSelector(getIndicator);

    const [className, setClassName] = useState("")

    useEffect(() => {
        title === indicator ? setClassName("headerOption headerOption__black") : setClassName("headerOption headerOption__gray");
    },[indicator])
    

    return (
        <div className={className} onClick={onClick}>
            {Icon && <Icon className="headerOption__icon"/>}
            {avatar && <Avatar className="headerOption__icon" src={user?.photoUrl}>{user?.email[0].toUpperCase() }</Avatar>}
            <h3 className="headerOption__title">{!title ? !user ? "Sign In" : "me" : title}</h3>
            { title === indicator && <div className="selectIndicator"></div>}
        </div>
    )
}

export default HeaderOption
