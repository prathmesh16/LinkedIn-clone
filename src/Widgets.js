import React from 'react'
import './Widgets.css'
import InfoIcon from '@material-ui/icons/Info'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'

function Widgets() {

    const newsArticle = (heading, subtitle) => (
        <div className="widgets__article">
            <div className="widgets__articleLeft">
                <FiberManualRecordIcon />
            </div>
            <div className="widgets__articleRight">
                <h4>{heading}</h4>
                <p>{subtitle}</p>
            </div>
        </div>
    )

    return (
        <div className="widgets">
            <div className="widgets__header">
                <h2>LinkedIn News</h2>
                <InfoIcon/>
            </div>
            {newsArticle("Amazon CEO leaves company","Top news - 9099 readers")}
            {newsArticle("Corona virus: India updates","Top news - 1005 readers")}
            {newsArticle("Tesla hits new heights","Cars & auto - 300 readers")}
            {newsArticle("Bitcoin breaks $22k","Crypto - 8000 readers")}
            {newsArticle("JavaScript is becoming popular","Top news - 7067 readers")}
        </div>
    )
}

export default Widgets
