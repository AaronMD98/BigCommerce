import { redirect } from 'next/navigation';

const canonicalDomain: string = process.env.BIGCOMMERCE_GRAPHQL_API_DOMAIN ?? 'mybigcommerce.com';
const BIGCOMMERCE_STORE_HASH = process.env.BIGCOMMERCE_STORE_HASH ?? '';
const ENABLE_ADMIN_ROUTE = process.env.ENABLE_ADMIN_ROUTE === 'true'; // Convert to boolean directly
const SITE_ID = process.env.CHANNEL_ID ?? '';
const ACCESS_TOKEN = process.env.BIGCOMMERCE_ACCESS_TOKEN;

const fetch = require('node-fetch');

let url = `https://api.bigcommerce.com/stores/${BIGCOMMERCE_STORE_HASH}/v3/sites/${SITE_ID}`;

let options = {
  method: 'PUT',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Auth-Token': `${ACCESS_TOKEN}`,
  },
  body: `{"url":"https://big-commerce-atld8noeg-aaronmd98s-projects.vercel.app"}`,
};

fetch(url, options)
  .then((res: any) => res.json())
  .then((json: any) => console.log(json))
  .catch((err: string) => console.error('error:' + err));

export const GET = () => {
  // This route should not work unless explicitly enabled
  if (ENABLE_ADMIN_ROUTE !== 'true') {
    return redirect('/');
  }

  return redirect(
    BIGCOMMERCE_STORE_HASH
      ? `https://store-${BIGCOMMERCE_STORE_HASH}.${canonicalDomain}/admin`
      : 'https://login.bigcommerce.com',
  );
};

export const runtime = 'edge';
