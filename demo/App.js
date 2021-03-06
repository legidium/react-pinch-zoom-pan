import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {PinchView} from '../src/index'
import './style.css'

import imageHorizontal from './images/smola-ocean.jpg'
import imageVertical from './images/smola-crab-fishing.jpg'
import imageHorizontal2 from './images/smola-windmills.jpg'
import npmPackage from '../package.json'

const tabs = [{
  id: 'tab-0',
  label: 'Usage'
}, {
  id: 'tab-1',
  image: imageHorizontal,
  containerRatio: ((400 / 600) * 100),
  maxScale: 3,
  label: 'Horizontal Image',
  text: `Set containerRatio to the same ratio as the image : ${((400 / 600) * 100).toFixed(2)}`,
  styles: {
    margin: 'auto',
    width: '100%',
    height: 'auto'
  }
}, {
  id: 'tab-2',
  image: imageVertical,
  containerRatio: 100,
  maxScale: 3,
  label: 'Vertical Image',
  text: 'Where containerRatio is set to 100 (equal height and width)',
  styles: {
    margin: 'auto',
    width: 'auto',
    height: '100%'
  }
}, {
  id: 'tab-3',
  image: imageHorizontal2,
  containerRatio: ((400 / 600) * 100),
  maxScale: 3,
  initialScale: 2,
  label: 'Initial scale',
  text: 'This allow you to display the content scaled (zoom x2)',
  styles: {
    margin: 'auto',
    width: '100%',
    height: 'auto'
  }
}]

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedTab: tabs[0].id
    }
  }
  onChangeTab = (selectedTab) => {
    this.setState({selectedTab})
  }
  render () {
    const {selectedTab} = this.state
    const selectedTabContent = tabs.find(({id}) => id === selectedTab)
    return (
      <div>
        <section className='hero is-primary'>
          <div className='hero-body'>
            <div className='container'>
              <a href={npmPackage.homepage} className='is-pulled-right is-medium tag is-dark'>Fork on Github</a>
              <h1 className='title'>
                {npmPackage.name} ({npmPackage.version})
              </h1>
              <h2 className='subtitle'>
                {npmPackage.description}
              </h2>
            </div>
          </div>
        </section>
        <div className='section'>
          <div className='tabs is-medium'>
            <ul>
              {tabs.map((tab, i) => <TabButton key={i} {...tab} onClick={this.onChangeTab} className={selectedTabContent && tab.id === selectedTabContent.id ? 'is-active' : ''} />)}
            </ul>
          </div>
          {selectedTabContent && this.renderTabContent(selectedTabContent)}
        </div>
      </div>
    )
  }
  renderUsage () {
    return (
      <div className='content'>
        <ul>
          <li><strong>Desktop:</strong> Pinch by holding down <strong>ALT</strong> and drag from center of image and out.</li>
          <li><strong>Touch</strong> Pinch-zoom with two-finger gesture.</li>
        </ul>
        <p className='is-small'>When the image is zoomed you will be able to drag it within the container.</p>
      </div>
    )
  }
  renderTabContent ({maxScale, containerRatio, image, initialScale, text, styles}) {
    if (!image) {
      return this.renderUsage()
    }
    return (
      <div className='content'>
        <p>{text}</p>
        <div className='pinch-wrapper'>
          <PinchView debug backgroundColor='#ddd' maxScale={maxScale} initialScale={initialScale} containerRatio={containerRatio} onPinchStart={() => console.log('pinch started')}>
            <img src={image} style={styles} />
          </PinchView>
        </div>
      </div>
    )
  }
}

const TabButton = ({label, id, onClick, className = ''}) => {
  const action = () => onClick(id)
  return (
    <li className={className}><a onClick={action}>{label}</a></li>
  )
}
TabButton.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string
}
