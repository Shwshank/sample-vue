const baseUrl = 'https://api.phrase.com/v2';

export async function fetchTest(){
  await fetch(baseUrl)
    .then(response => response.json())
    .then(json => console.log(json))
}

export const getData = async (filters='')=>{
  let response = await fetch(baseUrl+filters,{
    method: 'GET',
    mode: 'cors',
  });
  return response.json();
}

export const loginUser = async (username, password)=>{

  let body = {"note":"Generated from app login","scopes":["read","write"],"expires_at":"2021-03-30T09:52:53Z"}

  let response = await fetch(baseUrl + '/authorizations', {
    method: 'POST',
    headers: new Headers({
      'Authorization': 'Basic '+ btoa(username + ":" + password),
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(body)
  })
  return response.json();
};

  export const getProjects = async (pageId)=>{

    let token = localStorage.getItem('token')

    let response = await fetch(baseUrl + '/projects?page='+pageId+'&per_page=4', {
      method: 'GET',
      headers: new Headers({
        'Authorization': 'Basic '+ btoa(token),
      }),
    })
    return response.json();
  };

  export const updateProject = async (id, name)=>{

    let token = localStorage.getItem('token')
    let body = {name: name}
    let response = await fetch(baseUrl + '/projects/'+ id, {
      method: 'PATCH',
      headers: new Headers({
        'Authorization': 'Basic '+ btoa(token),
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(body),
      data: JSON.stringify(body),
    })
    return response.json();
  };
