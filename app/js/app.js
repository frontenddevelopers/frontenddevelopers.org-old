(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-58222334-1', 'auto');
ga('send', 'pageview');

var anchors = document.getElementsByTagName('a');

for (var i = 0; i < anchors.length; i++) {
	anchors[i].addEventListener("click", function() {
		ga('send', 'event', 'action', 'click', this.className);
	});
}

var modal = document.querySelector('.js--modal');
var modalOpen = document.querySelector('.js--modal-open');
var modalClose = document.querySelector('.js--modal-close');

console.log(modal);
console.log(modalOpen);
console.log(modalClose);

var openModal = function () {
  modal.className += " modal--open";
}

var closeModal = function () {
  modal.className = modal.className.replace( /(?:^|\s)modal--open(?!\S)/g , '' )
}

modalOpen.addEventListener("click", function() {
  openModal();
});

modalClose.addEventListener("click", function() {
  closeModal();
});
