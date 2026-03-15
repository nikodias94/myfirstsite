const fs = require('fs');

function checkFile(filepath) {
    const content = fs.readFileSync(filepath, 'utf8');
    let braceCount = 0;
    let commentOpen = false;
    
    for (let i = 0; i < content.length; i++) {
        if (content[i] === '/' && content[i+1] === '*') {
            commentOpen = true;
            i++;
        } else if (content[i] === '*' && content[i+1] === '/') {
            commentOpen = false;
            i++;
        } else if (!commentOpen) {
            if (content[i] === '{') braceCount++;
            if (content[i] === '}') braceCount--;
        }
    }
    console.log(`${filepath}: Braces: ${braceCount}, CommentOpen: ${commentOpen}`);
}

checkFile('src/index.css');
checkFile('src/pages.css');
checkFile('src/responsive.css');
