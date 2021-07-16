import React from 'react'
import './Tag.css'

function Tag({ Icon, tag, count}) {
    return (
        <div className="tag">
            <div className="tag__left">
                <Icon />
                <div className="tag__title">{tag}</div>
            </div>
            <div className="tag__right">
                <div className="tag__count">{count}</div>
            </div>
        </div>
    )
}

export default Tag
