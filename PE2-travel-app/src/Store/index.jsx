import {create} from 'zustand';

  const useMyStore = create((set) => ({

    token: null, 
    isLoggedIn: false,
    login: (newToken) => set({ token: newToken, isLoggedIn: true}),
    logout: () => set({token: null, isLoggedIn: false}),
 
checkLoginStatus: () => {
  const token = localStorage.getItem('token');
  return token ? set ({token, isLoggedIn: true}) : set({token: null, isLoggedIn: false});}}));

  export default useMyStore;