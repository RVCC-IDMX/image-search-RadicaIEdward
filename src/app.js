const form = document.querySelector('.search-form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  const response = await fetch('/.netlify/functions/unsplash-search', {
    method: 'POST',
    body: JSON.stringify({
      query: formData.get('query'),
    }),
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));

  // console.log(response);

  const dataObj = response.results;
  const container = document.querySelector('.container');
  const template = document.querySelector('#template');

  function clearContainerResults(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }

  function appendResults(results) {
    results.forEach((result) => {
      const clone = template.content.cloneNode(true);
      const postImg = clone.querySelector('.post__img');
      const postUser = clone.querySelector('.post__user');
      const postDescription = clone.querySelector('.post__desc');
      const postDescText = result.description;

      postImg.src = result.urls.small;
      postUser.textContent = `by ${result.user.name.toString()} `;

      if (postDescText !== null) {
        if (postDescText.length <= 100) {
          postDescription.textContent = postDescText;
        } else {
          postDescription.textContent = `${postDescText.substr(0, 99)}...`;
        }
      }
      container.append(clone);
    });
  }

  if (container.hasChildNodes) {
    clearContainerResults(container);
  }

  appendResults(dataObj);
});
