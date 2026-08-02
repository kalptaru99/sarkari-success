import fs from 'fs';

let content = fs.readFileFactory('./src/app/api/generate-questions/route.js', 'utf8');
content = content.replace(/count: \d+/g, 'count: 5');
fs.writeFileSync('./src/app/api/generate-questions/route.js', content);
console.log('Done');
process.exit(0);