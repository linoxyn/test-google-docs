const path = require(`path`)

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
