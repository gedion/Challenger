// Initially taken from
// https://medium.freecodecamp.com/you-might-not-need-react-router-38673620f3d.
// A more complete implementation is at
// https://github.com/kriasoft/universal-router.

import pathtoRegexp from 'path-to-regexp';

// The path parameter is the path specified by the route.
// The uri is the location (presumably, the current location, for which
// we are trying to find a route.
function matchURI (path, uri) {
  const keys = [];
  const regex = pathtoRegexp(path, keys);
  const match = regex.exec(uri);
  if (!match) return null;
  const params = Object.create(null);
  for (let i = 1; i < match.length; i++) {
    // TODO: Why the extra logic for undefined?
    params[keys[i - 1].name] =
                      match[i] !== undefined ? match[i] : undefined;
  }
  return params;
}

async function resolve (routes, context) {
  for (const route of routes) {
    const uri = context.error ? '/error' : context.pathname;

    // params has an overloaded role here.  If params is empty but not null
    // that's a signal that the route matched the uri even though no recognized
    // params were included in the uri.  If params is null, the route did not
    // match the uri.
    const params = matchURI(route.path, uri);
    if (!params) continue;
    const result = await route.action({ ...context, params });
    if (result) return result;
  }
  const error = new Error('Not found');
  error.status = 404;
  throw error;
}

export default { resolve };
