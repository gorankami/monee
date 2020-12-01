function serverErrorHandler(res) {
  if (!res.ok) {
    throw Error(res.statusText)
  }
  return res
}

export function getTransactions() {
  return fetch(`/api/transactions`)
    .then(serverErrorHandler)
    .then((res) => res.json())
    .catch((error) => console.log(error))
}

export function getPurposeCategory() {
  return fetch(`/api/purposeCategory`)
    .then(serverErrorHandler)
    .then((res) => res.json())
    .catch((error) => console.log(error))
}

export function getConfig() {
  return fetch(`/api/config`)
    .then(serverErrorHandler)
    .then((res) => res.json())
    .catch((error) => console.log(error))
}

export function postTransactions(transactions) {
  return fetch(`/api/transactions`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(transactions),
  }).then((res) => res.json())
}

export function postPurposeCategory(purposeCategory) {
  return fetch(`/api/purposeCategory`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(purposeCategory),
  }).then((res) => res.json())
}

export function postConfig(config) {
  return fetch(`/api/config`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(config),
  }).then((res) => res.json())
}
