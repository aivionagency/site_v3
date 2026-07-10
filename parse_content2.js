const fs = require('fs');

const content = fs.readFileSync('колл центр_кейс.html', 'utf8');

const titleMatch = content.match(/<h1 class="case-title[^>]*>([\s\S]*?)<\/h1>/);
const leadMatch = content.match(/<p class="case-lead[^>]*>([\s\S]*?)<\/p>/);

const bodyContent = content.split('<article class="case-body warm-section">')[1].split('</article>')[0];

console.log("=== Title ===");
console.log(titleMatch ? titleMatch[1] : null);
console.log("\n=== Lead ===");
console.log(leadMatch ? leadMatch[1] : null);
console.log("\n=== Body ===");
console.log(bodyContent);
