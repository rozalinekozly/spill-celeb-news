export default async function handler(req, res) {
    const apiKey = process.env.NEWS_API_KEY;
    const { q } = req.query;
    let url = `https://newsapi.org/v2/top-headlines?category=entertainment&language=en&pageSize=12&apiKey=${apiKey}`;

    if (q) {
        url += `&q=${encodeURIComponent(q)}`;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({ error: 'Error fetching news' });
    }
}
