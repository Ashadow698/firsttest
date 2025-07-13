const searchInput = document.getElementById('searchInput');
const resultsList = document.getElementById('resultsList');

searchInput.addEventListener('input', function () {
  const query = searchInput.value.toLowerCase().trim();

  if (query.length === 0) {
    resultsList.innerHTML = '<li>Start typing a topic to find top YouTubers...</li>';
    return;
  }

  // Simulated results
  const sampleData = {
    cooking: ['Binging with Babish', 'Joshua Weissman', 'Pro Home Cooks'],
    tech: ['MKBHD', 'Linus Tech Tips', 'Dave2D'],
    fitness: ['Athlean-X', 'Chloe Ting', 'Jeff Nippard'],
    gaming: ['Jacksepticeye', 'Markiplier', 'Dream']
  };

  const results = sampleData[query] || ['No results found for "' + query + '". Try a different topic.'];

  resultsList.innerHTML = '';
  results.forEach(youtuber => {
    const li = document.createElement('li');
    li.textContent = youtuber;
    resultsList.appendChild(li);
  });
});
