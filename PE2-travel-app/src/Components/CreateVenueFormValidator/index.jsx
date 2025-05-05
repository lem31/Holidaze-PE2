import * as Yup from "yup";



const CreateVenueFormValidator = Yup.object().shape({
    name: Yup.string().required("Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be at most 50 characters"),
    description: Yup.string()
        .required("Description is required"),
    price: Yup.number()
        .required("Price is required")
        .positive('Price must be a positive number')
    .integer('Price must be a whole number'),
    maxGuests: Yup.number()
        .required("Max guests is required")
        .integer('Max guests must be a whole number')
        .min(1, 'At least 1 max guest is required'),
        rating: Yup.number(),
        
    media: Yup.array().of(
        Yup.object().shape({
            url: Yup.string()
                .url("URL must be a valid and accessible URL"),
            alt: Yup.string()
        })
    ),
 
    meta: Yup.object().shape({
        wifi: Yup.boolean()
            .default(false),
        parking: Yup.boolean()
            .default(false),
        breakfast: Yup.boolean()
            .default(false),
        pets: Yup.boolean()
            .default(false),
    }),
    location: Yup.object().shape({
        address: Yup.string()
            .nullable(),
        city: Yup.string()
            .nullable(),
        zip: Yup.string()
            .nullable(),
        country: Yup.string()
            .nullable(),
        continent: Yup.string()
            .nullable(),
        lat: Yup.number()
            .default(0),
        lng: Yup.number()
            .default(0),
    }),
});
 

export default CreateVenueFormValidator;
