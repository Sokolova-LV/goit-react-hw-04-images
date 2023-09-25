import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalContent } from "./Modal.styled";

export const Modal = ({ largeImageURL, onClose, tags }) => {
    useEffect(() => {
        const keydownClick = e => {
            if (e.code === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', keydownClick);
        return () => {
            window.removeEventListener('keydown', keydownClick);
        };
    }, [onClose]);

    const backdropClick = ({ target, currentTarget }) => {
        if (currentTarget === target) {
            onClose();
        }
    };
    return (
        <div>
            <Overlay onClick={backdropClick}>
                <ModalContent>
                    <img src={largeImageURL} alt={tags} />
                </ModalContent>
            </Overlay>
        </div>
    );
};
    
Modal.propTypes = {
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};