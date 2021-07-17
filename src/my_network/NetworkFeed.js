import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import { db } from '../firebase'
import './NetworkFeed.css'
import UserCard from './UserCard'
import FlipMove from 'react-flip-move'
import Invitation from './Invitation'

function NetworkFeed() {

    const user = useSelector(selectUser);

    const [users, setUsers] = useState([])
    const [invitations, setInvitations] = useState([])


    useEffect(() => {
        db.collection("users").doc(user.uid).collection("invitations")
        .onSnapshot(snapshot => {
            setInvitations(snapshot.docs.map((doc) => ({
                reqId: doc.id,
                data:doc.data()
            })))
        })

        db.collection("users").onSnapshot(snapshot => {
            setUsers(snapshot.docs.map((doc) => ({
                id:doc.id,
                data: doc.data()
            })))
        })
    
    
    }, [])


    return (
        <div className="networkFeed">
            <div className="networkFeed__invitations">
                <div className="networkFeed__invitationsTop">
                    <p>No pending invitations</p>
                    <p className="networkFeed__manage">Manage</p>
                </div>
                <div>
                    <FlipMove>
                        {  
                            invitations.map(({reqId, data: {id}}) => (
                                <Invitation
                                    key={reqId}
                                    uid={id}
                                />
                            ))
                        }
                    </FlipMove>
                </div>
            </div>
            <div className="networkFeed__people">
                <div className="networkFeed__peopleTop">
                    <p>People you may know</p>
                    <p className="networkFeed__seeAll">See all</p>
                </div>
                <div >
                    <FlipMove className="networkFeed__peopleCards">
                        {
                            users.map(({id, data: { name, email, photoURL }}) => (
                                user.email != email &&
                                <UserCard 
                                    key={id}
                                    id={id}
                                    name={name}
                                    description={email}
                                    photoUrl={photoURL}
                                />
                            ))
                        }
                    </FlipMove>
                </div>
            </div>
        </div>
    )
}

export default NetworkFeed
