import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

// import Layout from "../components/layout"
// import Image from "../components/image"
// import SEO from "../components/seo"

import Header from "../components/header"

const AllTagsPage = () => {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark {
        nodes {
          frontmatter {
            tags
          }
        }
      }
    }
  `)
  let tags = []
  data.allMarkdownRemark.nodes.forEach(node =>
    tags.push(...node.frontmatter.tags)
  )
  tags = Array.from(new Set(tags))
  return (
    <>
      {/* <SEO title="Home" /> */}
      <Header />
      <h1 className="text-center text-2xl text-gray-800 text-bold">All Tags</h1>
      <div className="grid grid-cols-3">
        {tags.map(tag => (
          <Link
            key={tag}
            to={`/tags/${tag}`}
            className="m-2 bg-gray-200 px-5 py-2 rounded text-center"
          >
            {tag}
          </Link>
        ))}
      </div>
    </>
  )
}

export default AllTagsPage
