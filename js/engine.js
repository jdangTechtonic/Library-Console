function Library() {
  this.bookShelf = new Array();
};

Library.prototype.addBook = function (book) {

};

Library.prototype.removeBookByTitle = function (title) {

};

document.addEventListener("DOMContentLoaded", function(e){
  window.gLibrary = new Library();
});
