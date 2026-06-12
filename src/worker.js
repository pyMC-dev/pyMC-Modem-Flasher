const ASSET_PREFIXES = [
  '/css/',
  '/firmware/',
  '/img/',
  '/lib/',
];

const ASSET_FILES = new Set([
  '/',
  '/index.html',
  '/config.json',
  '/releases',
  '/favicon.ico',
]);

const ASSET_EXTENSIONS = /\.(?:css|html|ico|js|json|map|png|svg|txt|webmanifest|bin|zip)$/i;

function isAssetPath(pathname) {
  return ASSET_FILES.has(pathname)
    || ASSET_PREFIXES.some(prefix => pathname.startsWith(prefix))
    || ASSET_EXTENSIONS.test(pathname);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (!isAssetPath(url.pathname)) {
      return Response.redirect(`${url.origin}/`, 302);
    }

    return env.ASSETS.fetch(request);
  },
};
