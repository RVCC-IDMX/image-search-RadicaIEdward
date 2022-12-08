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

  console.log(response);

  const dataObj = response.results;
  const container = document.querySelector('.container');
  const template = document.querySelector('#template');

  // const postImg = clone.querySelector('.post__img');
  // postImg.src = dataObj.urls.small;
  // postImg.alt = dataObj.alt_description;

  /*
    Loop through the results[] array. For each result, create a clone of the
    template and append it to the DOM element with the .container class.
  */
  function appendResults(results) {
    results.forEach((result) => {
      const clone = template.content.cloneNode(true);
      const postImg = clone.querySelector('.post__img');
      const postUser = clone.querySelector('.post__user');

      postImg.src = result.urls.small;
      postUser.textContent = `by ${result.user.name.toString()}`;

      container.append(clone);
    });
  }

  appendResults(dataObj);
  /*
    Add an attribution statement below the image using the
    postUser element and the photographer's name from dataObj
   */

  /*
    Check the description of the post. If it's not null and less than 100 characters,
    add the description from dataObj to the post. If it's more than 100 characters,
    add the first 100 characters of the description from dataObj to the post followed by
    an ellipsis (...)
  */
});
