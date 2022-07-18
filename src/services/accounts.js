import { SHA3 } from 'sha3'
import { authHeader } from '../helpers/auth-header'
import { config } from '../helpers/config'

function hashPassword(password) {
  const hash = new SHA3(512)
  hash.update(password)
  return hash.digest('hex')
}
export function registerAccount(userInfo) {

  return fetch(config.apiUrl + '/accounts/register', {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify({
      fullname: userInfo.name,
      email: userInfo.email,
      password: hashPassword(userInfo.password)
    })
  })
    .then(response => {
      return response
    })
}

export function login(userInfo) {
  return fetch(config.apiUrl + '/accounts/login', {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify({
      email: userInfo.email,
      password: hashPassword(userInfo.password)
    })
  })
    .then(response => {
      //if (response.ok && response.status===200) response.text().then(userInfo => localStorage.setItem('user', userInfo)) // almacenar el nombre completo del usuario y el JWT en el local storage para mantener al usuario logueado entre refresco de páginas.  
      return response
    })
}
