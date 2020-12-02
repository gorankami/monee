function serverErrorHandler(res) {
  if (!res.ok) {
    throw Error(res.statusText)
  }
  return res
}

export function getTransactions() {
  return fetch(`http://localhost:8080/api/transactions`)
    .then(serverErrorHandler)
    .then((res) => res.json())
    .catch((error) => console.log(error) && error)
}

export function getPurposeCategory() {
  return fetch(`http://localhost:8080/api/purposeCategory`)
    .then(serverErrorHandler)
    .then((res) => res.json())
    .catch((error) => console.log(error) && error)
}

export function getConfig() {
  return fetch(`http://localhost:8080/api/config`)
    .then(serverErrorHandler)
    .then((res) => res.json())
    .catch((error) => console.log(error) && error)
}

export function postTransactions(transactions) {
  return fetch(`http://localhost:8080/api/transactions`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(transactions),
  })
    .then(serverErrorHandler)
    .then((res) => res.json())
}

export function postPurposeCategory(purposeCategory) {
  return fetch(`http://localhost:8080/api/purposeCategory`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(purposeCategory),
  })
    .then(serverErrorHandler)
    .then((res) => res.json())
}

export function postConfig(config) {
  return fetch(`http://localhost:8080/api/config`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(config),
  })
    .then(serverErrorHandler)
    .then((res) => res.json())
}
