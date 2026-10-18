import type { APIRoute } from 'astro';
import { handleAccountRequest } from './account-handler.mjs';
import { accountDriver } from './wix-account.mjs';

export const prerender = false;
export const ALL: APIRoute = ({ request, params }) => handleAccountRequest(request, params.action || '', accountDriver);
