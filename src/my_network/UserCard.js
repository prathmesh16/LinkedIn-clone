import { Avatar } from '@material-ui/core'
import React from 'react'
import { forwardRef } from 'react'
import './UserCard.css'

const UserCard = forwardRef(({ id, name, description, photoUrl} , ref) => {

    return (
        <div ref={ref} className="userCard">
            <div className="userCard__top">

            </div>
            <div className="userCard__bottom">
                <Avatar style={{height:'100px',width:'100px',marginTop:'-70px'}} src={photoUrl}>{name[0]}</Avatar>
                <p className="userCard__name">{name}</p>
                <p className="userCard__description">{description}</p>
                <p className="userCard__mutuals">{name.length} mutual connection</p>
                <button>Connect</button>
            </div>
        </div>
    )
})

export default UserCard
