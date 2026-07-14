$(".dark-btn").click(
    function(){
    $("body").toggleClass("dark");
    $(".box").toggleClass("dark");
  });

  $(".spin-btn").click(
    function(){
        $(".box").toggleClass("spin");

  });

  $(".reveal-btn").click(
    function(){
        $(".pizza").addClass("reveal");
        $(".reveal-btn").hide();

        const music = document.getElementById('background-music');
        music.play();
  });

  $(".add-pepperoni-btn").click(function(){
    $(".pepperoni").show(); 
});

$(document).ready(function() {
  $('.reveal-sauce').on('click', function() {
      $('#sauce').toggle(); 
  });
});

$('.cook-cheese-btn').click(function() {
  // Change the cheese image or add a class to animate it
  $('.cheese').addClass('cooked'); // Assuming you have a 'cooked' class defined
  // Optionally play a sound or add any additional effects
});


  $(".draggable").draggable();

  