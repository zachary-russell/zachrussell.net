document.addEventListener( 'DOMContentLoaded', function() {
  var elems = document.querySelectorAll( '.sidenav' );
  var instances = M.Sidenav.init( elems );
} );

var form = document.getElementById( 'contactForm' );
if ( form ) {
  form.addEventListener( 'submit', function( event ) {
    event.preventDefault();

    sendData();
  } );
}

function sendData() {
  var formBody = {};
  var FD = new FormData( form );
  let parameters = [ ...FD.entries() ] // expand the elements from the .entries() iterator into an actual array
    .map( e => encodeURIComponent( e[0] ) + '=' + encodeURIComponent( e[1] ) ); // transform the elements into encoded key-value-pairs
  var encodedData = parameters.join( '&' );
  console.log( encodedData );

  fetch(
    'https://us-central1-zachs-personal-automation.cloudfunctions.net/contactForm',
    {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'no-cors', // no-cors, cors, *same-origin
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'

        //'Content-Type': 'application/json'
      },
      body: encodedData // body data type must match "Content-Type" header
    }
  ).then( data => {
    if ( data ) {
      redirect: window.location.replace( '/thank-you' );
    } else {
      alert( 'ERROR' );
    }
  } );
}

// Navbar Animation
window.onscroll = function changeNav() {
  var scrollPosY = window.pageYOffset | document.body.scrollTop;

  var navBar = document.getElementById( 'navBar' );
  if ( 70 < scrollPosY && 200 > scrollPosY ) {
    navBar.className = 'navbar-stick';
  } else if ( 200 < scrollPosY ) {
    navBar.className = 'navbar-stick show';
  } else if ( 200 >= scrollPosY ) {
    navBar.className = 'navbar';
  }
};
