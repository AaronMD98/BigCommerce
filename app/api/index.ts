const BIGCOMMERCE_STORE_HASH = process.env.BIGCOMMERCE_STORE_HASH ?? '';
// Convert to boolean directly
const ENABLE_ADMIN_ROUTE = process.env.ENABLE_ADMIN_ROUTE === 'true';
const SITE_ID = process.env.CHANNEL_ID;
const ACCESS_TOKEN = process.env.BIGCOMMERCE_ACCESS_TOKEN;

// Assuming you want to fetch information for a specific site, you should include SITE_ID in your URL
const url: string = `https://api.bigcommerce.com/stores/${BIGCOMMERCE_STORE_HASH}/v3/sites/sites`;

const headers: Record<string, string> = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

if (ACCESS_TOKEN) {
  headers['X-Auth-Token'] = ACCESS_TOKEN;
}

const options = {
  method: 'GET',
  headers,
};

async function fetchSites() {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      // This will catch HTTP errors such as 404, 500 etc.
      throw new Error(`Error: ${response.statusText}`);
    }
    const json = await response.json();
    console.log('OUTPUT', json);
  } catch (err) {
    // This will catch network errors and errors thrown from the above throw statement
    console.error('Error:', err);
  }
}

// Optionally, you might want to conditionally call fetchSites based on ENABLE_ADMIN_ROUTE
if (ENABLE_ADMIN_ROUTE) {
  fetchSites();
} else {
  console.log('Admin route not enabled.');
}
