import axios from "axios";

axios.defaults.baseURL = 'https://pixabay.com/api/';

const API_KEY = '36691482-84c9306078cd4b2d6bb1013dd';

export const perPage = 12;

export const getImages = async (query, page) => {
    const response = await axios.get(
        `?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&page=${page}&per_page=${perPage}`
    );
    return response.data;
};

export const normalizedImages = imagesArray =>
    imagesArray.map(({ id, tags, webformatURL, largeImageURL }) => {
        return { id, tags, webformatURL, largeImageURL };
    });