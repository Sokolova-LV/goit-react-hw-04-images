/*import { Component } from "react";*/
import { useState, useEffect } from 'react';
import * as API from '../utils/Api';

import { Searchbar } from './Searchbar/Searchbar';
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
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    const addImages = () => {
      setStatus('pending');
    }

    if (searchName !== '') {
      setStatus('pending');
    }

    if (!searchName) {
      return;
    }
    
    addImages();
    }, [searchName]);

    API
      .getImages(searchName, currentPage)
      .then(data => {
        setTotalPages(Math.ceil(data.totalHits / 12));
        return data.hits;
      })
      .then(prevImages => {
        setImages([...images, ...prevImages]);
        setCurrentPage(prevCurrentPage => prevCurrentPage + 1);
        setStatus('resolved');
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  };

  const handleSubmit = query => {
    setSearchName(query);
    setImages([]);
    setCurrentPage(1);
  };
  return (
      <div>
      <Searchbar onSubmit={handleSubmit} />
      
      {status === 'idle' && (`Please, text the search word`)}

      {status === 'pending' && <Loader />}

      {status === 'rejected' && !images.length && (
        <p>Image gallery is empty...</p>
      )}

      {status === 'resolved' && images.length > 0 && (
        <ImageGallery images={images} />
      )}

      {images.length > 11 && totalPages !== currentPage && !isLoading && (
          <Button onClick={addImages} />
      )}
      </div>
    );
  };