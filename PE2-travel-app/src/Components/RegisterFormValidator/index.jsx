const RegisterFormValidator = ({ formValues }) => {
  const validateInput = () => {
    const errors = {};

    const validateField = (field, value) => {
      switch (field) {
        case "name":
          if (/[^a-zA-Z0-9_]/.test(value)) {
            errors.name = "Name must not contain punctuation symbols apart from underscore (_).";
          }
          break;

        case "email":
          if (!/^.+@stud\.noroff\.no$/.test(value)) {
            errors.email = "Email must be a valid stud.noroff.no address.";
          }
          break;

        case "password":
          if (value.length < 8) {
            errors.password = "Password must be at least 8 characters.";
          }
          break;

        case "bio":
          if (value && value.length > 160) {
            errors.bio = "Bio must be less than 160 characters.";
          }
          break;

        case "avatar.url":
          if (value && !isValidURL(value)) {
            errors.avatarUrl = "Avatar URL must be valid and accessible.";
          }
          break;

        case "avatar.alt":
          if (value && value.length > 120) {
            errors.avatarAlt = "Avatar alt text must be less than 120 characters.";
          }
          if (value && !formValues.avatar?.url) {
            errors.avatarAlt = "Avatar alt text requires avatar URL to be set.";
          }
          break;

        case "banner.url":
          if (value && !isValidURL(value)) {
            errors.bannerUrl = "Banner URL must be valid and accessible.";
          }
          break;

        case "banner.alt":
          if (value && value.length > 120) {
            errors.bannerAlt = "Banner alt text must be less than 120 characters.";
          }
          if (value && !formValues.banner?.url) {
            errors.bannerAlt = "Banner alt text requires banner URL to be set.";
          }
          break;

        default:
          break;
      }
    };

    for (const field in formValues) {
      if (typeof formValues[field] === "object" && formValues[field] !== null) {
        for (const nestedField in formValues[field]) {
          validateField(`${field}.${nestedField}`, formValues[field][nestedField]);
        }
      } else {
        validateField(field, formValues[field]);
      }
    }

    return errors;
  };

  const isValidURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return validateInput;
};

export default RegisterFormValidator;
