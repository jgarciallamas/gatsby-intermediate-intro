const withDefaults = require('./utils/default-options');
const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');

exports.onPreBootstrap = ({ store }, options) => {
  const { program } = store.getState();

  //contentPath = 'docs' by default
  const { contentPath } = withDefaults(options);

  //Figure where we are and then append the contentPath to that out the content path

  const dir = path.join(program.directory, contentPath);

  //If directory doesn't exist, create it

  if (!fs.existsSync(dir)) {
    mkdirp.sync(dir);
  }

  // console.log('contentpath ', contentPath);
  // console.log('program.directory ', program.directory);
  // console.log('dir ', dir);
};

// exports.createSchemaCustomization = ({ actions }) => {
//   actions.createTypes(`
//     type DocsPage implements Node @dontInfer {
//       id: ID!,
//       title: String!,
//       path: String!,
//       date: Date! @dateformat,
//       body: String!
//     }

//     `);
// };
exports.createSchemaCustomization = ({ actions }) => {
  console.log('Jose createSchemaCustomization');
  actions.createTypes(`
    type DocsPage implements Node @dontInfer {
      id: ID!
      title: String!
      path: String!
      updated: Date! @dateformat
      body: String!
    }
  `);
};

// exports.onCreateNode = ({ node, actions, getNode, createNodeId }, options) => {
//   const { basePath } = withDefaults(options);
//   const parent = getNode(node.parent);

//   //we only want mdx files that are loaded by our theme
//   if (
//     node.internal.type !== 'Mdx' ||
//     parent.sourceInstanceName !== 'gatsby-theme-docs'
//   ) {
//     return;
//   }

//   // once we get to here, we know that our node is an Mdx node that was
//   // loaded by our theme

//   const pageName = parent.name !== 'index' ? parent.name : '';

//   actions.createNode({
//     id: createNodeId(`DocsPage-${node.id}`),
//     updated: parent.modifiedTime,
//     title: node.frontmatter.title || parent.name,
//     path: path.join('/', basePath, parent.relativeDirectory, pageName),
//     parent: node.id,
//     internal: {
//       type: 'DocsPage',
//       contentDigest: node.internal.contentDigest,
//     },
//   });
//   // console.log('updated..', parent.modifiedTime);
//   // console.log('title...', node.frontmatter.title || parent.name);
//   // console.log(
//   //   'path...',
//   //   path.join('/', basePath, parent.relativeDirectory, pageName),
//   // );
// };
exports.onCreateNode = ({ node, actions, getNode, createNodeId }, options) => {
  console.log('Jose onCreateNode', node.internal.type);

  const { basePath } = withDefaults(options);
  const parent = getNode(node.parent);

  // Only work on MDX files that were loaded by this theme
  if (
    node.internal.type !== 'Mdx' ||
    parent.sourceInstanceName !== 'gatsby-theme-docs'
  ) {
    return;
  }

  // Treat `index.mdx` link `index.html` (i.e. `docs/` vs. `docs/index/`).
  const pageName = parent.name !== 'index' ? parent.name : '';

  actions.createNode({
    id: createNodeId(`DocsPage-${node.id}`),
    title: node.frontmatter.title || parent.name,
    updated: parent.modifiedTime,
    path: path.join('/', basePath, parent.relativeDirectory, pageName),
    parent: node.id,
    internal: {
      type: 'DocsPage',
      contentDigest: node.internal.contentDigest,
    },
  });
};

// exports.createResolvers = ({ createResolvers }) => {
//   createResolvers({
//     DocsPage: {
//       body: {
//         type: 'String!',
//         resolve: (source, args, context, info) => {
//           const type = info.schema.getType('Mdx');
//           const mdxFields = type.getFields();
//           const resolver = mdxFields.body.resolve;

//           const mdxNode = context.nodeModel.getNodeById({ id: source.parent });
//           return resolver(mdxNode, args, context, { fieldName: 'body' });
//         },
//       },
//     },
//   });
// };

exports.createResolvers = ({ createResolvers }) => {
  console.log('Jose createResolvers');

  createResolvers({
    DocsPage: {
      body: {
        type: 'String!',
        resolve: (source, args, context, info) => {
          // Load the resolver for the `Mdx`type `body` field.
          const type = info.schema.getType('Mdx');
          const mdxFields = type.getFields();
          const resolver = mdxFields.body.resolve;

          const mdxNode = context.nodeModel.getNodeById({ id: source.parent });

          return resolver(mdxNode, args, context, {
            fieldName: 'body',
          });
        },
      },
    },
  });
};
