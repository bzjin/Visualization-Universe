var content = document.querySelector('#content');
var p = document.querySelector('#page'); // current page indicator

page.base('/');

page('/charts', function(){
      p.textContent = '<h1>' + pngstring + "</h1>";
    });

page('/tools', function(){
      p.textContent = '<h1>' + pngstring + "</h1>";
    });

page('/books', function(){
      p.textContent = '<h1>' + pngstring + "</h1>";
    });

