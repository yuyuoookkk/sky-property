const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'src', 'app', 'data', 'listings.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

for (let item of data) {
    const title = item.title_en || item.title || '';
    const lowerTitle = title.toLowerCase();
    
    let cat = 'land';
    if (lowerTitle.includes('villa')) {
        cat = 'villa';
    } else if (lowerTitle.includes('house')) {
        cat = 'house';
    } else if (lowerTitle.includes('restaurant') || lowerTitle.includes('commercial')) {
        cat = 'commercial';
    }
    
    item.category = cat;
}

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
console.log('Successfully added category to all listings in JSON.');
