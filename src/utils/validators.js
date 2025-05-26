export const validateEmail = (email) => {
  if (!email) return "E-mail é obrigatório.";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) ? "" : "E-mail inválido.";
};

export const validateName = (name) => {
  if (!name) return "Nome é obrigatório.";
  return name.length > 0 ? "" : "Nome é obrigatório.";
};

export const validatePassword = (password) => {
  if (!password) return "Senha é obrigatória.";
  return password.length >= 6
    ? ""
    : "A senha deve ter pelo menos 6 caracteres.";
};

export const validatePhone = (phone) => {
  if (!phone) return "Telefone é obrigatório.";
  // Verifica o formato: (99) 99999-9999 ou (99) 9999-9999
  const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
  return phoneRegex.test(phone) ? "" : "Telefone inválido.";
};

export const validateForm = ({ email, name, phone, password }) => {
  return {
    email: validateEmail(email),
    name: validateName(name),
    password: validatePassword(password),
    phone: validatePhone(phone),
  };
};
