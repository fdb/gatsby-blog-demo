import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `)
  const { title, description } = data.site.siteMetadata
  return (
    <Link
      to="/"
      className="bg-gray-500 flex flex-col items-center py-5 text-white mb-5"
      style={{
        fontFamily: "Avenir",
      }}
    >
      <h2>{title}</h2>
      <p>{description}</p>
    </Link>
  )
}

export default Header
