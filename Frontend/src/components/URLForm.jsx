/*
**    Main URL form
*/

import React from 'react';
import { connect } from 'react-redux';
import { postStart, getAllStart, shortURLHide } from '../actions/actions';

// URLForm presentation component

class URLFormUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = { url: 'myurl.com', shortName: '' };
    this.handleShowAll = this.handleShowAll.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateURL= this.updateURL.bind(this);
    this.updateShortName = this.updateShortName.bind(this);
  }

  handleShowAll(evt) {
    evt.preventDefault();

    if (this.props.shortURLs.length > 0) {
      this.props.hideShortURLs();
    } else {
      this.props.showShortURLs();
    }
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.onSubmit(this.state.shortName, this.state.url);
  }

  updateURL(evt) {
    this.setState({ url: evt.target.value });
  }

  updateShortName(evt) {
    this.setState({ shortName: evt.target.value });
  }

  render() {
    let shortURLBtnText = 'Show All ShortURLs';

    if (this.props.shortURLs.length > 0) {
      shortURLBtnText = 'Hide ShortURLs';
    }

    return (
      <form>
        <p/>
        <label className="formHeader">
          Please input an URL and a custom short name if desired.<br/>
          <p/>
          <span className="InputText">URL: </span>
          <input
            type="text"
            autoFocus={ true }
            defaultValue={ this.state.url }
            onChange={ this.updateURL }
          />
          <br/>
          <p/>
          <span className="InputText">Short name: </span>
          <input
            type="text"
            autoFocus={ true }
            defaultValue={ this.state.shortName }
            onChange={ this.updateShortName }
          />
        <br/>
        <p/>
        </label>
      <button onClick={ this.handleSubmit }>Submit</button>
      <p/>
      <button onClick={ this.handleShowAll }>{ shortURLBtnText }</button>
    </form>
    );
  }
}

// URLForm container for Redux

function mapStateToProps(state) {
  return {
    shortURLs: state.shortURLs,
    submitText: state.submitText,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: (shortName, url) => { dispatch(postStart(shortName, url)); },
    showShortURLs: () => { dispatch(getAllStart()); },
    hideShortURLs: () => { dispatch(shortURLHide()); },
  };
}

const URLForm = connect(mapStateToProps, mapDispatchToProps)(URLFormUI);


export default URLForm;
