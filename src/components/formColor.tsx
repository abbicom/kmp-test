import React, { useState } from 'react';
import {Color} from '../helpers/color';
import {generateId} from '../helpers/string';


// Props types
interface Proptypes {
    addColor(color: Color): void;
};

const FormColor: React.FC<Proptypes> = (props) => {
    const [hex, setHex] = useState('');

    return (
        <div className="form-color">
            <form onSubmit={(e) => {
                e.preventDefault();
                props.addColor({
                    id: generateId(),
                    hex: hex
                });
                setHex('');
            }}>
                <label className="form-label">Add new color:</label>
                <input type="text" className="form-input" value={hex} onChange={(e) => {
                    if (e.target.value.match(/^#[0-9a-f]{0,6}$/i)) setHex(e.target.value.toUpperCase())
                }} />
                <button type="submit" className="form-submit">Add</button>
                <span className="form-preview" style={{backgroundColor: hex.length === 7 ? hex : 'transparent'}}>&nbsp;</span>
            </form>
        </div>
    )
}

export default FormColor;