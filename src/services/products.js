import { config } from '../helpers/config'
import { authHeader } from '../helpers/auth-header'

export function getProductsList() {
  return fetch(config.apiUrl + '/products')
    .then(data => data.json())
}
export function getProduct(id) {
  return fetch(config.apiUrl + '/products/' + id)
    .then(data => data.json())
}

export function createProduct(product) {
  return fetch(config.apiUrl + '/products', {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify({
      title: product.title,
      description: product.description,
      price: product.price,
      stock: product.stock,
      imageUrl: product.imageUrl
    })
  })
    .then(response => {
      return response
    })
}

export function updateProduct(id, product) {
  console.log(JSON.stringify({
    id: id, 
    title: product.title,
    description: product.description,
    price: product.price,
    stock: product.stock,
    imageUrl: product.imageUrl
  }))
  return fetch(config.apiUrl + '/products', {
    method: 'PUT',
    headers: authHeader(),
    body: JSON.stringify({
      id: id, 
      title: product.title,
      description: product.description,
      price: product.price,
      stock: product.stock,
      imageUrl: product.imageUrl
    })
  })
    .then(response => {
      return response
    })
}