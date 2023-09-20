import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GalleryImage, GalleryItem } from "./ImageGalleryItem.styled";
import { Modal } from "components/Modal/Modal";

export class ImageGalleryItem extends Component {
    state = {
        modalOpen: false,
    };

    toggleModal = () => {
        this.setState(({ modalOpen }) => ({
            modalOpen: !modalOpen,
        }));
    };

    render() {
        const { modalOpen } = this.state;
        const { image } = this.props;

        return (
            <>
                <GalleryItem>
                    <GalleryImage
                        src={image.webformatURL}
                        alt={image.tags}
                        onClick={this.toggleModal}
                    />
                    {modalOpen && (
                        <Modal
                            largeImageURL={image.largeImageURL}
                            tags={image.tags}
                            onClose={this.toggleModal}
                        />
                    )}
                </GalleryItem>
            </>
        );
    }
}

ImageGalleryItem.propTypes = {
    image: PropTypes.shape({
        webformatURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
    }).isRequired,
};