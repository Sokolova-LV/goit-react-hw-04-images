/*import { Component } from "react";*/
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
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (searchName !== '') {
      setStatus('pending');
    }
    if (!searchName) {
      return;
    }
    addImages();
    }, [searchName]);

  const addImages = () => {
    setStatus('pending');

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
  
  
/*export class App extends Component {
  state = {
    searchName: '',
    images: [],
    currentPage: 1,
    error: null,
    isLoading: false,
    totalPages: 0,
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.searchName !== this.state.searchName ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.addImages();
    }
  }

  loadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  handleSubmit = query => {
    this.setState({
      searchName: query,
      images: [],
      currentPage: 1,
    });
  };

  addImages = async () => {
    const { searchName, currentPage } = this.state;
    try {
      this.setState({ isLoading: true });

      const data = await API.getImages(searchName, currentPage);

      if (data.hits.length === 0) {
        return alert('Sorry, image not found :(');
      };

      const normalizedImages = API.normalizedImages(data.hits);

      this.setState(state => ({
        images: [...state.images, ...normalizedImages],
        isLoading: false,
        error: '',
        totalPages: Math.ceil(data.totalHits / 12),
      }));
    } catch (error) {
      this.setState({ error: 'Something went wrong...' });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { images, isLoading, currentPage, totalPages } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleSubmit} />
        {images.length > 0 ? (
          <ImageGallery images={images} />
        ) : (
          <p>Image gallery is empty...</p>
        )}
        {isLoading && <Loader />}
        {images.length > 0 && totalPages !== currentPage && !isLoading && (
          <Button onClick={this.loadMore} />
        )}
      </div>
    );
  }
}*/