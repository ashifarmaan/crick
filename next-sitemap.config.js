/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://uccricket.live/', // Change this to your actual website URL
    generateRobotsTxt: true, // Generate robots.txt
    sitemapSize: 500000, // Max URLs per sitemap
    changefreq: 'daily', // How often pages change
    priority: 0.7, // Default priority for pages
    exclude: ['/admin', '/dashboard'], // Exclude private pages
    robotsTxtOptions: {
      policies: [
        { userAgent: '*', allow: '/' },
        { userAgent: 'Googlebot', allow: '/' },
        { userAgent: '*', disallow: ['/admin', '/dashboard'] },
      ],
      additionalSitemaps: [
        'https://example.com/sitemap-1.xml', // Add more sitemaps if needed
      ],
    },
  };
  