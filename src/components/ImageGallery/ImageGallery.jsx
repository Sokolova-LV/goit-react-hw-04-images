import React from "react";
import PropTypes from 'prop-types';
import { Gallery } from "./ImageGallery.styled";

import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";

export const ImageGallery = ({ images }) => {
    return (
        <Gallery>
            {images.map(image => (
                <ImageGalleryItem key={image.id} image={image} />
            ))}
        </Gallery>
    );
};

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
        })
    ).isRequired,
};