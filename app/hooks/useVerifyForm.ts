const useVerifyForm = () => {
  const verifyUserName = (username: string) => {
    if (username.length < 6 || username.length > 18) {
      return false;
    }
    return true;
  };

  const verifyPassword = (password: string) => {
    // 密码长度校验
    if (password.length < 6 || password.length > 18) {
      return false;
    }

    // 包含字母和数字校验
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);

    if (hasLetter && hasNumber) {
      return true;
    } else {
      return false;
    }
  };

  const verifyEmail = (email: string) => {
    // 邮箱正则表达式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // 使用正则表达式验证邮箱格式
    if (!emailRegex.test(email)) {
      return false;
    }

    // 长度检查
    if (email.length > 30) {
      return false;
    }

    return true;
  };

  return {
    verifyUserName,
    verifyPassword,
    verifyEmail,
  };
};

export default useVerifyForm;
