const searchInput = document.getElementById('searchInput');
const resultsList = document.getElementById('resultsList');

const API_KEY = 'AIzaSyAoGKTH4s0yNXFU5dcf0a5TKtvs99a0OA8';
const MAX_RESULTS = 5;

searchInput.addEventListener('input', async function () {
  const query = searchInput.value.toLowerCase().trim();

  if (query.length === 0) {
    resultsList.innerHTML = '<li>Start typing a topic to find top YouTubers...</li>';
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
          <em>${item.snippet.description}</em>
        `;
        resultsList.appendChild(li);
      });
    } else {
      resultsList.innerHTML = `<li>No results found for "${query}".</li>`;
    }
  } catch (error) {
    resultsList.innerHTML = `<li>Error fetching data. Please try again.</li>`;
    console.error('YouTube API Error:', error);
  }
});
