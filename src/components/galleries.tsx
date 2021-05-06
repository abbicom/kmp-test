import React from 'react';
import Gallery from './gallery';
import {Color} from '../helpers/color';


interface PropTypes {
    colors: Color[];
    removeColor(id: string): void;
};

const Galleries: React.FC<PropTypes> = (props) => {
    return (
        <div className="galleries">
            <div className="row">
                {props.colors.map((color, i) => <Gallery key={'color'+i} color={color} removeColor={props.removeColor} />)}
            </div>
        </div>
    );
}

export default Galleries;