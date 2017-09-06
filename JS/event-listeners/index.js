//strat 1
const onButtonClick = function() {
  console.log('button 1 was clicked');
};

//strat 2
const button2 = document.querySelector('.button2');
button2.onclick = function() {
  console.log('button 2 was clicked', event);
};

//start 3
const button3 = document.querySelector('.button3');
button3.addEventListener('click', function(event){
  console.log('button 3 was clicked', event);
});