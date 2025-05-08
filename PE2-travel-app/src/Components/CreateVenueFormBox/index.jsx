// import React, { useEffect, useState} from "react";
// import { Box, Typography } from "@mui/material";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import CreateVenueForm from '../CreateVenueForm';
// import CreateVenueFormValidator from "../CreateVenueFormValidator";
// import useMyStore from "../../Store/index";

// const CreateVenueFormBox = ({
//   toggleForm

// }) => {
 

//     const {createNewVenue}  = useMyStore();
//     console.log("🛠 Zustand createVenue function:", createNewVenue);
  
  
 
  
//     const {
//       register,
//       handleSubmit,
//       setValue,
//       watch,
//       reset,
//       setError,
//       formState: { errors },
//     } = useForm({
//       resolver: yupResolver(CreateVenueFormValidator),
//       mode: 'onSubmit',
//       defaultValues: {
//         name: "",
//         description: "",
//         media: [],
//         price: "",
//         maxGuests: "",
//         rating: 0,
//         meta: { wifi: false, parking: false, breakfast: false, pets: false },
//         location: {
//           address: "",
//           city: "",
//           country: "",
//           continent: "",
//           zip: "",
//           lat: 0,
//           lng: 0,
        
//         }
//       },
//     });


//     useEffect(() => {
//         console.log("Store state updated:", useMyStore.getState());
//       }, []);
      

  
  
  
//     const onAddImage = () => {
//       setValue("media", [...watch("media"), { url: "", alt: "" }]);
//     };
  
//     const removeImage = (index) => {
//       const updatedMedia = [...watch("media")];
//       updatedMedia.splice(index, 1);
//       setValue("media", updatedMedia);
//     };
  
  
  
  
//     const onFormSubmission = async (formValues) => {
    
//      const venueData = {
//         ...formValues,
//         price: Number(formValues.price), 
//         maxGuests: Number(formValues.maxGuests),
//         rating: Number(formValues.rating),
//         lat: Number(formValues.location.lat),
//         lng: Number(formValues.location.lng),
//      }
//      try{
//         console.log("📝 venueData before submission:", venueData);
   


//       const response = await createNewVenue(venueData);
//       console.log("API response:", response);
    
//       setTimeout(() => {
//         toggleForm();
//       }, 500);
    
//      }catch (error) {
//       console.error("Error creating venue:", error);
//       setError("api", { message: "Failed to create venue" });
//      }
//     };
    
  
  
//     const  [metaValues, setMetaValues]= useState({ wifi: false, parking: false, breakfast: false, pets: false });
   
//     useEffect(() => {
//         setMetaValues(watch("meta"));
//       }, [watch("meta")]);
      
  

//   return (
//     <Box>
//       <Box sx={{ marginTop: 3 }}>
//         <Typography variant="h6" sx={{ marginBottom: 2 }}>
//           Create Venue
//         </Typography>
//         <CreateVenueForm
//           register={register}
//           errors={errors}
//           handleSubmit={handleSubmit}
//           onFormSubmission={onFormSubmission}
//           setValue={setValue}
//           watch={watch}
//           onAddImage={onAddImage}
//           removeImage={removeImage}
//             metaValues={metaValues}
           

//         />
//       </Box>
//     </Box>
//   );}

//   export default CreateVenueFormBox;
  