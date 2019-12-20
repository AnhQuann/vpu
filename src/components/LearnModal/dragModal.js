export default (element) => {
  const currentPosition = { x: 0, y: 0 };
  const distanceUpdate = { x: 0, y: 0 };
  element.addEventListener("mousedown", dragMouseDown);

  function dragMouseDown(e) {
    currentPosition.x = e.clientX;
    currentPosition.y = e.clientY;
    document.addEventListener("mousemove", elementDrag);
    document.addEventListener("mouseup", closeDragElement);
  }

  function elementDrag(e) {
    distanceUpdate.x = currentPosition.x - e.clientX;
    distanceUpdate.y = currentPosition.y - e.clientY;
    currentPosition.x = e.clientX;
    currentPosition.y = e.clientY;
    element.style.left = (element.offsetLeft - distanceUpdate.x) + "px";
    element.style.top = (element.offsetTop - distanceUpdate.y) + "px";
  }

  function closeDragElement() {
    document.removeEventListener("mousemove", elementDrag);
    document.removeEventListener("mouseup", closeDragElement);
  }
}