var API_URL = 'http://127.0.0.1:8000/';

var post = async function(endpoint, body) {
  return await fetch(API_URL + endpoint,
    {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {'Content-Type': 'application/json'},
    })
    .then((response) => response.json());
};

var get = async function(endpoint) {
  return await fetch(API_URL + endpoint)
    .then((response) => response.json());
}

exports.post = post;
exports.get = get;
