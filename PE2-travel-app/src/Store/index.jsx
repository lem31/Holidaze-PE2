import {create} from 'zustand';
import {persist} from 'zustand/middleware';


  const useMyStore = create(persist((set, get) => ({
//     products: [],
//     cart: [],
//     cartTotal: 0,
   

//     setProducts: (products) => set({  products }),
//     addProductToCart: (product) => set((state) => {
//       const itemInCart = state.cart.find((item) => item.id === product.id);
//       let newCart;
//       if (itemInCart) {
//         newCart = state.cart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
//       } else {
//         newCart = [...state.cart, { ...product, quantity: 1 }];
//       }
//       const newTotal = newCart.reduce((total, product) => total + (product.price * product.quantity), 0);

//       return { cart: newCart, cartTotal: newTotal.toFixed(2) };
//     }),
//     removeProductFromCart: (productId) => set((state) => {
//       const itemInCart = state.cart.find((item) => item.id === productId);
//       let newCart;
//       if (itemInCart && itemInCart.quantity > 1) {
//         newCart = state.cart.map((item) => item.id === productId ? { ...item, quantity: item.quantity - 1 } : item);
//       } else {
//         newCart = state.cart.filter((product) => product.id !== productId);
//       }
//       const newTotal = newCart.reduce((total, product) => total + (product.price * product.quantity), 0);

//       return { cart: newCart, cartTotal: newTotal.toFixed(2) };
//     }),

//     removeAllOfProductFromCart: (productId) => set((state) => {
//       const newCart = state.cart.filter((product) => product.id != productId);
//       const newTotal = newCart.reduce((total, product) => total + (product.price * product.quantity), 0);

//       return { cart: newCart, cartTotal: newTotal.toFixed(2) };
//     }),
      
//     clearCart: () => set({
//       cart: [],
//       cartTotal: 0,
//     }),
//     cartCount: (state) => state.cart.reduce((total, product) => total + product.quantity, 0),
  
  
// specificProductTotal: (product) => {
//   const state = get();
//   const itemInCart = state.cart.find((item) => item.id === product.id);
//   return itemInCart ? (itemInCart.price * itemInCart.quantity).toFixed(2) : '0.00';
// },


// findRelatedProducts: () => {
//   const state = get();
//   return state.products.filter((product) => {
//     return state.cart.some((cartItem) => product.category === cartItem.category && product.id !== cartItem.id);
//   });
// },
// }),
//   {
//     name: 'my-store-cart',
//     getStorage: () => localStorage,
  }));

 

  export default useMyStore;