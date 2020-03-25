import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"

export default function PostDetailPage({ data, pageContext }, ...other) {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  const { prev, next } = pageContext
  return (
    <Layout>
      <h1 className="text-center text-2xl text-gray-800">
        {frontmatter.title}
      </h1>
      <h2 className="text-sm text-gray-400 text-center">{frontmatter.date}</h2>
      <article
        className="mt-5 max-w-xl m-auto"
        dangerouslySetInnerHTML={{ __html: html }}
      ></article>
      <div className="flex max-w-xl m-auto mt-10 items-center">
        <h2 className="mr-2 font-bold text-sm">Tags:</h2>
        {frontmatter.tags.map(tag => (
          <Link
            to={`/tags/${tag}`}
            key={tag}
            className="mr-2 bg-gray-200 rounded px-5 py-1 text-xs hover:bg-gray-300 border-gray-300 border"
          >
            {tag}
          </Link>
        ))}
      </div>
      <div className="flex justify-between mx-10">
        {prev && (
          <Link
            to={prev.frontmatter.path}
            className="px-5 py-2 border-gray-300 border rounded bg-gray-200 hover:bg-gray-300 flex flex-col justify-center"
          >
            <span className="text-xs text-gray-500">Previous Post</span>
            <span className="text-gray-800">{prev.frontmatter.title}</span>
          </Link>
        )}
        {!prev && <span></span>}
        {next && (
          <Link
            to={next.frontmatter.path}
            className="p-5 border-gray-300 border rounded bg-gray-200 hover:bg-gray-300 flex flex-col items-end justify-center"
          >
            <span className="text-xs text-gray-500">Next Post</span>
            <span className="text-gray-800">{next.frontmatter.title}</span>
          </Link>
        )}
      </div>
    </Layout>
  )
}

// This query automagically gives the results to the template.
// https://www.gatsbyjs.org/docs/adding-markdown-pages/

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        tags
      }
    }
  }
`
