const Helper = (path, email, password, name) => {
  return fetch(`http://localhost:3000/${path}`, {
    method: "post",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    }),
  }).then((response) => response.json());
};

export default Helper;
