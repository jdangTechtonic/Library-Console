function Library() {
  this.bookShelf = new Array();
};

var SingletonLibrary;
(function() {  //self-executing function
  var instance;
  SingletonLibrary = function SingletonLibrary() {
    if(instance) return instance;
    instance.this;

    this.bookShelf = new Array();

    return instance;
  }
}());
//var Singleton = new Object("this is an instance");

// BEGIN unit test for Singleton
// var instance1 = SingletonLibrary;
// instance1.bookShelf = ['title1','author1'];
// var instance2 = SingletonLibrary;
// instance2.bookShelf = ['title2','author2'];
// alert("same instance?"+(instance1===instance2));
// console.log('instance1.bookShelf',instance1.bookShelf);
// console.log('instance2.bookShelf',instance2.bookShelf);
//
// var instance1 = new Library();
// instance1.bookShelf = ['title1','author1'];
// var instance2 = new Library();
// instance2.bookShelf = ['title2','author2'];
// alert("same instance?"+(instance1===instance2));
// console.log('instance1.bookShelf',instance1.bookShelf);
// console.log('instance2.bookShelf',instance2.bookShelf);
// END unit test for Singleton

Library.prototype.robustSearch = function(title, author, numPages, pubDate) {
//this function accepts 1 or more arguments; an empty argument is call with ''
//this function does && search against filter first and if no match is found, items matching filter is
//added to list, i.e. an || search
//each filter is process in this way

    var filteredArr = this.bookShelf;
    if(title) {
      //find title in list of books
      filteredArr = filteredArr.filter(function(item) {return item.title==title;});
    };
    if(author) {
      //find author in list of titles
      var tempArr = filteredArr.filter(function(item) {return item.author==author;});
      //if author found in list of titles, saveLibrary new list with title & author
      if(tempArr.length>0)
        filteredArr = tempArr;
      //if author not found in list of titles, add author to list
      else {
        //tempArr = this.bookShelf.filter(function(item) {return item.author==author;});
        filteredArr = filteredArr.concat(this.bookShelf.filter(function(item) {return item.author==author;}));
      }
    };
    if(numPages) {
      //find numPages in list of titles & authors
      var tempArr = filteredArr.filter(function(item) {return item.numPages==numPages;});
      //if numPages found in list of titles & authors, filter list with numPages
      if(tempArr.length>0)
        filteredArr = tempArr;
      //if author not found in list of titles & authors, add numPages to list
      else
        filteredArr = filteredArr.concat(this.BookShelf.filter(function(item) {return item.numPages==numPages;}));
    };
    if(pubDate) {
      //find pubDate in list of titles & authors & numPages
      var tempArr = filteredArr.filter(function(item) {return item.pubDate==pubDate;});
      //if pubDate found in list, save list
      if(tempArr.length>0)
        filteredArr = tempArr;
      //if pubDate not found in list, add pubDate to list
      else
        filteredArr = filteredArr.concat(this.bookShelf.filter(function(item) {return item.pubDate==pubDate.toString();}));

      //NO NEED FOR item.pubDate.toString() BECAUSE item.pubDate IS ALREADY string
      //get item.pubDate undefined is append toString
      //filteredArr = filteredArr.filter(function(item) {return item.pubDate.toString()==pubDate.toString();});
    };

  return filteredArr;
};

Library.prototype.searchBook = function(title, author, numPages, pubDate) {
  if(title && author=='' && numPages=='' && pubDate=='') {
    var filteredArr = this.bookShelf.filter(function(item) {return item.title == title;});
  };
  if(title && author && numPages=='' && pubDate=='') {
    var filteredArr = this.bookShelf.filter(function(item) {return item.title == title || item.author == author;});
  };
  if(title && author && numPages && pubDate=='') {
    var filteredArr = this.bookShelf.filter(function(item) {return item.title == title || item.author == author || item.numPages == numPages;});
  };
  if(title && author && numPages && pubDate=='') {
    var filteredArr = this.bookShelf.filter(function(item) {return item.title == title || item.author == author || item.numPages == numPages || item.pubDate == pubDate;});
  };
  return filteredArr;
};

Library.prototype.addBook = function (book) {
  //console.log('before add',this.bookShelf);
  if(this.searchBook(book.title,'','','').length) {
    console.log('book already exist.',this.bookShelf);
    return false;
  } else {
    this.bookShelf.push(book);
    console.log('book added.',this.bookShelf);
    return true;
  };
  // if(this.searchBook(book.title)) {
  //   this.bookShelf.push(book);
  //   console.log('added',this.bookShelf);
  // }
  //console.log('after add',this.bookShelf);

};

Library.prototype.removeBookByTitle = function (title) {
  var currentBookShelfLength = this.bookShelf.length;
  //var filteredArr = this.bookShelf.filter(item => item.title != title);  ES6
  var filteredArr = this.bookShelf.filter(function(item) {return item.title != title;});

  if(filteredArr.length == currentBookShelfLength) {
    console.log('No book removed by title.');
    return false;
  } else {
    console.log(title+" was removed.");
    this.bookShelf = filteredArr;
    return true;
  }
};

Library.prototype.removeBookByAuthor = function(author) {
  var currentBookShelfLength = this.bookShelf.length;
  //var filteredArr = this.bookShelf.filter(item => item.author != author);  ES6
  var filteredArr = this.bookShelf.filter(function(item) {return item.author != author;});
  if(filteredArr.length == currentBookShelfLength) {
    console.log('No book removed by author.');
    return false;
  } else {
    console.log("Books by "+author+" was removed.");
    this.bookShelf = filteredArr;
    return true;
  };
};

Library.prototype.getRandomBook = function() {
  if(this.bookShelf.length > 0) {
    var bookIndex = Math.floor((Math.random() * this.bookShelf.length) + 0);
    return this.bookShelf[bookIndex];
  } else {
    return null;
  }
};

Library.prototype.getBookByTitle = function(title) {
  //var filteredArr = this.bookShelf.filter(item => item.title.search(title) >= 0); ES6
  var filteredArr = this.bookShelf.filter(function(item) {return item.title.search(title) >= 0;});
  return filteredArr;
};

Library.prototype.getBookByAuthor = function(authorName) {
  //var filteredArr = this.bookShelf.filter(item => item.author.search(authorName) >= 0); ES6
  var filteredArr = this.bookShelf.filter(function(item) {return item.author.search(authorName) >= 0;});
  return filteredArr;
};

Library.prototype.addBooks = function(books) {
  var count = 0;
  for (i=0; i<books.length; i++)
    if(this.addBook(books[i])) {
      count++;
    };
  return count;

  //context of forEach is different resulting in this.addBook undefined; research how to fix
  // books.forEach(function(item) {
  //   if(this.addBook(item)) count++;
  //   return count;
  // };

};

Library.prototype.getAuthors = function() {
  if(this.bookShelf.length > 0) {
    //pull out all authors from currentBookShelfLength
    var authorList = [];
    for (i=0; i<this.bookShelf.length; i++)
        authorList.push(this.bookShelf[i].author);
    //console.log(authorList);

    var uniqueAuthorArr = [];
    uniqueAuthorArr.push(authorList.pop());
    //console.log(uniqueAuthorArr);
    //console.log('authorList.length',authorList.length);
    for (i=authorList.length-1; i>=0; i--) {
      var found = false;
      //var testName = this.bookShelf[i].author;
      for (j=0; j<uniqueAuthorArr.length; j++) {
        //console.log('authorList[i]',authorList[i],'uniqueAuthorArr[j]',uniqueAuthorArr[j]);
        if (authorList[i] == uniqueAuthorArr[j])
          found = true;
      };
      if (!found)
        uniqueAuthorArr.push(authorList.pop());
    };
    return uniqueAuthorArr;
  };
};

Library.prototype.getRandomAuthorName = function() {
  if(this.bookShelf.length > 0) {
    var bookIndex = Math.floor((Math.random() * this.bookShelf.length) + 0);
    return this.bookShelf[bookIndex].author;
  } else {
    return null;
  }
};

Library.prototype.saveLibrary = function(LibraryInst) {
  // Check browser support
  if (typeof(Storage) !== "undefined") {
      // Store
      localStorage.setItem("Library", JSON.stringify(LibraryInst));
      return "Library saved to Web Storage";
      // Retrieve
      //document.getElementById("result").innerHTML = localStorage.getItem("lastname");
  } else {
      return "Sorry, your browser does not support Web Storage...";
      //document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
  }
};

document.addEventListener("DOMContentLoaded", function(e){
  window.gLibrary = new Library();
});

//begin unit test for addBook
var bookInst = new Book('test','bill',105,new Date("sep 17 2018 3:41:05"));
var LibInst = new Library();
var AnotherLibInst = new Library();
LibInst.addBook(bookInst);
var anotherBook = new Book('test2','bill',950,new Date());
LibInst.addBook(anotherBook);
//end unit test for addBook

//unit test for searchBook
//console.log('unit test for searchBook',LibInst.searchBook('test','bill','',''));

//unit test for removeBookByTitle
//console.log('unit test for removeBookByTitle',LibInst.removeBookByTitle('test'));
//console.log(LibInst.bookShelf);

//unit test for removeBookByAuthor
//console.log('unit test for removeBookByTitle',LibInst.removeBookByAuthor('bill'));
//console.log(LibInst.bookShelf);

//unit test for getRamdomBook
//console.log('unit test for getRamdomBook',LibInst.getRandomBook());

//unit test for getBookByTitle
//console.log(LibInst.getBookByTitle('z'));

//unit test for getBookByAuthor
//console.log(LibInst.getBookByAuthor('z'));

////////////////////////////////////////////////
//unit test for addBooks
//console.log(LibInst.addBooks([{'title:book1','author:joe'},{'title:book2','author:mary'}]));
var book1 = new Book('book1','joe',500,new Date(10000));
var book2 = new Book('book2','amy');
var book3 = new Book('book3','sam');
var bookArr = [];
bookArr[0] = book1;
bookArr[1] = book2;
bookArr[2] = book3;
//console.log(LibInst.addBooks(bookArr));
//console.log(LibInst.bookShelf);
////////////////////////////////////////////////

//unit test for getAuthors
//console.log('unit test for getAuthors',LibInst.getAuthors());

//unit test for getRandomAuthorName
//console.log('unit test for getRandomAuthorName',LibInst.getRandomAuthorName());

//unit test for editBook
//console.log(book1.editBook({title:'new title'}));
//console.log(book1);
//console.log(LibInst.bookShelf);

//unit test for Web Storage
//console.log(LibInst.saveLibrary(LibInst));

//unit test for robustSearch resulting in &&
var testDate = new Date('sep 17 2018 3:41:05');
//console.log('&& unit test for robustSearch->test,bill,105,date',LibInst.robustSearch('test','bill',105,testDate));
//console.log('&& unit test for robustSearch->,bill,950,',LibInst.robustSearch('','bill',950,''));

//unit test for robustSearch resulting in ||
//console.log('|| unit test for robustSearch->book3,bill,,',LibInst.robustSearch('book3','bill','',''));
//anotherTestDate = new Date(10000);
anotherTestDate = new Date();
//console.log(anotherTestDate);
//console.log('|| unit test for robustSearch->,amy,,'+anotherTestDate,LibInst.robustSearch('','amy','',anotherTestDate));
