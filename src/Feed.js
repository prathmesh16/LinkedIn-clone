import React, { useEffect, useState } from 'react'
import './Feed.css'
import CreateIcon from '@material-ui/icons/Create'
import InputOption from './InputOption'
import ImageIcon from '@material-ui/icons/Image'
import SubscriptionsIcon from '@material-ui/icons/Subscriptions'
import EventNoteIcon from '@material-ui/icons/EventNote'
import CalenderViewDayIcon from '@material-ui/icons/CalendarViewDay'
import SendOutinedIcon from '@material-ui/icons/SendOutlined'
import Post from './Post'
import { db } from './firebase'
import firebase from 'firebase'
import { useSelector } from 'react-redux'
import { selectUser } from './features/userSlice'
import FlipMove from 'react-flip-move'

function Feed() {

    const user = useSelector(selectUser);

    const [input,setInput] = useState("");
    const [posts,setPosts] = useState([])
    const [isSendVisible, setIsSendVisible] = useState(false);

    useEffect(() => {
        db.collection("posts")
          .orderBy('timestamp','desc')
          .onSnapshot(snapshot => {
            setPosts(snapshot.docs.map((doc) => ({
                id : doc.id,
                data : doc.data()
            })));
        })
    },[]);

    const sendPost = (e) => {
        e.preventDefault();
        
        db.collection("posts").add({
            name: user.displayName,
            description: user.email,
            message: input,
            photoUrl: user.photoUrl || "",
            likes:0,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setInput("");
    }

    const handleSendButton = () => {
        if(input === "") {
            setIsSendVisible(false);
        }
        else {
            setIsSendVisible(true);
        }
    }

    return (
        <div className="feed"> 
            <div className="feed__inputContainer">
                <div className="feed__input">
                    <CreateIcon/>
                    <form>
                        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleSendButton} type="text" placeholder="Write something ..."/>
                        <button onClick={sendPost} type="submit">Send</button>
                        { isSendVisible && 
                            <div className="feed__inputSend" onClick={sendPost}>
                                <SendOutinedIcon className="feed__inputSend"/>
                            </div>
                        }
                    </form>
                </div>
                <div className="feed__inputOptions">
                    <InputOption Icon={ImageIcon} title="Photo" color="#70B5F9" />
                    <InputOption Icon={SubscriptionsIcon} title="Video" color="#E7A33E" />
                    <InputOption Icon={EventNoteIcon} title="Event" color="#C0CBCD" />
                    <InputOption Icon={CalenderViewDayIcon} title="Write article" color="#7FC15E" />
                </div>
            </div>
            <FlipMove>
                {posts.map(({id,data: { name, description, message, photoUrl}}) => (
                    <Post 
                        key={id}
                        id={id}
                        name={name}
                        description={description}
                        message={message}
                        photoUrl={photoUrl}
                    />
                ))}
            </FlipMove>
            
        </div>
    )
}

export default Feed
