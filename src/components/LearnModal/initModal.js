import dragModal from './dragModal';

export function initModal(modal, modalID) {
  return [
    `if(!document.getElementById('${modalID}')) {
      document.body.innerHTML += '${modal.outerHTML}';
      const VPULearnModal = document.getElementById('${modalID}');
      VPULearnModal.style.position = 'fixed';
      VPULearnModal.style.zIndex = '999999999';
      VPULearnModal.style.top = '0';
      VPULearnModal.style.left = '50%';
      const dragModal = ${dragModal};
      dragModal(VPULearnModal);
    } else {
      alert("Already show");
    }`
  ].join('\n');
}