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

  static createUser(first_name, last_name, email, password) {
   return fetch('http://localhost:3000/api/v1/volounteers', {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({first_name: first_name, last_name: last_name, email: email, password: password})
  })
 }

 static joinGroup(user_id, group_id){
   console.log(user_id, group_id)
   return fetch('http://localhost:3000/api/v1/group_volounteers', {
     method: "POST",
     headers: {"Content-Type": "application/json", Authorization: localStorage.token},
     body: JSON.stringify({
       volounteer_id: user_id,
        group_id: group_id
       })
   })
 }


}

export default AuthAdapter
