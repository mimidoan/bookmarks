// function allowDrop(ev) {
//     ev.preventDefault();
// }
//
// function drag(ev) {
//     ev.dataTransfer.setData("text", ev.target.id);
// }

// function drop(ev) {
//     ev.preventDefault();
//     var data = ev.dataTransfer.getData("text");
//     ev.target.appendChild(document.getElementById(data));
// }

document.addEventListener("DOMContentLoaded", main);

// function main() {
  const dropbox = document.querySelector('#dropZone');
  dropbox.addEventListener('drop', drop, false);


// }

function drop(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    var imageUrl = evt.dataTransfer.getData('URL');
    alert(imageUrl);
}


//
// module.exports = {
//   allowDrop: allowDrop,
//   drag: drag,
//   drop: drop
// };
