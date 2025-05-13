module.exports = {
  title: 'Mon Blog',
  url: 'https://jordan-creyelman.github.io',
  baseUrl: '/mon-blog/',
  organizationName: 'jordan-creyelman', // ✅ Nom d'utilisateur GitHub
  projectName: 'mon-blog', // ✅ Nom du repo GitHub
  trailingSlash: false,
  deploymentBranch: 'gh-pages', 

  presets: [
    [
      'classic',
      {
        blog: {
          blogTitle: 'Blog',
          blogDescription: 'Articles récents',
          postsPerPage: 6, // ✅ Pagination : 6 articles par page
          routeBasePath: '/', // ✅ Blog sur la page d’accueil
          showReadingTime: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'Mon Blog',
      items: [
        {to: '/', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/jordan-creyelman/mon-blog',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `© ${new Date().getFullYear()} jordan-creyelman`,
    },
  },
};
