import { Avatar } from '@material-ui/core'
import React from 'react'
import { forwardRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import { db } from '../firebase'
import './UserCard.css'

const UserCard = forwardRef(({ id, name, description, photoUrl} , ref) => {

    const user = useSelector(selectUser);

    const sendRequest = () => {
        const userRef = db.collection("users").doc(id).collection("invitations")
        
        userRef.where("id","==",user.uid).get().then(snapshot => {
            if(!snapshot.exists) {
                userRef.add({"id":user.uid})
            }
        })
    }
    return (
        <div ref={ref} className="userCard">
            <div className="userCard__top">

            </div>
            <div className="userCard__bottom">
                <Avatar style={{height:'100px',width:'100px',marginTop:'-70px'}} src={photoUrl}>{name[0]}</Avatar>
                <p className="userCard__name">{name}</p>
                <p className="userCard__description">{description}</p>
                <p className="userCard__mutuals">{name.length} mutual connection</p>
                <button onClick={sendRequest}>Connect</button>
            </div>
        </div>
    )
})

export default UserCard
