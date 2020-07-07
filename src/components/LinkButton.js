import React from 'react'

import Link from './Link'

import { Button, Icon } from '@blueprintjs/core'

export default function LinkButton(props) {
    const { href, icon, children, useNavLink, btnStyle = {}, iconStyle = {}, btnProps = {} } = props
    const rightIcon = !href.startsWith("/") && "arrow-top-right";
    return (
        <Link useNavLink={useNavLink} href={href} showIcon={false}>
            <Button minimal style={{color: "white", ...btnStyle}}
                icon={icon && <Icon icon={icon} style={{color: "white", ...iconStyle}} intent="primary" />}
                rightIcon={rightIcon && <Icon icon={rightIcon} style={{color: "white", ...iconStyle}} intent="primary" />}
                {...btnProps}
            >{children}</Button>
        </Link>
    )
}
