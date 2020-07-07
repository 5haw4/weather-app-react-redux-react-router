import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Toaster } from '@blueprintjs/core'

import { removeFirstToast } from '../store/actions/toasterActions'

export default function ToasterFunc() {
    const toasts = useSelector(state => state.toasterReducer.toasts)
    const dispatch = useDispatch()
    const [ref, setRef] = useState(false)

    useEffect(() => {
        /*
            - if there are toasts in the array
                - fire the first one
                - remove it from the array
                - default toast is "DANGER" style and "Unknown error occured" message
        */
        toasts.forEach(toast => {
            const { intent = "DANGER" } = toast;
            //firing the toast
            ref.show({
                intent,
                icon: intent.toUpperCase() == "SUCCESS" ? "tick" : "warning-sign",
                message: typeof toast == "string" ? toast : "Unknown error occurred", 
                ...(typeof toast == "object" ? toast : {})
            })
            dispatch(removeFirstToast())
        }, [toasts])

    })

    return (
        <Toaster maxToasts={5}
            ref={(ref) => {setRef(ref)}} 
        />
    )
}