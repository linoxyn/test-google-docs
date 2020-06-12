const path = require(`path`)
// require('dotenv').config({
//     path: `.env.${process.env.NODE_ENV || 'development'}`
//   })
exports.createPages = async ({graphql, actions}) =>
    graphql(
        `
            {
                allGoogleDocs {
                    nodes {
                        document {
                            path
                        }
                    }
                }
            }
        `
    ).then(result => {
        result.data.allGoogleDocs.nodes.forEach(({document}, index) => {
            actions.createPage({
                path: document.path,
                component: path.resolve(`./src/templates/post.js`),
            })
        })
    })
