/*global chrome*/
import React, { useEffect, useRef } from 'react';
import LearnModalStyle from './LearnModal.style';
import { initModal } from './initModal';
import { useAuth } from '../../context/Auth';

function LearnModal() {

  const modalBody = useRef(null);
  const { loggingInfo } = useAuth();

  function moveLearnModal() {
    const executeScript = initModal(modalBody, 'vpu-learn-modal');
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.executeScript(
        tabs[0].id,
        { code: executeScript }
      );
    });
  }

  useEffect(() => {
  }, [])

  return (
    <div className="learn-modal">
      <div id="vpu-learn-modal" className="modal-body" style={LearnModalStyle} ref={modalBody}>

      </div>
      <button onClick={moveLearnModal}>Move</button>
    </div>
  )

};

export default LearnModal;
