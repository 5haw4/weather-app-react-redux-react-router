import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Icon } from '@blueprintjs/core'

export default function MyLink(props) {
    const { showIcon = true, useNavLink } = props
    const isReactRouterLink = props.href.startsWith('/');
    const DynamicLink = isReactRouterLink ? (useNavLink ? NavLink : Link) : 'a';
    props = isReactRouterLink ? 
        {...props, to: props.href, ...(useNavLink ? {exact: true} : {})} : 
        {target: "_blank", rel: "noopener noreferrer", ...props}
    delete props.showIcon
    delete props.useNavLink
    return (
        <DynamicLink {...props} style={{margin: "auto 5px", ...props.style}} >
            {props.children}
            {!isReactRouterLink && showIcon && 
                <Icon icon="arrow-top-right" style={{color: "white"}} />
            }
        </DynamicLink>
    )
}