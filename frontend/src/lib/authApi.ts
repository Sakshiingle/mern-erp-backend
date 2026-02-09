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

  const { token, user } = response.data;

  // store token
  localStorage.setItem("token", token);

  return user;
};

export const loginUser = async (email: string, password: string) => {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  const { token, user } = response.data;

  // store token
  localStorage.setItem("token", token);

  return user;
};
