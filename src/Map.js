import React, { Component } from 'react'
import regions from './Map.json'
class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      regions: {},
      hoveredRegion: '',
      activeRegions: {},
      viewBox: '-20 0 690 710',
      width: 410,
      height: 470,
      defaultStyle: {
        normalStyle: {
          fill: '#e9e8e3',
          fillOpacity: 1,
          stroke: '#f48101',
          strokeWidth: 0.5,
          strokeOpacity: 1,
          cursor: 'pointer',
        },
        activeStyle: {
          fill: '#f48101',
          fillOpacity: 1,
          stroke: '#e9e8e3',
          strokeWidth: 0.5,
          strokeOpacity: 1,
          cursor: 'pointer',
        },
        transitionToActiveStyle: {
          fill: '#ed2f25',
          fillOpacity: 1,
          stroke: '#ed2f25',
          strokeOpacity: 1,
          strokeWidth: 2,
          cursor: 'pointer',
          transition: 'fill 1s ease',
          transform: 'scale(1.25, 1.25)',
          transformOrigin: '50% 50%',
        },
        transitionToNormalStyle: {
          fill: 'brown  ',
          fillOpacity: 1,
          stroke: 'brown',
          strokeOpacity: 1,
          strokeWidth: 2,
          cursor: 'pointer',
          transition: 'fill 1s ease',
          transform: 'scale(1.25, 1.25)',
          transformOrigin: '50% 50%',
        }
      },
      normalStyle: {
        fill: '',
        fillOpacity: '',
        stroke: '',
        strokeWidth: '',
        strokeOpacity: '',
        cursor: '',
      },
      activeStyle: {
        fill: '',
        fillOpacity: '',
        stroke: '',
        strokeWidth: '',
        strokeOpacity: '',
        cursor: '',
      },
      transitionToActiveStyle: {
        fill: '',
        fillOpacity: '',
        stroke: '',
        strokeOpacity: '',
        strokeWidth: '',
        cursor: '',
        transition: '',
        transform: '',
        transformOrigin: '',
      },
      transitionToNormalStyle: {
        fill: '',
        fillOpacity: '',
        stroke: '',
        strokeOpacity: '',
        strokeWidth: '',
        cursor: '',
        transition: '',
        transform: '',
        transformOrigin: '',
      }
    }
  }

  componentWillMount() {
    this.setState({
      regions,
    })
  }

  componentDidMount() {
    this.setStyle('normalStyle', this.props.normalStyle)
    this.setStyle('activeStyle', this.props.activeStyle)
    this.setStyle('transitionToActiveStyle', this.props.transitionToActiveStyle)
    this.setStyle('transitionToNormalStyle', this.props.transitionToNormalStyle)
    this.setActiveRegions()
    this.setViewBox()
  }

  setViewBox = () => {
    const viewBox = this.props.viewBox ? this.props.viewBox : this.state.viewBox
    const width = this.props.width ? this.props.width : this.state.width
    const height = this.props.height ? this.props.height : this.state.height
    this.setState({
      viewBox,
      width,
      height
    })
  }
  setActiveRegions = () => {
    let { regions, activeRegions } = this.state
    for (const regionId in regions) {
      activeRegions[regions[regionId]['title']] = false
    }
    this.setState({
      activeRegions
    })
  }

  setStyle = (styleName, style) => {
    const { defaultStyle } = this.state
    let currentStyle = this.state[`${styleName}`]
    let newStyle = {}
    if (style) {
      if (Object.keys(style).length > 0) {
        for (const el in currentStyle) {
          if (style[`${el}`]) {
            newStyle[`${el}`] = style[`${el}`]
          } else {
            newStyle[`${el}`] = defaultStyle[`${styleName}`][`${el}`]
          }
        }
      }
      newStyle = Object.assign({}, defaultStyle[`${styleName}`])
    } else {
      for (const el in currentStyle) {
        newStyle[`${el}`] = defaultStyle[`${styleName}`][`${el}`]
      }
    }
    if (styleName === 'normalStyle') {
      this.setState({ normalStyle: newStyle })
    }
    if (styleName === 'activeStyle') {
      this.setState({ activeStyle: newStyle })
    }
    if (styleName === 'transitionToActiveStyle') {
      this.setState({ transitionToActiveStyle: newStyle })
    }
    if (styleName === 'transitionToNormalStyle') {
      this.setState({ transitionToNormalStyle: newStyle })
    }
  }

  getTransitionStyle = (region) => {
    let style = {}
    const { activeRegions, hoveredRegion, transitionToNormalStyle, transitionToActiveStyle } = this.state
    if (activeRegions[hoveredRegion]) {
      style = Object.assign({}, transitionToNormalStyle)
    } else {
      style = Object.assign({}, transitionToActiveStyle)
    }
    return style
  }

  onMouseEnter = (event) => {
    this.setState({
      hoveredRegion: event.target.dataset.region,
    })
    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(event, this.state.hoveredRegion)
    }
  }

  onMouseOut = (event) => {
    this.setState({ hoveredRegion: '' })
    if (this.props.onMouseOut) {
      this.props.onMouseOut(event)
    }
  }

  onRegionClicked = (event) => {
    let { activeRegions } = this.state
    this.setState({ hoveredRegion: '' })
    if (activeRegions[event.target.dataset.region]) {
      activeRegions[event.target.dataset.region] = false
    } else {
      activeRegions[event.target.dataset.region] = true
    }
    if (this.props.onRegionClicked){
      this.props.onRegionClicked(event, activeRegions)
    }
  }

  render() {
    const { regions, hoveredRegion, activeRegions, normalStyle, activeStyle, viewBox, width, height
       } = this.state
    return (
      <div>
        <svg
          width={width}
          height={height}
          viewBox={viewBox}
        >
          {Object.keys(regions).map(region => {
            return (
              <g
                key={region}
              >
                <path
                  id={region}
                  d={regions[region]['path']}
                  data-region={regions[region]['title']}
                  style={regions[region]['title'] === hoveredRegion ? this.getTransitionStyle(regions[region]['title']) : normalStyle && activeRegions[regions[region]['title']] ? activeStyle : normalStyle}
                  onClick={this.onRegionClicked}
                  onMouseEnter={this.onMouseEnter}
                  onMouseOut={this.onMouseOut}
                />
                <title >{regions[region]['title']}</title>
              </g>
            )
          })}
        </svg>
      </div>
    )
  }
}

export default Map