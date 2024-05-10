const cataasURL = "https://cataas.com/cat";
const meowFactsURL = "https://meowfacts.herokuapp.com/";

// Dialog

function dialogTemplateHTML(dialogTitle, dialogMessage) {
  return `<div class="dialog-overlay">
  <div class="dialog">
  <h1>${dialogTitle}</h1>
    <p>${dialogMessage}</p>
    <button class="btn-primary" id="dialogOk">OK</button>
  </div>
</div>`;
}

function showDialog(t, m) {
  $(".container").prepend(dialogTemplateHTML(t, m));
  $("#dialogOk").click(function () {
    hideLoading();
    $("#dialogOk")
      .parents(".dialog-overlay")
      .fadeOut(function () {
        $("#dialogOk").parents(".dialog-overlay").remove();
      });
  });
}

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
  return fetch(`${meowFactsURL}?${count}&${lang}`)
    .then((Response) => {
      if (!Response.ok) {
        throw new Error(Response);
      }
      return Response.json();
    })
    .catch((error) => {
      throw error;
    });
}

function updateFact(data) {
  $("#fact").html(data.data).css("font-size", "1em");
  hideLoading();
}

$("#getFacts").click(async function () {
  showLoading();
  try {
    const fact = await getFacts();
    updateFact(fact);
  } catch (err) {
    showDialog(err.name, err.message);
  }
});

// Display or hide the loader  when trying to fetching the url

function showLoading() {
  $("#getFacts").attr("disabled", true);
  $(".instruction").fadeOut("fast", function () {
    $("main .loader").fadeIn("fast");
  });
}

function hideLoading() {
  $("main .loader").fadeOut("fast");
  $("#getFacts").attr("disabled", false);
}
