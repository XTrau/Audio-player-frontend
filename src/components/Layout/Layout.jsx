import TrackController from '../TrackController/TrackController'
import Header from '../Header/Header'

function Layout({ children }) {
  return (
    <>
      <Header />
      <main>
        <div className="main-wrapper">{children}</div>
      </main>
      <TrackController />
      <footer></footer>
    </>
  )
}

export default Layout
