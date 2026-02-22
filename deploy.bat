@echo off
set "CLOUDFLARE_API_TOKEN=NkmQgdQFxUU0o_fCvGYQ4ZmoLy8DrlCxBOKLELjP"
set "CLOUDFLARE_ACCOUNT_ID=25320828b3f2e2004ac4877cdecac442"
echo Deploying to Cloudflare Pages...
call npx -y wrangler pages deploy dist --project-name myfirstsite
