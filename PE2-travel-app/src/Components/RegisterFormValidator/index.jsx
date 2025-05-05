import * as Yup from "yup";

/**
 * Validator for the RegisterForm component.
 * It uses Yup to define the validation schema for the form fields.
 * 
 * @constant
 * @type {Yup.ObjectSchema}
 * @default
 * 
 * @property {Yup.StringSchema} name - Name field validation.
 * @property {Yup.StringSchema} email - Email field validation.
 * @property {Yup.StringSchema} password - Password field validation.
 * @property {Yup.StringSchema} bio - Bio field validation.
 * @property {Yup.ArraySchema} images - Images field validation.
 * @property {Yup.ObjectSchema} images[].url - URL field validation for each image.
 * @property {Yup.StringSchema} images[].alt - Alt text field validation for each image.
 * 
 * @returns {Yup.ObjectSchema} The validation schema for the RegisterForm.
 */


const RegisterFormValidator = Yup.object().shape({
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
    
 

export default RegisterFormValidator;
