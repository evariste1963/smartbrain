const Helper = async (route, method, email, password, name, id) => {
  const response = await fetch(`http://localhost:3000/${route}`, {
    method: method,
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
      id: id,
    }),
  });
  return await response.json();
};

export default Helper;
