import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { useDispatch } from 'react-redux'

//components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Toaster from './components/Toaster'

//pages
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import PageNotFound from './pages/PageNotFound'

//blueprint.js css
import "../node_modules/normalize.css/normalize.css"
import "../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css"
import "../node_modules/@blueprintjs/core/lib/css/blueprint.css"

//actions
import { loadFavoritesFromCookie } from './store/actions/favoriteActions'
import { loadSettingsFromCookie } from './store/actions/settingsActions'

export default function App() {
	const disptach = useDispatch()

	useEffect(() => {
		//loading the favorites from the cookies into the favorite reducer
		disptach(loadFavoritesFromCookie())
		//load the settings from cookies into the settings reducer
		disptach(loadSettingsFromCookie())
	}, [])

	return (
		<>
			<BrowserRouter basename="/shawn-weather-05-07-2020">
				<Navbar />
				<div id="content">
					<Switch>
						<Route exact path={"/"} component={Home} />
						<Route exact path={"/favorites"} component={Favorites} />
						<Route path={"*"} component={PageNotFound} />
					</Switch>
				</div>
				<Footer />
			</BrowserRouter>
			<Toaster />
		</>
	);
}
