const Helper = (path, method, email, password, name, id) => {
  return fetch(`http://localhost:3000/${path}`, {
    method: method,
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
      id: id,
    }),
  }).then(response => response.json());
};

export default Helper;
