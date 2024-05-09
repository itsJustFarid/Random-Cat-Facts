const cataasURL = "https://cataas.com/cat";
const meowFactsURL = "https://meowfacts.herokuapp.com/";

// Load background

$("main .loader").hide(); // This will hiding loading anim

$(".bg")
  .css("background-image", `url(${cataasURL}?position=center)`)
  .waitForImages(
    function () {
      $(".loading-overlay h1, .loader").fadeOut("slow", function () {
        $(".loading-overlay").slideUp(1000);
      });
    },
    $.noop,
    true
  );

// Fetching random facts

function getFacts(count = 1, lang = "eng") {
  $("#getFacts").attr("disabled", true);
  $(".instruction").fadeOut("fast", function () {
    $("main .loader").fadeIn("fast");
  });
  fetch(`${meowFactsURL}?${count}&${lang}`)
    .then((Response) => Response.json())
    .then((Response) => {
      $("#fact").html(Response.data).css("font-size", "1em");
      $("main .loader").fadeOut("fast");
      $("#getFacts").attr("disabled", false);
    });
}

$("#getFacts").click(function () {
  getFacts();
});
