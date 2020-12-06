function serverErrorHandler(res) {
  if (!res.ok) {
    throw Error(res.statusText)
  }
  return res
}

let url = ""
// url = "http://localhost:8080"

export function getTransactions() {
  return fetch(`${url}/api/transactions`)
    .then(serverErrorHandler)
    .then((res) => res.json())
    .catch((error) => console.log(error) && error)
}

export function getPurposeCategory() {
  return fetch(`${url}/api/purposeCategory`)
    .then(serverErrorHandler)
    .then((res) => res.json())
    .catch((error) => console.log(error) && error)
}

export function getConfig() {
  return fetch(`${url}/api/config`)
    .then(serverErrorHandler)
    .then((res) => res.json())
    .catch((error) => console.log(error) && error)
}

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}

export function postTransactions(transactions) {
  return fetch(`${url}/api/transactions`, {
    method: 'POST',
    headers,
    body: JSON.stringify(transactions),
  })
    .then(serverErrorHandler)
    .then((res) => res.json())
}

export function postPurposeCategory(purposeCategory) {
  return fetch(`${url}/api/purposeCategory`, {
    method: 'POST',
    headers,
    body: JSON.stringify(purposeCategory),
  })
    .then(serverErrorHandler)
    .then((res) => res.json())
}

export function postConfig(config) {
  return fetch(`${url}/api/config`, {
    method: 'POST',
    headers,
    body: JSON.stringify(config),
  })
    .then(serverErrorHandler)
    .then((res) => res.json())
}
