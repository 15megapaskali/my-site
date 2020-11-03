// const $hamburger = $(".hamburger");
// const $nav = $('#myLinks');
// $hamburger.on("click", function(e) {
//     console.log($hamburger.attr("class"))
//     $hamburger.toggleClass("is-active");
//     if ($nav.css("display", "none")) {
//         $nav.css("display","block");
//     } else {
//         $nav.css("display"," none");
//     }
//
// });

// Look for .hamburger
const hamburger = document.querySelector(".hamburger");
// On click
hamburger.addEventListener("click", function() {
    // Toggle class "is-active"
    hamburger.classList.toggle("is-active");
    // Do something else, like open/close menu
    const x = document.getElementById("myLinks");
    // if (x.style.display === "none") {
    //     x.style.display = "block";
    // } else {
    //     x.style.display = "none";
    // }
    if (hamburger.classList.contains("is-active")) {
        x.style.display = "flex";
    } else {
        x.style.display = "none";
    }
});