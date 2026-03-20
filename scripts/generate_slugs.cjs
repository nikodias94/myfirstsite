const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://tgvsvqhioltwbujnvkwa.supabase.co';
const supabaseKey = 'sbp_bdc3382c373827a1712968ebe2e724c8fcfb7a09';
const supabase = createClient(supabaseUrl, supabaseKey);

const transliterate = (text) => {
    const map = {
        'ა': 'a', 'ბ': 'b', 'გ': 'g', 'დ': 'd', 'ე': 'e', 'ვ': 'v', 'ზ': 'z', 'თ': 't', 'ი': 'i', 'კ': 'k', 'ლ': 'l', 'მ': 'm', 'ნ': 'n', 'ო': 'o', 'პ': 'p', 'ჟ': 'zh', 'რ': 'r', 'ს': 's', 'ტ': 't', 'უ': 'u', 'ფ': 'p', 'ქ': 'k', 'ღ': 'gh', 'ყ': 'q', 'შ': 'sh', 'ჩ': 'ch', 'ც': 'ts', 'ძ': 'dz', 'წ': 'ts', 'ჭ': 'ch', 'ხ': 'kh', 'ჯ': 'j', 'ჰ': 'h'
    };
    return text.split('').map(char => map[char] || char).join('');
};

const createSlug = (title) => {
    if (!title) return '';
    return transliterate(title.toLowerCase())
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
};

const updateSlugs = async () => {
    const tables = ['poems', 'poems_en', 'translations', 'reviews', 'prose'];
    
    for (const table of tables) {
        console.log(`Updating slugs for ${table}...`);
        const { data, error } = await supabase.from(table).select('id, title');
        
        if (error) {
            console.error(`Error fetching ${table}:`, error);
            continue;
        }

        for (const item of data) {
            const slug = createSlug(item.title) + '-' + item.id.split('-')[0]; // add short ID to ensure uniqueness
            const { error: updateError } = await supabase.from(table).update({ slug }).eq('id', item.id);
            if (updateError) console.error(`Error updating slug for ${item.id}:`, updateError);
            else console.log(`Set slug for "${item.title}" -> ${slug}`);
        }
    }
    console.log('All slugs updated!');
};

updateSlugs();
