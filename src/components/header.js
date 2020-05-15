import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `darkblue`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
      <div style={{display: `flex`}}>
        <h2><Link to="/test-one-loch-site-doc" style={{
            color: `white`,
            marginRight: `0.5rem`,
            textDecoration: `none`,
          }}>One</Link></h2>
        <h2><Link to="/test-two-site-doc" style={{
            color: `white`,
            marginRight: `0.5rem`,
            textDecoration: `none`,
          }} >Two</Link></h2>
        <h2><Link to="/test-three-site-doc" style={{
            color: `white`,
            marginRight: `0.5rem`,
            textDecoration: `none`,
          }} >Three</Link></h2>
        <h2><Link to="/test-four-site-doc" style={{
            color: `white`,
            marginRight: `0.5rem`,
            textDecoration: `none`,
          }} >Four</Link></h2>
        <h2><Link to="/young-woman-at-dresser" style={{
            color: `white`,
            marginRight: `0.5rem`,
            textDecoration: `none`,
          }} >Dresser</Link></h2>
        <h2><Link to="/casson-painting" style={{
            color: `white`,
            marginRight: `0.5rem`,
            textDecoration: `none`,
          }} >Casson</Link></h2>
        <h2><Link to="/trees" style={{
            color: `white`,
            marginRight: `0.5rem`,
            textDecoration: `none`,
          }} >Trees</Link></h2>
        <h2><Link to="/form" style={{
            color: `white`,
            marginRight: `0.5rem`,
            textDecoration: `none`,
          }} >Form</Link></h2>
      </div>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
