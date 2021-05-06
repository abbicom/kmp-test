import React from 'react';


interface PropTypes {
    red_50: boolean;
    setFilterRed(value: boolean): void;
    green_50: boolean;
    setFilterGreen(value: boolean): void;
    blue_50: boolean;
    setFilterBlue(value: boolean): void;
    saturation_50: boolean;
    setFilterSaturation(value: boolean): void;
};

const Filters: React.FC<PropTypes> = (props) => {
    return (
        <div className="filters">
            <span className="filter">
                <input type="checkbox" id="red_50" checked={props.red_50} onChange={(e) => props.setFilterRed(e.target.checked)} />
                <label className="filter-label" htmlFor="red_50">Red &gt; 50%</label>
            </span>
            <span className="filter">
                <input type="checkbox" id="green_50" checked={props.green_50} onChange={(e) => props.setFilterGreen(e.target.checked)} />
                <label className="filter-label" htmlFor="green_50">Green &gt; 50%</label>
            </span>
            <span className="filter">
                <input type="checkbox" id="blue_50" checked={props.blue_50} onChange={(e) => props.setFilterBlue(e.target.checked)} />
                <label className="filter-label" htmlFor="blue_50">Blue &gt; 50%</label>
            </span>
            <span className="filter">
                <input type="checkbox" id="saturation_50" checked={props.saturation_50} onChange={(e) => props.setFilterSaturation(e.target.checked)} />
                <label className="filter-label" htmlFor="saturation_50">Saturation &gt; 50%</label>
            </span>
        </div>
    );
}

export default Filters;