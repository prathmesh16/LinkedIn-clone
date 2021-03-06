import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setIndicator } from './features/indicatorSlice'
import { setIsloading } from './features/loadingSlice'
import { login } from './features/userSlice'
import { auth, db } from './firebase'
import './Login.css'

function Login() {

    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [profilePic, setProfilePic] = useState("")

    const dispatch = useDispatch();
    const history = useHistory();

    const registerToApp = () => {
        if(!name) {
            return alert("Please enter Full name!");
        }
        dispatch(setIsloading(true))
        auth.createUserWithEmailAndPassword(email, password)
        .then((userAuth) => {
            userAuth.user.updateProfile({
                displayName: name,
                photoURL: profilePic,
            })
            .then(() => {
                db.collection("users").doc(userAuth.user.uid).set({
                    email: userAuth.user.email,
                    name: name,
                    photoURL: profilePic
                })
                dispatch(login({
                    email: userAuth.user.email,
                    uid: userAuth.user.uid,
                    displayName: name,
                    photoUrl: profilePic
                }))
                dispatch(setIsloading(false))
                history.push('/home')
                dispatch(setIndicator("Home"))
            })
        }).catch((error) => {
            alert(error.message)
        })
    }

    const loginToApp = (e) => {
        e.preventDefault();
        
        dispatch(setIsloading(true))
        auth.signInWithEmailAndPassword(email, password)
        .then(userAuth => {
            dispatch(login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: userAuth.user.displayName,
                profileUrl: userAuth.user.photoURL
            }))
            dispatch(setIsloading(false))
            history.push('/home')
            dispatch(setIndicator("Home"))
        }).catch(error =>{ alert(error); dispatch(setIsloading(false))})
    }

    return (
        <div className="login">
            <img src="https://cdn.worldvectorlogo.com/logos/linkedin.svg" alt="" />
            <form>
                <input value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Full name (Require if registering)" />
                <input value={profilePic} onChange={e => setProfilePic(e.target.value)} type="text" placeholder="Profile Url (Optional)" />
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email" />
                <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
                <button type="submit" onClick={loginToApp}>Sign In</button>
            </form>

            <p>Not a member?{" "}
                <span className="login__register" onClick={registerToApp}>Register Now</span>
            </p>
        </div>
    )
}

export default Login
