import { Avatar } from '@material-ui/core'
import React, {forwardRef, useState} from 'react'
import InputOption from './InputOption'
import './Post.css'
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined'
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined'
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined'
import SendOutinedIcon from '@material-ui/icons/SendOutlined'
import { db } from './firebase'

const Post = forwardRef(({ id, name, description, message, photoUrl}, ref) => {

    const [likes, setlikes] = useState(0);

    const postRef = db.collection("posts").doc(id);
    postRef.onSnapshot(snapshot => {
        setlikes(snapshot.data().likes);
    })

    const likePost = (e) => {
        e.preventDefault();
        postRef.get().then(snapshot => {
            postRef.update({"likes":snapshot.data().likes+1});
        })
    }

    return (
        <div ref={ref} className="post">
            <div className="post__header">
                <Avatar src={photoUrl} >{name[0]}</Avatar>
                <div className="post__info">
                    <h2>{name}</h2>
                    <p>{description}</p>
                </div>
            </div>
            <div className="post__body">
                <p>{message}</p>
            </div>
            <div className="post__likes">
                <div className="post__likesTop"></div>
                <div className="post__likeNumber">{likes} Likes</div>
                <div className="post__likesBottom"></div>
            </div>
            <div className="post__buttons">
                <InputOption Icon={ThumbUpAltOutlinedIcon} title="Like" color="gray" onClick={likePost}/>
                <InputOption Icon={ChatOutlinedIcon} title="Comment" color="gray"/>
                <InputOption Icon={ShareOutlinedIcon} title="Share" color="gray"/>
                <InputOption Icon={SendOutinedIcon} title="Send" color="gray"/>
            </div>
        </div>
    )
})

export default Post
