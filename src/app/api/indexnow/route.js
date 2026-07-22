export async function POST(request) {
  try {
    const { urls } = await request.json();
    
    const key = '8ffba24f94e3d534a86cedea67322e25';
    const host = 'sarkarisuccess.com';

    const body = {
      host,
      key,
      keyLocation: `https://${host}/${key}.txt`,
      urlList: urls,
    };

    const [bingResponse, indexnowResponse] = await Promise.all([
      fetch('https://www.bing.com/indexnow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }),
      fetch('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }),
    ]);

    console.log('IndexNow Bing:', bingResponse.status);
    console.log('IndexNow API:', indexnowResponse.status);

    return Response.json({
      success: true,
      bing: bingResponse.status,
      indexnow: indexnowResponse.status,
    });

  } catch (error) {
    console.error('IndexNow error:', error);
    return Response.json({ error: 'IndexNow failed' }, { status: 500 });
  }
}