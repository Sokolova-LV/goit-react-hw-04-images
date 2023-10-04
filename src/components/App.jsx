import { useState, useEffect } from 'react';
import * as API from '../utils/Api';

import Searchbar from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";

export const App = () => {
  const [searchName, setSearchName] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const loadMore = () => {
    setCurrentPage(prevCurrentPage => prevCurrentPage + 1);
  };

  const handleSubmit = query => {
    setSearchName(query);
    setImages([]);
    setCurrentPage(1);
    setError(null);
  };

  useEffect(() => {
    if (searchName === '') return;

    const addImages = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await API.getImages(searchName, currentPage);
        setImages(prevImages => [...prevImages, ...data.hits]);
        setTotalPages(Math.ceil(data.totalHits / 12));
        data.totalHits === 0 && alert(`Sorry, image not found :(`);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    addImages();
  }, [currentPage, searchName]);

  return (
    <div>
      <Searchbar onSubmit={handleSubmit} />
      {error && <p>{error.message}</p>}
      {searchName.length > 0 ? (
        <ImageGallery images={images} />
      ) : (
        <p>Image gallery is empty...</p>
      )}
      {isLoading && <Loader />}
      {!isLoading && currentPage < totalPages && <Button onClick={loadMore} />}
    </div>
  );
};