import React from 'react'
import './MyNetwork.css'
import NetworkFeed from './NetworkFeed'
import NetworkSidebar from './NetworkSidebar'

function MyNetwork() {
    return (
        <div className="myNetwork">
            <NetworkSidebar />
            <NetworkFeed />
        </div>
    )
}

export default MyNetwork
