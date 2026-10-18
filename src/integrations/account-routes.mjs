// Public pages retain their static build; only the verified account deployment adds server routes.
export default function accountRoutes() {
  return {
    name: 'faith-reins-account-routes',
    hooks: {
      'astro:config:setup': ({ injectRoute }) => {
        injectRoute({ pattern: '/api/account/[...action]', entrypoint: './src/server/account-route.ts', prerender: false });
      },
    },
  };
}
