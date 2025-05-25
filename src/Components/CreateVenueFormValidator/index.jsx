/**
 * Yup validation schema for the Create Venue form.
 *
 * Validates the following fields:
 * - name: Required string.
 * - description: Required string, minimum 10 characters.
 * - media: Array of objects with required image URL and optional alt text.
 * - price: Required number, must be greater than 0.
 * - maxGuests: Required number, at least 1.
 * - rating: Optional number, between 0 and 5.
 * - meta: Object with boolean flags for wifi, parking, breakfast, and pets.
 * - location: Object with optional address, city, zip, country, continent, latitude, and longitude.
 *
 * @type {Yup.ObjectSchema}
 */

import * as Yup from "yup";

const CreateVenueFormValidator = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters long"),
  media: Yup.array().of(
    Yup.object().shape({
      url: Yup.string().url("Invalid URL").required("Image URL is required"),
      alt: Yup.string().optional(),
    })
  ),
  price: Yup.number()
    .min(1, "Price must be greater than 0")
    .required("Price is required"),
  maxGuests: Yup.number()
    .min(1, "Max guests must be at least 1")
    .required("Max guests is required"),
  rating: Yup.number()
    .min(0)
    .max(5, "Rating must be between 0 and 5")
    .optional(),
  meta: Yup.object().shape({
    wifi: Yup.boolean().default(false),
    parking: Yup.boolean().default(false),
    breakfast: Yup.boolean().default(false),
    pets: Yup.boolean().default(false),
  }),
  location: Yup.object()
    .shape({
      address: Yup.string().optional(),
      city: Yup.string().optional(),
      zip: Yup.number().optional(),
      country: Yup.string().optional(),
      continent: Yup.string().optional(),
      lat: Yup.number().optional(),
      lng: Yup.number().optional(),
    })
    .default(undefined),
});

export default CreateVenueFormValidator;
