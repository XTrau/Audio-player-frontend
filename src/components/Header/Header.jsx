import { Link } from 'react-router-dom'
import './Header.scss'

function Header() {
  return (
    <header>
      <div className="header-left">
        <Link to="/">
          <h2>AudioPlayer</h2>
        </Link>
      </div>

      <div className="header-right">
        <nav className="navigation-left">
          <Link to="/">
            <span>Music</span>
          </Link>
          <Link to="add_artist">
            <span>Add Artist</span>
          </Link>
          <Link to="add_album">
            <span>Add Album</span>
          </Link>
          <Link to="add_track">
            <span>Add track</span>
          </Link>
        </nav>
        <div className="navigation-right">
          <Link to="/login">
            <svg
              width="50"
              height="48"
              viewBox="0 0 50 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.5"
                y="0.5"
                width="49"
                height="47"
                rx="15.5"
                fill="#ffffff"
                stroke="#ffffff"
              />
              <path
                d="M24.9059 24.9567C27.3096 24.9567 29.4333 22.8244 29.6414 20.203C29.7448 18.8861 29.3063 17.6581 28.4065 16.7457C27.5163 15.8444 26.2719 15.3481 24.9059 15.3481C23.5289 15.3481 22.2836 15.8414 21.3998 16.7371C20.5059 17.6426 20.0702 18.8733 20.1704 20.2022C20.3748 22.8239 22.498 24.9567 24.9059 24.9567Z"
                fill="#aaaaaa"
              />
              <path
                d="M33.7859 32.8031C33.4245 30.7529 32.2963 29.0307 30.5236 27.8222C28.9492 26.7489 26.9542 26.1578 24.9062 26.1578C22.8582 26.1578 20.8633 26.7489 19.2889 27.8217C17.5162 29.0303 16.388 30.7525 16.0266 32.8026C15.9439 33.2725 16.0561 33.7371 16.3344 34.0773C16.4607 34.2323 16.6192 34.3566 16.7984 34.441C16.9776 34.5254 17.1729 34.5678 17.3702 34.5651H32.4423C32.6397 34.568 32.8352 34.5257 33.0145 34.4414C33.1939 34.3571 33.3525 34.2328 33.4789 34.0777C33.7564 33.7375 33.8686 33.2729 33.7859 32.8031Z"
                fill="#aaaaaa"
              />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
