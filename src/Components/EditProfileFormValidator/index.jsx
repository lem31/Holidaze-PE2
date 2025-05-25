/**
 * Yup validation schema for editing a user profile.
 *
 * Validates the following fields:
 * - bio: Optional string, maximum 160 characters.
 * - banner: Object containing:
 *    - url: Optional string, must be a valid URL.
 *    - alt: Optional string, maximum 120 characters.
 * - avatar: Object containing:
 *    - url: Optional string, must be a valid URL.
 *    - alt: Optional string, maximum 120 characters.
 *
 * @type {Yup.ObjectSchema}
 */

import * as Yup from "yup";

const EditProfileFormValidator = Yup.object().shape({
  bio: Yup.string().max(160, "Bio must be at most 160 characters long"),
  banner: Yup.object().shape({
    url: Yup.string().url("URL must be a valid and accessible URL"),
    alt: Yup.string().max(120, "Alt text must be at most 120 characters long"),

    avatar: Yup.object().shape({
      url: Yup.string().url("URL must be a valid and accessible URL"),
      alt: Yup.string().max(
        120,
        "Alt text must be at most 120 characters long"
      ),
    }),
  }),
});

export default EditProfileFormValidator;
