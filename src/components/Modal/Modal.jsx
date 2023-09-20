import { Component } from "react"; 
import PropTypes from 'prop-types';
import { Overlay, ModalContent } from "./Modal.styled";

export class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.keydownClick);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.keydownClick);
    }

    keydownClick = e => {
        if (e.code === 'Escape') {
            this.props.onClose();
        }
    };

    backdropClick = e => {
        if (e.currentTarget === e.target) {
            this.props.onClose();
        }
    };

    render() {
        const { largeImageURL, tags } = this.props;

        return (
            <Overlay onClick={this.backdropClick}>
                <ModalContent>
                    <img src={largeImageURL} alt={tags} />
                </ModalContent>
            </Overlay>
        );
    }
}

Modal.propTypes = {
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};