export function getTransactions() {
  return fetch(`/api/transactions`).then((res) => res.json())
}

export function getPurposeCategory() {
  return fetch(`/api/purposeCategory`).then((res) => res.json())
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
