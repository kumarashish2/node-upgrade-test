// index.js
const url = require('url');

/**
 * A function that parses a URL using the legacy url.parse() method.
 * This method's behavior changed in Node.js v21, making it a
 * potential breaking change when upgrading from v20.
 * @param {string} urlString - The URL to parse.
 * @returns {object} The parsed URL object.
 */
function parseLegacyUrl(urlString) {
  console.log(`Parsing URL: ${urlString}`);
  // This is the line your agent should detect as a breaking change for Node v21+.
  const parsedUrl = url.parse(urlString);
  return parsedUrl;
}

// --- Main execution ---
const myUrl = 'http://example.com/path?query=string#hash';
const parsed = parseLegacyUrl(myUrl);

console.log('--- Parsed URL Object ---');
console.log(parsed);

console.log('\nThis script runs correctly on Node v20.');
console.log('However, the use of "url.parse()" is a known breaking change in Node v21.');

