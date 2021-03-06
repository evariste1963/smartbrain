const Helper = async (route, method, email, password, name, id) => {
  try {
    const response = await fetch(
      `https://gentle-coast-06023.herokuapp.com/${route}`,
      {
        method: method,
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
          name: name,
          id: id,
        }),
      }
    );

    return await response.json();
  } catch (err) {
    throw new Error("zoot alors", err);
  }
};

export default Helper;
