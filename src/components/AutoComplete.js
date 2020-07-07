import React, { useRef, useState } from 'react'

import { InputGroup, Menu } from '@blueprintjs/core'

export default function AutoComplete(props) {
    const inputRef = useRef(null)
    const { items, itemRenderer, noResults, inputProps = {} } = props;
    const [isOpened, setIsOpened] = useState(false)
    return (
        <div>
            <InputGroup large {...inputProps} inputRef={inputRef} 
                onFocus={() => setIsOpened(true)}
                onBlur={() => setTimeout(() => {setIsOpened(false)}, 100)}
            />
            {
                isOpened && 
                <Menu style={{position: "absolute", zIndex: 1, marginTop: "1px"}}
                    onClick={() => setIsOpened(false)}
                >
                    {!items || items.length <= 0 && noResults}
                    {items.map(itemRenderer)}
                </Menu>
            }
        </div>
    )
}
