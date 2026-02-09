import api from "./api";

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const response = await api.post("/auth/register", {
    name,
    email,
    password,
  });

  // backend returns: { user: { ..., token } }
  const user = response.data.user;

  // store token correctly
  localStorage.setItem("token", user.token);

  return user;
};

export const loginUser = async (email: string, password: string) => {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  // backend returns: { user: { ..., token } }
  const user = response.data.user;

  // store token correctly
  localStorage.setItem("token", user.token);

  return user;
};
