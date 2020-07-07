import React, { useEffect, useState } from 'react'

//libraries
import { connect } from 'react-redux'
import { MenuItem, Card, H2, Spinner, Button, } from '@blueprintjs/core'

//utils
import { getDayNameByIndex, } from '../utils/utils'

//components
import Flexbox from '../components/Flexbox'
import Temp from '../components/Temp'
import Link from '../components/Link'
import Callout from '../components/Callout'
import AutoComplete from '../components/AutoComplete'

//actions
import { updateSelectedLocation, updateSearchQuery, getLocationData, loadAutoComplete, getUserGeolocation
} from '../store/actions/searchActions'
import { toggleFavoriteLocation } from '../store/actions/favoriteActions'

const Home = (props) => {
    //data from the relevant reducers
    const { autoComplete = [], selectedLocation, searchQuery, locationsData, 
        isLoadingAutoComplete = false } = props.searchReducer
    const { favorites } = props.favoriteReducer

    //getting the selected location's data
    const data = locationsData[selectedLocation.key] || {}
    const { isLoading = true, overview = {}, fiveDaysForcast = [], errorMessage = false } = data;
    const { overviewText = "", city = "", country = "", key = "", temp = "", link = "", iconId = "" } = overview;
    const isFavorite = !!favorites.find(item => item.key == key)
    const isGeoLocationSelected = !Object.keys(selectedLocation).length;

    useEffect(() => {
        //if selected geo asking the user for permission and getting data
        if(isGeoLocationSelected) props.getUserGeolocation()
        //else loading selected location's data
        else props.getLocationData(selectedLocation)
    }, [selectedLocation])

    //managing auto complete cooldown, so it wouldn't spam the server with redundant requests
    const [autoComplSearchTimeout, setAutoComplSearchTimeout] = useState(null)
    useEffect(() => {
        clearTimeout(autoComplSearchTimeout);
        setAutoComplSearchTimeout(setTimeout(() => props.loadAutoComplete(), 350));
    }, [searchQuery])

    const searchBox = <div style={{display: "flex", flexFlow: "column", alignItems: "center", justifyContent: "center"}}>
        <H2 style={{color: "white"}}>Search For a Location</H2>
        <AutoComplete
            inputProps={{
                value: searchQuery,
                onChange: (e) => props.updateSearchQuery(e.target.value),
                placeholder: "Type a city to get its weather",
                style: {width: "100vw", maxWidth: "550px", margin: "auto"},
            }}
            items={autoComplete}
            itemRenderer={item => <MenuItem style={{width: "100vw", maxWidth: "540px"}}
                key={item.key} text={`${item.city}, ${item.country}`}
                onClick={() => props.updateSelectedLocation(item)}
            />}
            noResults={<MenuItem style={{width: "100vw", maxWidth: "540px"}} disabled
                text={
                    isLoadingAutoComplete ?
                    <>
                        <div className="bp3-skeleton">This is placeholder for shiver</div> 
                        <div className="bp3-skeleton" style={{marginTop: "7.5px"}}>This is placeholder for shiver</div>
                    </>
                    :
                    (searchQuery.length > 0 ? "No Results" : "Start typing a location to see results")
                } />
            }
        />
    </div>
    
    const errorCallout = !isLoading && errorMessage && 
        <Callout style={{marginTop: "2.5vh"}} title={"An Error Occurred"} 
            intent={"DANGER"} icon="error" >
                {errorMessage}
        </Callout>

    const searchResult = isLoading ? 
        <div style={{margin: "2.5vh 2.5vw"}}><Spinner className="white-spinner" /></div> 
        : <Card elevation="4" style={{marginTop: "2.5vh", minHeight: "55vh", 
            display: "flex", flexFlow: "column", justifyContent: "space-between"}}>
        <Flexbox style={{alignItems: "start"}} leftItems={[
            <Link href={link} style={{textDecoration: "none", margin: "unset"}} showIcon={false}>
                <Card elevation="2" interactive >
                    #{key}<br/>
                    {city}, {country}<br/>
                    <Temp temp={temp} />
                </Card>
            </Link>
        ]} 
        leftStyle={{flex: 1}}
        rightStyle={{flex: 1, justifyContent: "end"}}
        rightItems={[
            <Button onClick={() => props.toggleFavoriteLocation({key, city, country})} 
                icon={isFavorite ? "star" : "star-empty"}>
                {isFavorite ? "Location Marked As Favorite" : "Favorite This Location"}
            </Button>
        ]}
        />
        <div style={{textAlign: "center", margin: "0 auto 7.5vh"}} >
            {iconId && <img src={`https://www.accuweather.com/images/weathericons/${iconId}.svg`} 
                alt={overviewText} style={{maxWidth: "100px", maxHeight: "100px"}} />}
            <H2>{overviewText}</H2>
        </div>
        <Flexbox centerStyle={{width: "100%", justifyContent: "space-around"}} centerItems={
            fiveDaysForcast.map(item => (
                <Link href={item.link} style={{textDecoration: "none"}} showIcon={false}>
                    <Card interactive elevation="2" style={{textAlign: "center", margin: "5px"}}>
                        <div><b>{getDayNameByIndex(new Date(item.date * 1000).getDay())}</b></div>
                        <div><Temp temp={item.temp} /></div>
                    </Card>
                </Link>
            ))
        } />
    </Card>

    return (
        <div>
            {searchBox}
            {errorMessage ? errorCallout : searchResult}
        </div>
    )
}


/*
    getting the data from the reducers and dispatching actions this way instead of 
    with hooks in order to easily track the data and actions that's being used
    in this component
*/
const mapStateToProps = (state) => {
    return {
        searchReducer: state.searchReducer,
        favoriteReducer: state.favoriteReducer,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateSelectedLocation: (item) => dispatch(updateSelectedLocation(item)),
        updateSearchQuery: (value) => dispatch(updateSearchQuery(value)),
        getLocationData: (item) => dispatch(getLocationData(item)),
        toggleFavoriteLocation: (item) => dispatch(toggleFavoriteLocation(item)),
        loadAutoComplete: () => dispatch(loadAutoComplete()),
        getUserGeolocation: () => dispatch(getUserGeolocation()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);