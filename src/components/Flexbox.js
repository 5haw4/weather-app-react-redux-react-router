import React from 'react'

import '../styles/components/flexbox.scss'

export default function Flexbox(props) {
    const { leftItems, centerItems, rightItems,
    leftStyle, centerStyle, rightStyle } = props
    return (
        <div className="flexbox" style={props.style}>
            {leftItems && <div className="flexbox" style={leftStyle}>
                {leftItems.map((item,i) => <div key={i}>{item}</div>)}
            </div>}
            {centerItems && <div className="flexbox" style={centerStyle}>
                {centerItems.map((item,i) => <div key={i}>{item}</div>)}
            </div>}
            {rightItems && <div className="flexbox" style={rightStyle}>
                {rightItems.map((item,i) => <div key={i}>{item}</div>)}
            </div>}
        </div>
    )
}