import React from 'react';
import {Color} from '../helpers/color';


interface PropTypes {
    color: Color;
    removeColor(id: string): void;
};

const Gallery: React.FC<PropTypes> = (props) => {
    return (
        <div className="gallery">
            <div className="gallery-color" style={{backgroundColor: props.color.hex}}></div>
            <div className="gallery-hex">
                {props.color.hex}
                {props.color.id && <button type="button" className="gallery-remove" onClick={(e) => props.removeColor(props.color.id || '')}>X Remove</button>}
            </div>
        </div>
    );
}

export default Gallery;