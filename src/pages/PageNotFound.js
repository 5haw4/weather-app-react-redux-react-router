import React from 'react'

import { H2, H4 } from '@blueprintjs/core'

export default function PageNotFound() {
    return (
        <div style={{textAlign: "center", marginTop: "5vh"}}>
            <H2 style={{color: "white"}}>404 Page Not Found</H2>
            <H4 style={{color: "white", marginTop: "1.5vh"}}>
                Make sure you entered the correct URL in the browser's search bar.
            </H4>
        </div>
    )
}
