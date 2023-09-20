import React from "react";
import PropTypes from 'prop-types';
import { Btn } from "./Button.styled";

export const Button = ({ onClick }) => {
    return (
        <div>
            <Btn type="button" onClick={onClick}>
                Load more
            </Btn>
        </div>
    );
};

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
};