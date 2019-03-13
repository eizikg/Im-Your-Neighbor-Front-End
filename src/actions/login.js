export const login = () => (
    {type: "LOGGED_IN"}
)

export const logOut = () => (
  {type: "LOGGED_OUT"}
)

export const setUser = (object) => (
  {type: "SET_USER", payload: object}
)
