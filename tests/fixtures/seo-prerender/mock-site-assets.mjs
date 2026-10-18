// Synthetic script-service response: never contacts Wix or uses credentials.
export const scripts = {
  async listSiteScripts({ pageUrl }) {
    return {
      siteScripts: [{
        position: 'HEAD',
        html: '<title wix-seo-tag="true">Fixture injected title</title>' +
          '<meta name="diagnostic-requested-page-url" content="' + pageUrl + '">',
      }],
    };
  },
};
