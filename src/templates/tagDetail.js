import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"

export default function TagDetailPage({ data, pageContext }) {
  const pages = data.allMarkdownRemark.nodes
  return (
    <Layout>
      <h1 className="text-center text-2xl text-gray-800 text-bold">
        Posts about {pageContext.tag}
      </h1>
      <div className="grid grid-cols-2">
        {pages.map(page => (
          <Link
            key={page.frontmatter.path}
            to={page.frontmatter.path}
            className="m-2 bg-gray-200 px-5 py-4 rounded flex flex-col"
          >
            <h2 className="text-base">{page.frontmatter.title}</h2>
            <p className="text-gray-500 text-sm">{page.frontmatter.excerpt}</p>
          </Link>
        ))}
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($tag: String!) {
    allMarkdownRemark(filter: { frontmatter: { tags: { in: [$tag] } } }) {
      nodes {
        frontmatter {
          path
          title
          excerpt
          tags
        }
      }
    }
  }
`
