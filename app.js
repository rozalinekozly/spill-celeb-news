const feed = document.getElementById('feed');
const searchBtn = document.getElementById('search-btn');
const celebInput = document.getElementById('celebrity-input');

async function fetchArticles(celebrity = '') {
    try {
        const response = await fetch(`/api/news${celebrity ? '?q=' + encodeURIComponent(celebrity) : ''}`);
        const data = await response.json();
        displayArticles(data.articles);
    } catch (error) {
        console.error('Error fetching articles:', error);
        feed.innerHTML = '<p>Failed to load articles. Please try again later.</p>';
    }
}

searchBtn.addEventListener('click', () => {
    const celebrity = celebInput.value.trim();
    fetchArticles(celebrity);
});

document.addEventListener('DOMContentLoaded', () => fetchArticles());


function displayArticles(articles) {
    feed.innerHTML = '';
    articles.forEach(article => {  
        const card = document.createElement('div');
        card.className = 'article-card';

        const image = document.createElement('img');
        image.src = article.urlToImage || 'icons/icon-192.png';
        image.alt = article.title;

        const content = document.createElement('div');
        content.className = 'article-content';

        const title = document.createElement('h2');
        title.textContent = article.title;

        const description = document.createElement('p');
        description.textContent = article.description || 'No description available.';

        const link = document.createElement('a');
        link.href = article.url;
        link.target = '_blank';
        link.textContent = 'Read More';

        content.appendChild(title);
        content.appendChild(description);
        content.appendChild(link);

        card.appendChild(image);
        card.appendChild(content);

        feed.appendChild(card);
    });
}


document.addEventListener('DOMContentLoaded', fetchArticles);
