
const isEmailValid = (email) => {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
  };
  
  const isStrongPassword = (password) => {
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$/;
    return regex.test(password);
  };
  
  const isValidCurrencyCode = (code) => {
    const validCodes = ['INR', 'USD', 'EUR', 'GBP', 'JPY'];
    return validCodes.includes(code.toUpperCase());
  };
  
  module.exports = {
    isEmailValid,
    isStrongPassword,
    isValidCurrencyCode,
  };
  