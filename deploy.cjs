const { execSync } = require('child_process');

process.env.CLOUDFLARE_API_TOKEN = 'NkmQgdQFxUU0o_fCvGYQ4ZmoLy8DrlCxBOKLELjP';
process.env.CLOUDFLARE_ACCOUNT_ID = '25320828b3f2e2004ac4877cdecac442';

const opts = {
    stdio: 'inherit',
    cwd: __dirname,
    env: { ...process.env }
};

// Step 1: Create project (ignore error if it already exists)
try {
    console.log('\n=== Creating Pages project "myfirstsite" ===\n');
    execSync('npx wrangler pages project create myfirstsite --production-branch main', opts);
    console.log('\nProject created successfully!\n');
} catch (e) {
    console.log('\nProject may already exist, continuing with deploy...\n');
}

// Step 2: Deploy
try {
    console.log('\n=== Deploying to Cloudflare Pages ===\n');
    execSync('npx wrangler pages deploy dist --project-name myfirstsite --commit-dirty=true', opts);
    console.log('\nDeployment complete!\n');
} catch (e) {
    console.error('\nDeployment failed!\n');
    process.exit(1);
}
