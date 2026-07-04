const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const envFile = fs.readFileSync('c:\\Users\\Niko\\Desktop\\myfirstsite\\.env', 'utf8');
const envVars = {};
envFile.split('\n').forEach(line => {
    if (line.includes('=')) {
        const [key, val] = line.split('=');
        envVars[key.trim()] = val.trim();
    }
});

const supabaseUrl = envVars.VITE_SUPABASE_URL;
const supabaseKey = envVars.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testInsert() {
    console.log("Testing dynamic_content table...");
    
    const { data: selectData, error: selectError } = await supabase
        .from('dynamic_content')
        .select('*')
        .limit(1);
        
    if (selectError) {
        console.error("SELECT Error:", selectError);
    } else {
        console.log("SELECT Success:", selectData);
    }
}

testInsert();
