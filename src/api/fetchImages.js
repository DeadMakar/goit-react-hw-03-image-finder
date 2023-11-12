import axios from 'axios';

const API_KEY = '39682657-fd9e278a28ef45885f48a6f4f';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(searchQuery, page) {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    orientation: 'horizontal',
    image_type: 'photo',
    q: searchQuery,
    page: page,
    per_page: 12,
  });

  const response = await axios.get(`${BASE_URL}?${searchParams}`);
  return response.data;
}
