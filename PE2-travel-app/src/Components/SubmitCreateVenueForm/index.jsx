// import useMyStore from "../../Store";
// import React, {useState, useEffect} from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import CreateVenueFormValidator from "../CreateVenueFormValidator";


// async function useCreateVenueForm(setSuccessMessage) {
//   const { fetchVMVenues, createNewVenue } = useMyStore();

//   const [metaValues, setMetaValues] = useState({
//     wifi: false,
//     parking: false,
//     breakfast: false,
//     pets: false,
//   });

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     watch,
//     setError,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(CreateVenueFormValidator),
//     mode: "onSubmit",
//     defaultValues: {
//       media: [],
//     },
//   });

//   useEffect(() => {
//     console.log("Store state updated:", useMyStore.getState());
//   }, []);

//   const onSubmit = async (formValues) => {
//     console.log("🚀 Form submission triggered!", formValues);
//     const venueData = {
//       ...formValues,
//       price: Number(formValues.price),
//       maxGuests: Number(formValues.maxGuests),
//       rating: Number(formValues.rating),
//       location: {
//         ...formValues.location,
//         lat: Number(formValues.location.lat),
//         lng: Number(formValues.location.lng),
//         zip: String(formValues.location.zip).trim(),
//       },
//     };

//     try {
//       console.log("📝 venueData before submission:", venueData);
//       const response = await createNewVenue(venueData);
//       console.log("✅ API response:", response);
//       fetchVMVenues();
//       setTimeout(() => {
//         if (setSuccessMessage) {
//           setSuccessMessage("Venue created successfully!");
//         }
//       }, 500);
//     } catch (error) {
//       console.error("❌ Error creating venue:", error);
//       setError("api", { message: "Failed to create venue" });
//     }
//   };

//   useEffect(() => {
//     const meta = watch("meta") || {};
//     setMetaValues({
//       wifi: meta.wifi || false,
//       parking: meta.parking || false,
//       breakfast: meta.breakfast || false,
//       pets: meta.pets || false,
//     });
//   }, [watch("meta")]);

//   const onAddImage = () => {
//     const currentMedia = watch("media") || [];
//     const updatedMedia = [...currentMedia, { url: "", alt: "" }];
//     setValue("media", updatedMedia);
//   };

//   const removeImage = (index) => {
//     const updatedMedia = [...watch("media")];
//     updatedMedia.splice(index, 1);
//     setValue("media", updatedMedia);
//   };

//   return {
//     register,
//     handleSubmit,
//     onSubmit,
//     setValue,
//     watch,
//     errors,
//     metaValues,
//     onAddImage,
//     removeImage,
//   }; 
// }

// export default useCreateVenueForm;
