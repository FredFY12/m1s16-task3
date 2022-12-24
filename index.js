const userUrl = ('https://jsonplaceholder.typicode.com/users');
const dataContainer = document.querySelector('#data-container');
const arrId = [5, 6, 2, 1];




function usersNameHTML (users) {
  const liHtml = document.createElement('li');
  const aHtml = document.createElement('a');
    aHtml.href = '#';
    aHtml.textContent = users;
    liHtml.append(aHtml);
    return liHtml
}

function tooggleLoader(){
  const loaderHtml = document.querySelector('#loader');
  const isHidden = loaderHtml.hasAttribute('hidden')
  if(isHidden){
    loaderHtml.removeAttribute('hidden');
  }else{
    loaderHtml.setAttribute('hidden','');
  }
}


function getUsersByIds(ids) {
  const requests = ids.map((id) => fetch(`${userUrl}/${id}`));
  Promise.all(requests)
    .then(responses => {
      tooggleLoader();
      const results = responses.map(response => response.json());
      return Promise.all(results);
    })
    .then((data) => {
      data.forEach(name => {
        const nameHtml = usersNameHTML(name.name);
        dataContainer.append(nameHtml);
      });
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      tooggleLoader();
    })
   
}

getUsersByIds(arrId);


