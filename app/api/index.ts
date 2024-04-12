const BIGCOMMERCE_STORE_HASH = process.env.BIGCOMMERCE_STORE_HASH ?? '';
// Convert to boolean directly
const ENABLE_ADMIN_ROUTE = process.env.ENABLE_ADMIN_ROUTE === 'true';
const SITE_ID = process.env.BIGCOMMERCE_CHANNEL_ID;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

// Assuming you want to fetch information for a specific site, you should include SITE_ID in your URL
const url = `https://api.bigcommerce.com/stores/${BIGCOMMERCE_STORE_HASH}/v3/sites/1001`;

///// GET URL
// const urlGET: string = `https://api.bigcommerce.com/stores/${BIGCOMMERCE_STORE_HASH}/v3/channels/${SITE_ID}/site`;

///// POST URL
// const urlPOST = `https://api.bigcommerce.com/stores/${BIGCOMMERCE_STORE_HASH}/v3/sites/${SITE_ID}/routes`;

const headers: Record<string, any> = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'X-Auth-Token': ACCESS_TOKEN,
};

// const options = {
//   method: 'GET',
//   headers,
// };

// const optionsPOST = {
//   method: 'POST',
//   headers,
// };

const optionsPUT = {
  method: 'PUT',
  headers,
  body: `{"url":"https://big-commerce-git-main-aaronmd98s-projects.vercel.app"
  }`,
};

export async function fetchSites() {
  try {
    // GET THE SITE CHANNEL
    // const res = await fetch(urlGET, options);
    // UPDATE THE SITE URL
    const response = await fetch(url, optionsPUT);

    if (!response.ok) {
      // This will catch HTTP errors such as 404, 500 etc.
      throw new Error(`Error: ${response.statusText} : ${url}`);
    }
    const json = await response.json();
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
