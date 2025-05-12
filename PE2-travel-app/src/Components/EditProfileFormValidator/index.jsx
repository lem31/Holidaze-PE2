import * as Yup from "yup";




const EditProfileFormValidator = Yup.object().shape({

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
