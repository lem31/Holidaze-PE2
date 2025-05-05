import * as Yup from "yup";




const EditProfileFormValidator = Yup.object().shape({
    name: Yup.string().matches(/^[a-zA-Z0-9_]*$/, "Name must not contain punctuation symbols apart from underscore (_).").required("Name is required"),
    email: Yup.string()
    .matches(/^.+@stud\.noroff\.no$/, "Email must be a valid Noroff email address.")
    .required("Email is required"),
    password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
    bio: Yup.string()
    .max(160, "Bio must be at most 160 characters long"),
    banner: Yup.object().shape({
            url: Yup.string()
            .url("URL must be a valid and accessible URL"),
            alt: Yup.string()
            .max(120, "Alt text must be at most 120 characters long"),

    avatar: Yup.object().shape({
            url: Yup.string()
            .url("URL must be a valid and accessible URL"),
            alt: Yup.string()
            .max(120, "Alt text must be at most 120 characters long"),
    }),
        })})
    
 

export default EditProfileFormValidator;
