var API_URL = 'http://127.0.0.1:8000/';

var post = async function(endpoint, body) {
  return await fetch(API_URL + endpoint,
    {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + this.access_token,
      },
    })
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      } else {
        return response;
      }
    });
};

var get = async function(endpoint) {
  return await fetch(API_URL + endpoint,
    {
      method: 'GET',
      headers: {
        'Authorization': 'Token ' + this.access_token,
      },
    })
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      } else {
        return response;
      }
    });
}

exports.post = post;
exports.get = get;
