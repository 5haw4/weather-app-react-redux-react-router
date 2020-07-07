import React,{ useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button, Icon, Tooltip, Alert, InputGroup, FormGroup } from '@blueprintjs/core'

import Flexbox from './Flexbox'
import Link from './Link'
import LinkButton from './LinkButton'

import { setCookie } from '../utils/cookies'
import { USER_WEATHER_API_KEY_CID } from '../utils/consts'

import { toggleDarkMode, toggleTempUnit } from '../store/actions/settingsActions'
import { addToast } from '../store/actions/toasterActions'

export default function Navbar() {
    const dispatch = useDispatch()
    const [isApiKeyAlertOpened, setIsApiKeyAlertOpened] = useState(false)
    const [userApiKeyInput, setUserApiKeyInput] = useState("")
    const { isTempCels, isDarkMode } = useSelector(state => state.settingsReducer)

    const updateUserApiKey = () => {
        //clearing the input in the alert
        setUserApiKeyInput("")
        //updating the cookie
        setCookie(USER_WEATHER_API_KEY_CID, userApiKeyInput)
        //showing success toast
        dispatch(addToast({ intent: "SUCCESS", icon: "tick", message: 
            `API key ${userApiKeyInput ? "updated" : "removed"} successfully` }))
    }

    //alert for the user API key input
    const alertApiKey = <Alert isOpen={isApiKeyAlertOpened} canEscapeKeyCancel canOutsideClickCancel
        intent="success" confirmButtonText="Update API Key" cancelButtonText="Cancel"
        onClose={() => setIsApiKeyAlertOpened(false)}
        onCancel={() => setUserApiKeyInput("")}
        onConfirm={() => updateUserApiKey()}>
        <FormGroup label="Set Your AccurWeather API Key" helperText={`The API key needs to be an AccuWeather 
            API key, it will be saved on your browser as a cookie.`}>
            <InputGroup value={userApiKeyInput} onChange={e => setUserApiKeyInput(e.target.value)} />
        </FormGroup>
    </Alert>

    return (
        <div id="navbar">
            <Flexbox
                style={{padding: 0,}}
                leftItems={[
                    <Link href="/" style={{margin: 0, textDecoration: "none"}}>
                        <h1 style={{margin: 0, color: "white"}}>
                            <Icon icon="cloud" iconSize="36" /> WeatherApp
                        </h1>
                    </Link>
                ]}
                rightItems={[
                    <Tooltip content={`${isDarkMode ? "Light" : "Dark"} Mode`}>
                        <Button minimal style={{color: "white"}} onClick={() => dispatch(toggleDarkMode())}
                            icon={<Icon icon={isDarkMode ? "flash" : "moon"} 
                            style={{color: "white"}} intent="primary" />}
                        />
                    </Tooltip>,
                    <Tooltip content="Use Your Own API Key">
                        <Button minimal style={{color: "white"}}
                            onClick={() => setIsApiKeyAlertOpened(true)}
                            icon={<Icon icon="code" style={{color: "white"}} intent="primary" />}
                        />
                    </Tooltip>,
                    <Tooltip content="Toggle Temp Unit">
                        <Button minimal style={{color: "white"}} text={isTempCels ? "Cels." : "Fahr."}
                            onClick={() => dispatch(toggleTempUnit())}
                            icon={<Icon icon="snowflake" style={{color: "white"}} intent="primary" />}
                        />
                    </Tooltip>,
                    <LinkButton useNavLink href="/" icon="home">Home</LinkButton>,
                    <LinkButton useNavLink href="/favorites" icon="star">Favorites</LinkButton>,
                ]}
            />
            {alertApiKey}
        </div>
    )
}
