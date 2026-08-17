// export const BASE_URL = 'http://localhost:2326'
export const BASE_URL = location.hostname === "localhost" ? 'http://localhost:2326' : '/api'