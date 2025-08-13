module.exports = {
  source: {
    include: ['src/hooks'],
    includePattern: '.js$',
    excludePattern: '(node_modules/|__tests__/)'
  },
  plugins: ['jsdoc-http-plugin'],
  templates: {
    cleverLinks: true,
    monospaceLinks: true,
    default: {
      outputSourceFiles: true,
      includeDate: false
    }
  },
  opts: {
    destination: './docs',
    recurse: true,
    template: 'node_modules/docdash',
    theme_opts: {
      title: 'AKR Application - useCategory Hook Documentation',
      navbar: {
        title: 'useCategory Hook',
        fixed: true
      },
      sidebar: {
        scroll: true
      }
    }
  },
  tags: {
    allowUnknownTags: true,
    dictionaries: ['jsdoc', 'closure']
  }
};
