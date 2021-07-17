import { Avatar } from '@material-ui/core'
import React, { forwardRef, useState } from 'react'
import { useEffect } from 'react'
import { db } from '../firebase'
import './Invitation.css'

const Invitation = forwardRef(({uid},ref) => {

    const [userInvite, setUserInvite] = useState(null)

    useEffect(() => {
        const fetchData = db.collection("users").doc(uid).get()
        .then(snapshot => {
            setUserInvite(snapshot.data());
        })
        return fetchData;
    }, [])
 
    return (
        <div ref={ref} className="invitation">
            <div className="invitation__left">
                <Avatar style={{height:'70px',width:'70px'}} src={userInvite?.photoURL}>
                    {userInvite?.email[0]}
                </Avatar>
                <div className="invitation__nameTitle">
                    <p className="invitation__name">{userInvite?.name}</p>
                    <p className="invitation__title">{userInvite?.email}</p>
                    <p className="invitation__mutuals">{userInvite?.name.length} mutual connection</p>
                </div>
            </div>
            <div className="invitation__right">
                <button className="acceptButton">Accept</button>
                <button className="ignoreButton">Ignore</button>
            </div>
        </div>
    )
})

export default Invitation
