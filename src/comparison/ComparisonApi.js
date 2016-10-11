const API_URL = 'https://api.transferwise.com/v1';

const AUTH_HEADERS = {
  'Content-type': 'application/json',
  'Authorization': 'Basic YjRhODM3MWUtZTE3Yi00NTIzLWE2MDgtMGMwNDFmYTBiOTRlOjEwMjIxNDFhLTliZGMtNDNkZS1hZGU0LWVlMzQ4OGNiNmNhZQ=='
};

function request(path) {
  return fetch(API_URL + path, {
    method: 'GET',
    headers: AUTH_HEADERS
  });
}

export function comparisonsFor(source, target, amount) {
    return request('/comparisons?source=' + source + '&target=' + target + '&amount=' + amount + '&includeGoogle=false');
}

export function providersFor(source, target) {
    return request('/comparisons/providers?source=' + source + '&target=' + target);
}
