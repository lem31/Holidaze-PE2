import { useState } from "react";
import { Box} from "@mui/material";
import Alert from "@mui/material/Alert";
import RegisterForm from "../RegisterForm";
import onRegister from "../../API/OnRegister/index.js";
import RegisterFormValidator from '../RegisterFormValidator';
import { useNavigate } from "react-router-dom";


/**
 * RegisterBox component handles user registration functionality.
 * It includes a form for entering user details such as name, email, password, bio, and images.
 * It also allows the user to select between registering as a Venue Manager or a Customer.
 * The component uses the onRegister function to send a registration request to the API.
 * It also handles validation of the form inputs using the RegisterFormValidator.
 * @param {Object} props - The component props.
 * @returns {JSX.Element} The rendered component.
 * @component
 * @example
 * return (
 * <RegisterBox />
 */

const RegisterBox = () => {
  const defaultBanner = {
    url: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    alt: "Default Banner",
  }
  const defaultAvatar = {
    url: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    alt: "Default Avatar",
  }
 const API_URL = "https://v2.api.noroff.dev/auth/register";
 const [validationErrors, setValidationErrors] = useState({});
  const [activeTab, setActiveTab] = useState(0);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
    banner: defaultBanner,
    avatar: defaultAvatar,
    venueManager: true,
  });
  const [errorMessage, setErrorMessage] = useState("");


  const navigate = useNavigate();

  const handleTabChange = ( event, newValue) => {
    setActiveTab(newValue);

    setFormValues((prevValues) => ({
   
      ...prevValues,
      venueManager: newValue === 0,
    }));

   

  };


 

  const handleInputChange = (name, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleImageChange = (index, name, value) => {
    const updatedImage = { ...formValues[name], [index]: value };
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: updatedImage,
    }));
  };

  const handleAddImageInput = () => {
    setFormValues((prevValues) => ({
      ...prevValues,
      images: [...prevValues.images, { url: "", alt: "" }],
    }));
  };

  const handleFormSubmit = async (event) => {
    if(!event) return;
    event.preventDefault();

    const updatedFormValues = {
      ...formValues,
      banner: {
        url: formValues.banner.url || defaultBanner.url,
        alt: formValues.banner.alt || defaultBanner.alt,
      },
      avatar: {
        url: formValues.avatar.url || defaultAvatar.url,
        alt: formValues.avatar.alt || defaultAvatar.alt,
      },
    };
    try{
 await RegisterFormValidator.validate(updatedFormValues, {abortEarly: false});
  setValidationErrors({});
try{
     const response=  await onRegister(API_URL, formValues);
 

      navigate("/Login", {state: {successMessage: 'Registration successful! Please log in.'},});
} catch(error){
  setErrorMessage(error.message);}
   
    }  catch (validationError) {
      const errors = {};
      if (validationError.inner) {
        validationError.inner.forEach((err) => {
          errors[err.path] = err.message;
        });
      }
      setValidationErrors(errors);
      setErrorMessage( "Validation failed. Please check your inputs." );
    }
  };

  return (

    <div>
   {errorMessage && <Alert severity="error">{errorMessage}</Alert>}


      <Box sx={{ marginTop: 3 }}>
      
        <RegisterForm
          formValues={formValues}
          onInputChange={handleInputChange}
          onImageChange={handleImageChange}
          onAddImage={handleAddImageInput}
          onSubmit={handleFormSubmit}
          validationErrors={validationErrors}
          defaultBanner={defaultBanner}
          defaultAvatar={defaultAvatar}
          activeTab={activeTab}
          handleTabChange={handleTabChange}
          
        />
      </Box>
    </div>
  );
};

export default RegisterBox;
