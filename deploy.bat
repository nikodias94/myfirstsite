@echo off
echo.
echo ========================================
echo  myfirstsite  ^|  Deploy to Cloudflare
echo ========================================
echo.

echo [1/4] Building project...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo BUILD FAILED! Aborting.
    pause
    exit /b 1
)

echo.
echo [2/4] Committing and pushing to GitHub (main)...
git add -A
git commit -m "deploy: update %date% %time%"
git push origin main

echo.
echo [3/4] Deploying to Cloudflare Pages...
set "CLOUDFLARE_API_TOKEN=NkmQgdQFxUU0o_fCvGYQ4ZmoLy8DrlCxBOKLELjP"
npx wrangler pages deploy dist --project-name myfirstsite --branch main

echo.
echo [4/4] Done! Check your site at https://zhana.ge
echo.
pause
