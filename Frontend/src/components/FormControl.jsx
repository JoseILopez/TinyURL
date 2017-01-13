/*
**    Handles conditional rendering of
**    URLForm and status text
*/

import React from 'react';
import { connect } from 'react-redux';

import URLForm from './URLForm';
import { reloadPage } from '../actions/actions';

/* FormControl presentation component
  Checks for hasSubmitted, shows only response text if submitted.
  Otherwise it shows the URLForm */

function FormControlUI(props) {
  let successSpan =
  <div>
    <span>Access </span>
    <span className="boldText">'{ props.submitURL }'</span>
    <span> by using the following URL: </span>
  </div>;

  if (props.hasSubmitted) {
    if (!props.submitURL) {
      successSpan = <span/>
    }

    return (
      <div className="ResponseText">
        <p/>
        {successSpan}
        <br/>
        <a href={ props.submitText } rel="noopener" target="_blank">
          { props.submitText }
        </a>
        <br/>
        <button onClick={ props.reloadPage }>Restart</button>
      </div>
    );
  } else {
    return (
      <div className="URLForm">
        <URLForm />
        <br/>
        <span>{ props.submitText }</span>
        <br/>
        <ul>
          { props.shortURLs.map(shortURL =>
            <li key={ shortURL._id }>
              <span className="boldText">URL: </span>
              <span>{ `${shortURL.url} ---- ` }</span>
              <span className="boldText">ShortURL: </span>
              <a href={ `localhost:5000/${shortURL.shortName}` }
              rel="noopener" target="_blank">
                { `localhost:5000/${shortURL.shortName}`}
              </a>
            </li>
        )}</ul>
      </div>
    );
  }
}

// FormControl redux container

function mapStateToProps(state) {
  return {
    hasSubmitted: state.hasSubmitted,
    submitText: state.submitText,
    submitURL: state.submitURL,
    shortURLs: state.shortURLs,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    reloadPage: () => { dispatch(reloadPage()); }
  };
}

const FormControl = connect(mapStateToProps, mapDispatchToProps)(FormControlUI);


export default FormControl;
