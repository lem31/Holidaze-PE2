import * as Yup from "yup";




const LoginFormValidator = Yup.object().shape({
    
    email: Yup.string()
    .matches(/^.+@stud\.noroff\.no$/, "Email must be a valid Noroff email address.")
    .required("Email is required"),
    password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
  

   
    })
        
    
 

export default LoginFormValidator;
