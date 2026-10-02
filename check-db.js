const SECRET = 'sarkari_success_cron_secret_2026';
const URL = `https://sarkarisuccess.com/api/generate-job-content?secret=${SECRET}`;

async function run() {
  for (let i = 1; i <= 40; i++) {
    console.log(`Run ${i}/40...`);
    try {
      const res = await fetch(URL);
      const data = await res.json();
      if (data.message === 'All jobs have SEO content') {
        console.log('All jobs done!');
        break;
      }
      console.log('Generated:', data.generated?.map(j => j.title).join(', '));
    } catch (e) {
      console.error('Error:', e.message);
    }
    await new Promise(r => setTimeout(r, 4000));
  }
  process.exit(0);
}

run();