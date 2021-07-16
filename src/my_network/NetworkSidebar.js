import React from 'react'
import './NetworkSidebar.css'
import Tag from './Tag'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount'
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import GroupIcon from '@material-ui/icons/Group';
import EventIcon from '@material-ui/icons/Event';
import PagesIcon from '@material-ui/icons/Pages';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';

function NetworkSidebar() {
    
    return (
        <div className="network__sidebar">
            <p>Manage my network</p>
            <Tag Icon={SupervisorAccountIcon} tag="Connections" count="919" />
            <Tag Icon={RecentActorsIcon} tag="Contacts" count="743" />
            <Tag Icon={SupervisedUserCircleIcon} tag="People | Follow" count="20" />
            <Tag Icon={GroupIcon} tag="Groups" count="5" />
            <Tag Icon={EventIcon} tag="Events" count="2" />
            <Tag Icon={PagesIcon} tag="Pages" count="106" />
            <Tag Icon={AnnouncementIcon} tag="Newsletters" count="" />
            <Tag Icon={LocalOfferIcon} tag="Hashtags" count="24" />
        </div>
    )
}

export default NetworkSidebar
