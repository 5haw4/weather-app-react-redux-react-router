import React from 'react'

import { Callout, Card } from '@blueprintjs/core'

export default function MyCallout(props) {
    const { wrapperStyle = {}, style = {}, calloutStyle = {}, title = "An Error Occurred",
        intent = "danger", children, icon = false } = props;

    return (
        <div style={{width: "100%", ...wrapperStyle}}>
            <Card style={{ margin: "auto", maxWidth: "500px", padding: 0, ...style }}>
                <Callout style={calloutStyle} intent={intent} title={title} icon={icon}>
                    {children}
                </Callout>
            </Card>
        </div>
    )
}