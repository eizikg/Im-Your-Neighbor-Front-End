export default (state = {IsLoggedIn: false}, action) => {
 switch (action.type) {
   case 'LOGGED_IN':
   return {...state, IsLoggedIn: true}
   case 'LOGGED_OUT':
   return {...state, IsLoggedIn: false}
   case 'SET_USER':
   return {...state, user: action.payload}
  default:
   return state
 }
}
