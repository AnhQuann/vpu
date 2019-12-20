import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import app from '../../config/firebaseConfig';
import M from 'materialize-css';
import './Menu.css';

function Menu(props) {
  const { history } = props;
  const confirmModal = useRef(null);

  function signOut() {
    app.auth().signOut().then(() => {
      localStorage.setItem("referer", "");
      history.push("/login");
    }).catch(err => console.log(err));
  }

  useEffect(() => {
    M.Modal.init(confirmModal.current);
  }, [])

  return (
    <div className="menu">
      <Link to="/learn" className="waves-effect waves-light btn"><i className="material-icons right">slideshow</i>Learn</Link>
      <Link to="/add-new-word" className="waves-effect waves-light btn"><i className="material-icons right">brush</i>Add new word</Link>
      <a href="#confirmSignOut" className="waves-effect waves-light btn modal-trigger"><i className="material-icons right">exit_to_app</i>Sign out</a>

      <div className="modal" id="confirmSignOut" ref={confirmModal}>
        <div className="modal-content">
          <h6>Are you sure want to sign out?</h6>
        </div>
        <div className="modal-footer">
          <button className="waves-effect waves-light btn modal-close">Cancel</button>
          <button onClick={signOut} className="waves-effect waves-light btn">Ok</button>
        </div>
      </div>
    </div>
  )
};

export default Menu;
