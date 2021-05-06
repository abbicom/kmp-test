import React from 'react';
import FormColor from './formColor';
import Filters from './filters';
import Galleries from './galleries';
import {hexToRGB, hexToHSL, Color, RGB, HSL} from '../helpers/color';


// Props types
interface PropTypes {};

// State types
interface StateTypes {
  colors: Color[];
  red_50: boolean;
  green_50: boolean;
  blue_50: boolean;
  saturation_50: boolean;
};

// Default colors
const initColors: Color[] = [
  {hex: '#1ABC9C'},
  {hex: '#2ECC71'},
  {hex: '#3498DB'},
  {hex: '#9B59B6'},
  {hex: '#34495E'},
  {hex: '#16A085'},
  {hex: '#27AE60'},
  {hex: '#2980B9'},
  {hex: '#8E44AD'},
  {hex: '#2C3E50'},
  {hex: '#F1C40F'},
  {hex: '#E67E22'},
  {hex: '#E74C3C'},
  {hex: '#ECF0F1'},
  {hex: '#95A5A6'},
  {hex: '#F39C12'},
  {hex: '#D35400'},
  {hex: '#C0392B'},
  {hex: '#BDC3C7'},
  {hex: '#7F8C8D'}
];

class App extends React.Component<PropTypes, StateTypes> {
  constructor(props: PropTypes) {
    super(props);

    // Initial state
    this.state = {
      colors: [],
      red_50: false,
      green_50: false,
      blue_50: false,
      saturation_50: false
    };

    this.addColor = this.addColor.bind(this);
    this.removeColor = this.removeColor.bind(this);
    this.setFilterRed = this.setFilterRed.bind(this);
    this.setFilterGreen = this.setFilterGreen.bind(this);
    this.setFilterBlue = this.setFilterBlue.bind(this);
    this.setFilterSaturation = this.setFilterSaturation.bind(this);
  }

  componentDidMount() {
    const colors: string | null = localStorage.getItem("colors");
    if (colors) {
      this.setState({colors: JSON.parse(colors)});
    } else {
      // set localStorage
      localStorage.setItem("colors", JSON.stringify(initColors));
      this.setState({colors: initColors});
    }
  }

  addColor(color: Color) {
    let {colors} = this.state;
    colors.push(color);
    // set localStorage
    localStorage.setItem("colors", JSON.stringify(colors));
    this.setState({colors: colors});
  }

  removeColor(id: string) {
    let {colors} = this.state;
    // filter removed color
    colors = colors.filter(color => color.id !== id);
    // set localStorage
    localStorage.setItem("colors", JSON.stringify(colors));
    this.setState({colors: colors});
  }

  setFilterRed(value: boolean) {
    this.setState({red_50: value});
  }

  setFilterGreen(value: boolean) {
    this.setState({green_50: value});
  }

  setFilterBlue(value: boolean) {
    this.setState({blue_50: value});
  }

  setFilterSaturation(value: boolean) {
    this.setState({saturation_50: value});
  }

  render() {
    const {colors, red_50, green_50, blue_50, saturation_50} = this.state;

    // Add RGB and HSL to color
    let _colors = colors.map((color: Color) => {
      const rgb: RGB = hexToRGB(color.hex);
      const hsl: HSL = hexToHSL(color.hex);
      return {...color, ...rgb, ...hsl};
    });

    // filter red > 50%
    if (red_50) {
      _colors = _colors.filter(color => color.r > 127);
    }

    // filter green > 50%
    if (green_50) {
      _colors = _colors.filter(color => color.g > 127);
    }

    // filter blue > 50%
    if (blue_50) {
      _colors = _colors.filter(color => color.b > 127);
    }

    // filter saturation > 50%
    if (saturation_50) {
      _colors = _colors.filter(color => color.s > 0.5);
    }

    // sort colors (red > green > blue)
    _colors.sort((a, b) => {
      if (a.r > b.r) return -1;
      if (a.r < b.r) return 1;
      if (a.r === b.r) {
        if (a.g > b.g) return -1;
        if (a.g < b.g) return 1;
        if (a.g === b.g) {
          if (a.b > b.b) return -1;
          if (a.b < b.b) return 1;
        }
      }
      return 0;
    });

    return (
      <div className="app">
        <FormColor
            addColor={this.addColor} />
        <Filters
            red_50={red_50}
            setFilterRed={this.setFilterRed}
            green_50={green_50}
            setFilterGreen={this.setFilterGreen}
            blue_50={blue_50}
            setFilterBlue={this.setFilterBlue}
            saturation_50={saturation_50}
            setFilterSaturation={this.setFilterSaturation} />
        <Galleries
            colors={_colors}
            removeColor={this.removeColor} />
      </div>
    );
  }
}

export default App;
