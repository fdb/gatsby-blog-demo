import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

// import Layout from "../components/layout"
// import Image from "../components/image"
// import SEO from "../components/seo"

import Layout from "../components/layout"

const PageThumbnail = ({ title, path, date, excerpt }) => (
  <div className="m-5 p-5 bg-gray-200 text-gray-800 shadow rounded" key={path}>
    <Link to={path}>
      <h2 className="">{title}</h2>
      <p className="text-gray-600">{excerpt}</p>
      <div className="text-xs">Read more...</div>
    </Link>
  </div>
)

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
        edges {
          node {
            frontmatter {
              title
              path
              date
              excerpt
            }
          }
        }
      }
    }
  `)
  let pages = data.allMarkdownRemark.edges
  pages = pages.map(p => p.node.frontmatter)
  return (
    <Layout>
      {/* <SEO title="Home" /> */}
      {pages.map(PageThumbnail)}
      <Link
        to="/tags"
        className="mx-5 px-2 py-2 bg-gray-200 hover:bg-gray-300 border border-gray-300 rounded"
      >
        Browse by Tag
      </Link>
    </Layout>
  )
}

export default IndexPage
