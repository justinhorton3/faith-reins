// Wix-managed login (OAuth code + PKCE), grounded in the official REST login guide.
// No passwords are collected here. Member tokens stay in this tab's session storage.
const host = document.querySelector('[data-account]');
if (host) {
  const CLIENT = host.dataset.clientId;
  const API = 'https://www.wixapis.com';
  const LOGIN_KEY = 'fr-member-login';
  const SESSION_KEY = 'fr-member-session';
  const status = host.querySelector('[data-account-status]');
  const login = host.querySelector('[data-account-login]');
  const logout = host.querySelector('[data-account-logout]');
  const identity = host.querySelector('[data-account-identity]');
  const callbackUri = () => new URL('/account.html', location.origin).href;
  const encode = bytes => btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
  const random = () => encode(crypto.getRandomValues(new Uint8Array(32)));
  let memberSession;

  function read(key) {
    try { return JSON.parse(sessionStorage.getItem(key) || 'null'); } catch { return null; }
  }
  async function request(path, body, accessToken) {
    const response = await fetch(API + path, {
      method: body ? 'POST' : 'GET',
      headers: { 'Content-Type': 'application/json', ...(accessToken ? { Authorization: accessToken } : {}) },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error('The account service is unavailable. Please try again or contact our team.');
    return data;
  }
  function secureRedirect(url) {
    const target = new URL(url);
    if (target.protocol !== 'https:') throw new Error('A secure sign-in link could not be created. Please contact our team.');
    location.assign(target.href);
  }
  function busy(on, message) {
    login.disabled = on; logout.disabled = on;
    host.setAttribute('aria-busy', String(on));
    if (message) status.textContent = message;
  }
  function signedOut(message = 'Sign in or create an account through our secure Wix sign-in page.') {
    memberSession = null; identity.textContent = ''; identity.hidden = true;
    login.hidden = false; logout.hidden = true; status.textContent = message;
  }
  async function showMember(session) {
    if (!session?.accessToken || !session?.refreshToken) throw new Error('Please sign in again.');
    if (session.expiresAt < Date.now() + 60000) {
      const tokens = await request('/oauth2/token', { clientId: CLIENT, grantType: 'refresh_token', refreshToken: session.refreshToken });
      session = tokenSession(tokens);
    }
    const data = await request('/members/v1/members/my', null, session.accessToken);
    if (!data.member?.id) throw new Error('We could not confirm your account. Please sign in again.');
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    memberSession = session;
    identity.textContent = data.member.loginEmail || 'Your Faith Reins member account'; identity.hidden = false;
    login.hidden = true; logout.hidden = false;
    status.textContent = 'You are signed in. For order updates, receipts or changes to a recurring gift, contact our team using the options below.';
  }
  function tokenSession(tokens) {
    if (!tokens.access_token || !tokens.refresh_token || !tokens.expires_in) throw new Error('Sign-in could not be completed. Please try again.');
    return { accessToken: tokens.access_token, refreshToken: tokens.refresh_token, expiresAt: Date.now() + tokens.expires_in * 1000 };
  }
  login.addEventListener('click', async () => {
    busy(true, 'Opening secure sign-in…');
    try {
      const verifier = random(), state = random();
      const challenge = encode(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier))));
      const redirectUri = callbackUri();
      sessionStorage.setItem(LOGIN_KEY, JSON.stringify({ verifier, state, redirectUri, startedAt: Date.now() }));
      const visitor = await request('/oauth2/token', { clientId: CLIENT, grantType: 'anonymous' });
      const result = await request('/_api/redirects-api/v1/redirect-session', {
        auth: { authRequest: { redirectUri, clientId: CLIENT, codeChallenge: challenge, codeChallengeMethod: 'S256', responseMode: 'fragment', responseType: 'code', scope: 'offline_access', state } },
      }, visitor.access_token);
      secureRedirect(result.redirectSession?.fullUrl);
    } catch (error) {
      sessionStorage.removeItem(LOGIN_KEY);
      status.textContent = 'We could not open sign-in right now. Please try again or contact our team for account help.';
    } finally { busy(false); }
  });
  logout.addEventListener('click', async () => {
    busy(true, 'Signing out…');
    try {
      const result = await request('/_api/redirects-api/v1/redirect-session', { logout: { clientId: CLIENT }, callbacks: { postFlowUrl: callbackUri() } }, memberSession.accessToken);
      sessionStorage.removeItem(SESSION_KEY); memberSession = null;
      secureRedirect(result.redirectSession?.fullUrl);
    } catch { status.textContent = 'We could not complete sign-out right now. Please try again.'; }
    finally { busy(false); }
  });
  (async () => {
    busy(true);
    try {
      const params = new URLSearchParams(location.hash.slice(1));
      const code = params.get('code');
      if (code || params.has('error')) {
        // Remove authorization data from browser history before any further processing.
        history.replaceState(null, '', location.pathname + location.search);
        const saved = read(LOGIN_KEY); sessionStorage.removeItem(LOGIN_KEY);
        if (params.has('error')) throw new Error('Sign-in was not completed. You can try again.');
        if (!saved || !saved.verifier || !saved.state || !Number.isFinite(saved.startedAt) || saved.startedAt > Date.now() || saved.state !== params.get('state') || Date.now() - saved.startedAt > 15 * 60 * 1000 || saved.redirectUri !== callbackUri()) {
          throw new Error('We could not verify this sign-in request. Please start sign-in again.');
        }
        const tokens = await request('/oauth2/token', { clientId: CLIENT, grantType: 'authorization_code', redirectUri: saved.redirectUri, code, codeVerifier: saved.verifier });
        await showMember(tokenSession(tokens));
      } else {
        const session = read(SESSION_KEY);
        if (session) await showMember(session); else signedOut();
      }
    } catch (error) { sessionStorage.removeItem(SESSION_KEY); signedOut(error.message); }
    finally { busy(false); }
  })();
}
