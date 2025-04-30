import * as Yup from "yup";



const CreateVenueFormValidator = Yup.object().shape({
    name: Yup.string()
        .required("Name is required"),
    description: Yup.string()
        .required("Description is required"),
    price: Yup.number()
        .required("Price is required"),
    maxGuests: Yup.number()
        .required("Max guests is required"),
    media: Yup.array().of(
        Yup.object().shape({
            url: Yup.string()
                .url("URL must be a valid and accessible URL"),
            alt: Yup.string()
        })
    ),
    rating: Yup.number()
        .default(0),
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
