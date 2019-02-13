class AuthAdapter {


  static fetchUser() {
    return fetch('http://localhost:3000/api/v1/volounteers/profile', {
     method: "POST",
     headers: {"Content-Type": "application/json",
     Authorization: localStorage.token}
   })
  }


//not completed or tested
  static joinEvent(group_id, user_id, event_id){
    console.log("params to create group", group_id, user_id, event_id);
    return fetch('http://localhost:3000/api/v1/event_volounteers', {
      method: "POST",
      headers: {"Content-Type": "application/json",
      Authorization: localStorage.token},
      body: JSON.stringify({group_id: group_id, volounteer_id: user_id, event_id: event_id})
    })
  }

  static logOut() {
    localStorage.removeItem('token');
  }

   static checklogin (email, password) {
     console.log("params for checking the login" ,email, password);
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
   console.log("params for joining a group", user_id, group_id)
   return fetch('http://localhost:3000/api/v1/group_volounteers', {
     method: "POST",
     headers: {"Content-Type": "application/json", Authorization: localStorage.token},
     body: JSON.stringify({
       volounteer_id: user_id,
        group_id: group_id
       })
   })
 }

 static fetchGroup(group_id){
   console.log("parmas for fetching group data" ,group_id)
   return fetch(`http://localhost:3000/api/v1/groups/${group_id}`, {
      headers: {"Content-Type": "application/json", Authorization: localStorage.token}
    })
 }

 static fetchEvent(event_id){
 return fetch(`http://localhost:3000/api/v1/events/${event_id}`, {
    headers: {"Content-Type": "application/json", Authorization: localStorage.token}
 })
}

 static newEvent(group_id, description){
   console.log(group_id, description);
   return fetch(`http://localhost:3000/api/v1/events`, {
      method: "POST",
      headers: {"Content-Type": "application/json", Authorization: localStorage.token},
      body: JSON.stringify({
        group_id: group_id,
        description: description,
        active: true
      })
   })
 }

 static getVolounteersLocation(location, range){
   return fetch('http://localhost:3000/api/v1/volounteers/location', {
     headers: {GeoLocation: [[location.lat, location.lng]], Range:range}
   })
 }


}

export default AuthAdapter