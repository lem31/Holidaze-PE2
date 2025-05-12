import { create } from "zustand";
import { persist } from "zustand/middleware";
import fetchStays from "../API/FetchStays";
import fetchUserProfile from "../API/FetchUserProfile/index.js";
import fetchVMVenues from "../API/FetchVMVenues";
import deleteVenue from "../API/DeleteVenue";
import updateProfile from "../API/UpdateProfile/index.js";
import createVenue from "../API/CreateVenue";
import editVenue from "../API/EditVenue";

const useMyStore = create(
  persist(
    (set, get) => ({
      stays: [],
      bookings: [],

      setStays: (newStays) => {
        set({ stays: newStays });
        localStorage.setItem("stays", JSON.stringify(newStays));
        console.log(
          "Stored stays:",
          JSON.parse(localStorage.getItem("stays"))
        );
      },
      


      setBookings: (newBookings) => {
        set({ bookings: newBookings });
        localStorage.setItem("bookings", JSON.stringify(newBookings));
        console.log(
          "Stored bookings:",
          JSON.parse(localStorage.getItem("bookings"))
        );
      },

      vmBookings: [],
      setVmBookings: (newVMBookings) => {
        set({ vmBookings: newVMBookings });

        localStorage.setItem("vmBookings", JSON.stringify(newVMBookings));
        console.log(
          "Stored vmBookings:",
          JSON.parse(localStorage.getItem("vmBookings"))
        );
      },
      selectedStay: null,
      token: null,
      userName: null,
      isLoggedIn: false,
      userProfile: null,
      loadingProfile: false,
      loginChecked: false,
      vmVenues: [],
      setVmVenues: (newVMVenues) => {
        set({ vmVenues: newVMVenues });
        localStorage.setItem("vmVenues", JSON.stringify(newVMVenues));
      },

      successMessage: "",
      venueData: null,

      setSuccessMessage: (message) => set({ successMessage: message }),

      login: (newToken, userName) => {
        if (newToken) {
          localStorage.setItem("token", newToken);
        }
        if (userName) {
          localStorage.setItem("userName", userName);
        }
        set({ token: newToken, userName, isLoggedIn: true });
        console.log("Login state persisted successfully.");
      },

      setUserProfile: (profileData) => {
        set({ userProfile: profileData });
        console.log("userProfile", profileData);
        console.log("User profile persisted successfully.");
      },

      logout: () => {
        set({
          token: null,
          userName: null,
          userProfile: null,
          isLoggedIn: false,
        });
        console.log("User logged out successfully.");
      },

      checkLoginStatus: () => {
        const token = get().token;
        const userName = get().userName;

        console.log("Restored token:", token);
        console.log("Restored username:", userName);

        if (token && userName) {
          set({ isLoggedIn: true, loginChecked: true });
          console.log("Login state restored successfully.");
        } else {
          set({ isLoggedIn: false, loginChecked: true });
          console.log("No login state found.");
        }
      },

      fetchUserProfile: async () => {
        try {
          const token = get().token;
          const userName = get().userName;

          if (!token || !userName) {
            console.error("Token or username not found in local storage.");
            return;
          }

          set({ loadingProfile: true });
          console.log("Fetching user profile...");

          const profileData = await fetchUserProfile(userName, token);
          if (profileData) {
            console.log("Profile data fetched:", profileData);
            set({ userProfile: profileData, loadingProfile: false });
            return profileData;
          } else {
            throw new Error("Failed to fetch profile data.");
          }
        } catch (error) {
          set({ userProfile: null, loadingProfile: false });
          console.error("Error fetching user profile:", error);
          throw error;
        }
      },

      updateUserProfile: async (userData) => {
        const userName = get().userName;
        const token = get().token;
        const endpoint = `https://v2.api.noroff.dev/holidaze/profiles/${userName}`;

        if (!token || !userName) {
          console.error("Token or username not found in local storage.");
          return;
        }
        try {
          set({ loadingProfile: true });

          const updatedProfile = await updateProfile(userData, endpoint, token);
          if (updatedProfile) {
            set({ userProfile: updatedProfile, loadingProfile: false });
            console.log("Profile updated successfully:", updatedProfile);
            return updatedProfile;
          } else {
            throw new Error("Failed to update profile");
          }
        } catch (error) {
          set({ loadingProfile: false });
          console.error("Error updating profile:", error);
          throw error;
        }
      },

      
       
        fetchStays: async () => {
          try {
            set({ loading: true, error: false });
        
            const fetchedStays = await fetchStays(); 
            console.log("Fetched stays from API:", fetchedStays); 
        
            if (!fetchedStays || !Array.isArray(fetchedStays)) {
              throw new Error("Invalid stays format");
            }
        
            set({ stays: fetchedStays, loading: false });
          } catch (error) {
            console.error("Error fetching stays:", error);
            set({ loading: false, error: true });
          }
        },
       
      

        fetchAndSetSelectedStay: async (stayId) => {
          const { stays, fetchStays } = get();
          let selectedStay = JSON.parse(localStorage.getItem("selectedStay"));
      
          console.log("🟢 Checking localStorage:", selectedStay);
      
          if (selectedStay?.id === stayId) {
              set({ selectedStay });
              console.log("✅ Retrieved stay from localStorage:", selectedStay);
              return;
          }
      
          if (stays.length > 0) {
              selectedStay = stays.find((stay) => stay.id === stayId);
              if (selectedStay) {
                  localStorage.setItem("selectedStay", JSON.stringify(selectedStay));
                  set({ selectedStay });
                  console.log("✅ Found stay in Zustand store:", selectedStay);
                  return;
              }
          }
      
          console.log(" Fetching stays from API...");
          await fetchStays(); 
      
          const updatedStays = get().stays;
          selectedStay = updatedStays.find((stay) => stay.id === stayId);
          console.log("🔍 API Fetched stays:", updatedStays);
          
          if (selectedStay) {
              localStorage.setItem("selectedStay", JSON.stringify(selectedStay));
              set({ selectedStay });
              console.log("✅ Successfully set selectedStay:", selectedStay);
          } else {
              console.error("Stay not found after fetching!");
              throw new Error("Stay not found");
          }
      } 
      ,      

      setSelectedStay: (stay) => {
        localStorage.setItem("selectedStay", JSON.stringify(stay));
        set({ selectedStay: stay });
      },

      setSelectedVenue: (venue) => {
        localStorage.setItem("selectedVenue", JSON.stringify(venue));
        set({ selectedVenue: venue });
        console.log("Selected venue:", venue);
      },

      fetchVMVenues: async () => {
        const token = get().token;
        const userName = get().userName;

        if (!token || !userName) {
          console.error("Missing token or username.");
          set({ vmVenues: [], loading: false, error: "Authentication error." });
          return;
        }

        try {
          set({ loading: true });
          const userVenues = await fetchVMVenues(userName, token);
          console.log("🔍 API Response for vmVenues:", userVenues);

          const venuesArray = Array.isArray(userVenues.data)
            ? userVenues.data
            : Array.isArray(userVenues)
              ? userVenues
              : [];

          if (venuesArray.length > 0) {
            set({ vmVenues: venuesArray, loading: false });
            localStorage.setItem("vmVenues", JSON.stringify(venuesArray));

            console.log("✅ Stored vmVenues Correctly:", venuesArray);
            return venuesArray;
          } else {
            throw new Error("Invalid API response: expected an array.");
          }
        } catch (error) {
          console.error("Error fetching venues:", error);
          set({
            vmVenues: [],
            loading: false,
            error: error.message || "Failed to fetch venues",
          });
        }
      },

      createNewVenue: async (venueData) => {
        const token = get().token;
        const userName = get().userName;
        const response = await createVenue(token, venueData);

        if (!response || !response.data) {
          throw new Error("Venue creation failed");
        }

        const currentVmVenues = Array.isArray(get().vmVenues)
          ? get().vmVenues
          : [];
        const updatedVmVenues = [...currentVmVenues, response.data];

        const currentStays = Array.isArray(get().stays) ? get().stays : [];
        const updatedStays = [...currentStays, response.data];

        set({ vmVenues: updatedVmVenues, stays: updatedStays });
        localStorage.setItem("vmVenues", JSON.stringify(updatedVmVenues));
        localStorage.setItem("stays", JSON.stringify(updatedStays));

        console.log("🔄 Updated vmVenues:", updatedVmVenues);
        console.log("🔄 Updated stays:", updatedStays);
      },

      editVenue: async (updatedVenueData) => {
        const token = get().token;
        const userName = get().userName;

        console.log("Before update:", get().vmVenues);

        console.log("🔍 Token before request:", token);
        console.log("🔍 Username before request:", userName);
        if (!token || !userName) {
          console.error(
            "Authentication error: Token or username is missing or invalid."
          );
          throw new Error(
            "Authentication error: Token and username are required. Please login again."
          );
        }
        console.log("🔍 Token before API request:", token);
        const selectedVenue = get().selectedVenue;
        const selectedVenueId = selectedVenue?.id;
        console.log("🔍 Selected Venue:", selectedVenue);
        console.log("🔍 Selected Venue ID:", selectedVenueId);

        if (!token) {
          setError("api", { message: "Authentication error: Token missing." });
          return;
        }
        try {
          const updatedVenue = await editVenue(
            selectedVenueId,
            updatedVenueData,
            token
          );

          console.log("API Response:", updatedVenue);
          console.log("vmVenues after update:", get().vmVenues);

          set((state) => ({
            vmVenues: state.vmVenues.map((v) =>
              v.id === selectedVenueId ? { ...v, ...updatedVenue.data } : v
            ),
            stays: state.stays.map((s) =>
              s.id === selectedVenueId ? { ...s, ...updatedVenue.data } : s
            ),
          }));

          await fetchVMVenues(userName, token);
          await fetchStays();

          set({ successMessage: "Venue updated successfully!" });
          console.log("Venue updated successfully:", updatedVenue);
          return updatedVenue;
        } catch (error) {
          console.error("Error updating venue:", error);
          throw error;
        }
      },

      deleteVenue: async (venueId) => {
        const token = get().token;
        const userName = get().userName;

        const success = await deleteVenue(venueId, token);
        if (success) {
          set((state) => ({
            vmVenues: Array.isArray(state.vmVenues)
              ? state.vmVenues.filter((venue) => venue.id !== venueId)
              : [],
            stays: Array.isArray(state.stays)
              ? state.stays.filter((stay) => stay.id !== venueId)
              : [],
          }));

          set({ vmVenues: [...get().vmVenues] });
          set({ stays: [...get().stays] });
        }

        await fetchVMVenues(userName, token);

        return;
      },

      fetchVMBookings: async () => {
        try {
          set({ loading: true, error: false });
          const fetchedBookings = await fetchVMBookings();
          set((state) => {
            const updatedBookings = [
              ...state.vmBookings,
              ...fetchedBookings.filter(
                (booking) =>
                  !state.vmBookings.some(
                    (existingBooking) => existingBooking.id === booking.id
                  )
              ),
            ];
            localStorage.setItem("vmBookings", JSON.stringify(updatedBookings));
            return { vmBookings: updatedBookings, loading: false };
          });
        } catch (error) {
          set({
            loading: false,
            error: true,
            errorMessage: error.message || "Failed to fetch bookings",
          });
        }
      },
    }),

    {
      name: "auth-storage",

      storage: {
        getItem: (key) => JSON.parse(localStorage.getItem(key)),
        setItem: (key, value) =>
          localStorage.setItem(key, JSON.stringify(value)),
        removeItem: (key) => localStorage.removeItem(key),
      },
    }
  )
);

export default useMyStore;
