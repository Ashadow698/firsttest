const searchInput = document.getElementById('searchInput');
const resultsList = document.getElementById('resultsList');

// Your YouTube API Key (replace if needed)
const API_KEY = 'AIzaSyAoGKTh4sOyNXFU5dcf0a5TKtvs99aOOA8';
const MAX_RESULTS = 5;

searchInput.addEventListener('input', async function () {
  const query = searchInput.value.toLowerCase().trim();

  // Require minimum 3 characters before searching
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

    // Check for API errors
    if (!response.ok) {
      console.error('API Error:', data);
      resultsList.innerHTML = `<li><strong>Error:</strong> ${data.error.message}</li>`;
      return;
    }

    // Display results if found
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
    console.error('Fetch error:', error);
    resultsList.innerHTML = `<li>Unexpected error occurred. Please try again later.</li>`;
  }
});
