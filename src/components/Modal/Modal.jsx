import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalContent } from "./Modal.styled";

export const Modal = ({ largeImageURL, tags, onClose }) => {
    useEffect(() => {
        const keydownClick = e => {
            if (e.code === `Escape`) {
                onClose();
            }
        };
        window.addEventListener('keydown', keydownClick);
        window.removeEventListener('keydown', keydownClick);
    }, [onClose]);

    const backdropClick = e => {
        if (e.currentTarget === e.target) {
            onClose();
        }
    };

    return (
        <Overlay onClick={backdropClick}>
            <ModalContent>
                <img src={largeImageURL} alt={tags} />
            </ModalContent>
        </Overlay>
    );

};

Modal.propTypes = {
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};