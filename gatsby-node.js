const path = require(`path`)

async function createPosts({ graphql, createPage, reporter }) {
  const postDetailTemplate = path.resolve(`src/templates/postDetail.js`)

  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
              title
            }
          }
        }
      }
    }
  `)
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const posts = result.data.allMarkdownRemark.edges
  posts.forEach(({ node }, index) => {
    const prev = index === 0 ? null : posts[index - 1].node
    const next = index === posts.length - 1 ? null : posts[index + 1].node
    createPage({
      path: node.frontmatter.path,
      component: postDetailTemplate,
      context: {
        prev,
        next,
      },
    })
  })
}

async function createTags({ graphql, createPage, reporter }) {
  const tagDetailTemplate = path.resolve(`src/templates/tagDetail.js`)

  const result = await graphql(`
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
  result.data.allMarkdownRemark.nodes.forEach(node =>
    tags.push(...node.frontmatter.tags)
  )
  tags = Array.from(new Set(tags))

  for (const tag of tags) {
    createPage({
      path: `/tags/${tag}`,
      component: tagDetailTemplate,
      context: { tag },
    })
  }
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  await createPosts({ graphql, reporter, createPage })
  await createTags({ graphql, reporter, createPage })
}
