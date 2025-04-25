import {create} from 'zustand';
import {jwtDecode} from 'jwt-decode';
import fetchStays from '../API/index.jsx';

  const useMyStore = create((set) => ({
stays: [],
setStays: (stays) => set({ stays }),
fetchStays: () => fetchStays(set),
selectedStay: null,
setSelectedStay: (stay)=> set({ selectedStay: stay }),

    token: null,
    isLoggedIn: false,

    login: (newToken) => {
      localStorage.setItem('token', newToken);
      set({ token: newToken, isLoggedIn: true });
    },

    logout: () => {
      localStorage.removeItem('token');
      set({ token: null, isLoggedIn: false });
    },

checkLoginStatus: () => {
  const token = localStorage.getItem('token');
  if (token) {
    try{
      const decoded = jwtDecode(token);
      const isTokenValid = decoded.exp * 1000 > Date.now();
      if (isTokenValid) {
        set({ token, isLoggedIn: true });

  } else {
    set({ token: null, isLoggedIn: false });
  }
}
  catch (error) {
    console.error('Error decoding token:', error);
    set({ token: null, isLoggedIn: false });
  }
}
},
}));

  export default useMyStore;