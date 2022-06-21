const Helper = (route, method, email, password, name, id) => {
  return fetch(`http://localhost:3000/${route}`, {
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
