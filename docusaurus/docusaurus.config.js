module.exports = {
  title: 'React Native Responsive Linechart',
  tagline: 'Charts for React Native on easy mode',
  url: 'https://react-native-responsive-linechart.surge.sh',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'n1ghtly', // Usually your GitHub org/user name.
  projectName: 'react-native-responsive-linechart', // Usually your repo name.
  plugins: [
    [
      '@couds/docusaurus-resolve-plugin',
      {
        alias: {
          'react-native': 'react-native-web',
          'react-native-svg': 'react-native-svg-web-transform',
        },
      },
    ],
  ],
  themeConfig: {
    sidebarCollapsible: false,
    navbar: {
      title: 'react-native-responsive-linechart',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'docs',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        { to: 'blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/N1ghtly/react-native-responsive-linechart',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',

      copyright: `Copyright © ${new Date().getFullYear()} react-native-responsive-linechart, Inc. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          // It is recommended to set document id as docs home page (`docs/` path).
          homePageId: 'gettingstarted',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/N1ghtly/react-native-responsive-linechart/edit/master/docusaurus/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl: 'https://github.com/N1ghtly/react-native-responsive-linechart/edit/master/docusaurus/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
}
