class LocalStorageActions {
  static getToken() {
    return localStorage.getItem("token")
  }
  static getUserId() {
    return localStorage.getItem("userid")
  }
  static setToken(token: string) {
    localStorage.setItem("token",token)
  }
  static setUser(username:string , userid:string){
    localStorage.setItem("username",username)
    localStorage.setItem("userid",userid)
  }
  static clearStorage() {
    localStorage.removeItem("userid")
    localStorage.removeItem("username")
    localStorage.removeItem("token")
    localStorage.clear()
  }
}

export default LocalStorageActions