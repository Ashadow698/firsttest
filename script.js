const searchInput = document.getElementById('searchInput');
const resultsList = document.getElementById('resultsList');

const API_KEY = 'AIzaSyAoGKTH4s0yNXFU5dcf0a5TKtvs99a0OA8'; // Your actual API key
const MAX_RESULTS = 5;

searchInput.addEventListener('input', async function () {
  const query = searchInput.value.toLowerCase().trim();

  if (query.length < 3) {
    resultsList.innerHTML = '<li>Type at least 3 characters to search...</li>';
    return;
  }

  resultsList.innerHTML = '<li>Loading...</li>';

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${encodeURIComponent(query)}&maxResults=${MAX_RESULTS}&key=${API_KEY}`
    );

    const data = await response.json();

    if (data.items && data.items.length > 0) {
      resultsList.innerHTML = '';
      data.items.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
          <strong>${item.snippet.channelTitle}</strong><br/>
          <em>${item.snippet.description}</em><br/>
          <a href="https://www.youtube.com/channel/${item.snippet.channelId}" target="_blank">View Channel</a>
        `;
        resultsList.appendChild(li);
      });
    } else {
      resultsList.innerHTML = `<li>No results found for "${query}".</li>`;
    }
  } catch (error) {
    resultsList.innerHTML = `<li>Error fetching data. Please try again later.</li>`;
    console.error('YouTube API Error:', error);
  }
});
