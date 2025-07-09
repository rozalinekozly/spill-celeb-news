const feed = document.getElementById('feed');

async function fetchArticles() {
    try {
        const response = await fetch('/api/news');
        const data = await response.json();
        displayArticles(data.articles);
    } catch (error) {
        console.error('Error fetching articles:', error);
        feed.innerHTML = '<p>Failed to load articles. Please try again later.</p>';
    }
}

function displayArticles(articles) {
    feed.innerHTML = '';
    articles.forEach(article => {   // <-- 🚩 this is your current loop
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
