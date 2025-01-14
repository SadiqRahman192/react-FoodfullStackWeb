import { createContext, useReducer } from "react";

const CartContext = createContext({
  items :[],
  addItem: (item) => {}, // *item* to get item a meal item that should be added to the cart.
  removeItem: (id) => {}, // *id* where we expect  an id of an item where we wanna remove an item with the named if from the items array.
  clearCart: () => {}
});

function cartReducer(state, action) {
  // The goal of this reducer to
  if (action.type === "ADD_ITEM") {
    // state.items.push(action.item); // UPDATTING THE STATE LIKE THIS IS NOT A GOOD IDEA FOR TWO MAIN REASONS (1/thst we editing the existing array so u make a change before u executing the code)(2/we r not alwasys wana add an item to an item array)
    //    instead we will update the state
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    ); // *  AND WILL NEED THAT INDEX LATER TO UPDATE THE ITEM

    const updatedItems = [...state.items]; // we created a copy instead of editing a original 1 now we can use this *updatedItem in  th else block below

    if (existingCartItemIndex > -1) {
      const existingItem = state.items[existingCartItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1, //  At this this point of time we r only  available to add item to the cart for incresing the qqty of that iitem in a cart is the ext step we r going to . Well to acieve this we going to tweak the ln no 27 code from  this form **updatedItems.push(action.item);**
      };
      updatedItems[existingCartItemIndex] = updatedItem; // So that we r over writing with a new updateditem ln (const*22,23,24) and This line is so called updating a state in a immutable way.So with out changing the existing state in  a memory
    } else {
      updatedItems.push({...action.item, quantity: 1 });
    }

    return { ...state,  items: updatedItems }; // THIS LINE IS MAIN THING OF REDUCER THAT IT SHOULD RETURN AN UPDATED STATE.
    // Update the  State to add meall item
  }

  //  ADDING ITEM LOGIC FINISH NOW ITS TIME TO REMOVE AN ITEM
  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id); // SIMPLY COPY PASTE THE CODE THAT WE WROTE FOR ABOVE FOR ADD ITEM LOGIC CUZ WE R UPDDATE THAT EXISTING CART ITEM IN AN IMMUTABLE WAY

    const existingCartItem = state.items[existingCartItemIndex];

    const updatedItems = [...state.items]; // ARRY MOVED  UP ONELEVEL <=== tip: There r many ways of removing the item one way is craete a copy of the old items(so that create a new arry based on the old items [...state.items]) and to then called the splice method on that arry that we just created a sec ago
    
    if (existingCartItem.quantity === 1) {
      // If thats the  the case we wanna remove the entire item from the shoping cart
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      // AND WE NOW WE JUST NEED TO UPDATE OUR EXISTING ITEM. IN ORDER TO DO THAT WE MOVE CONST ARRY CREATION OUTSIDE OF IF BLOCK SO THAT ITS AVAILABLE FOR BOTH IF AND ELSE STATEMENT.
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return { ...state, items: updatedItems }; // THIS LINE IS MAIN THING OF REDUCER THAT IT SHOULD RETURN AN UPDATED STATE.
    // that copys (...state) the old state and updates the items

    //adding logic REMOVE AN ITEM FROM STATE
  }

  if (action.type === 'CLEAR_CART') {
   return {...state, items: []}
  }

  return state;
}

// And Now We ca
export function CartContextProvider({ children }) {
  const [cartState, dispachCartAction] = useReducer(cartReducer, { items: [] }); // and then u passed in this useRducer a second argument that should be assumed when this component renders for the first time as second arg to usereducer.

  function addItem(item) {
    dispachCartAction({ type: "ADD_ITEM", item: item });
  }

  function removeItem(id) {
    dispachCartAction({ type: "REMOVE_ITEM", id });
  }

  function clearCart() {
    dispachCartAction({type: 'CLEAR_CART'})
  }

  const cartContext = {
    items: cartState.items,
    addItem,
    removeItem,
    clearCart   
  };

  // console.log(cartContext);
  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;

// CREATE Context in the end allow us to spread data into all components that needed in very and reusable way.
// Simply in other words Its just for spreading data to all components get rid off u from Prop drilling
