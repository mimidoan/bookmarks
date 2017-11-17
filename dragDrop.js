function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.prevententDefault();
    var data = event.dataTransfer.getData("text");
    eventent.target.appendChild(document.getElementById(data));
}

// 
// module.exports = {
//   allowDrop: allowDrop,
//   drag: drag,
//   drop: drop
// };
