import * as Yup from "yup";



const CreateVenueFormValidator = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required").min(10, "Description must be at least 10 characters long"),
  images: Yup.array()
    .of(
      Yup.object().shape({
        url: Yup.string().url("Invalid URL").required("Image URL is required"),
        alt: Yup.string().optional(),
      })
    )
    .min(1, "At least one image is required"),
  price: Yup.number().min(1, "Price must be greater than 0").required("Price is required"),
  maxGuests: Yup.number().min(1, "Max guests must be at least 1").required("Max guests is required"),
  rating: Yup.number().min(0).max(5, "Rating must be between 0 and 5").optional(),
  meta: Yup.object().shape({
    wifi: Yup.boolean().default(false),
    parking: Yup.boolean().default(false),
    breakfast: Yup.boolean().default(false),
    pets: Yup.boolean().default(false),
  }),
  location: Yup.object().shape({
    address: Yup.string(),
    city: Yup.string(),
    zip: Yup.number(),
    country: Yup.string(),
    continent: Yup.string(),
    lat: Yup.number(),
    lng: Yup.number(),
  }),


});

export default CreateVenueFormValidator;
