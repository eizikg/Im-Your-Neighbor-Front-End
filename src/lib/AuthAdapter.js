class AuthAdapter {


  static fetchUser(user_id) {
    return fetch('http://localhost:3000/api/v1/volounteers/profile', {
     method: "POST",
     headers: {"Content-Type": "application/json",
     Authorization: localStorage.token}
   })
  }

  static logOut() {
    localStorage.removeItem('token');
  }

   static checklogin (email, password) {
     console.log(email, password);
     return fetch('http://localhost:3000/api/v1/volounteers/login', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({email:email, password:password})
    })
  }

}

export default AuthAdapter
