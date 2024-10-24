import TrackController from '../TrackController/TrackController'
import Header from '../Header/Header'

function Layout({children}) {
	return (
		<>
			<Header/>
			<main>
				{children}
			</main>
			<TrackController/>
		</>
	)
}

export default Layout
