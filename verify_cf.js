import https from 'https';

const options = {
    hostname: 'api.cloudflare.com',
    path: '/client/v4/accounts/25320828b3f2e2004ac4877cdecac442/pages/projects',
    method: 'GET',
    headers: {
        'Authorization': 'Bearer NkmQgdQFxUU0o_fCvGYQ4ZmoLy8DrlCxBOKLELjP',
        'Content-Type': 'application/json'
    }
};

const req = https.request(options, (res) => {
    console.log('Status: ' + res.statusCode);
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        try {
            console.log(JSON.stringify(JSON.parse(data), null, 2));
        } catch (e) {
            console.log(data);
        }
    });
});

req.on('error', (e) => {
    console.error(e);
});

req.end();
