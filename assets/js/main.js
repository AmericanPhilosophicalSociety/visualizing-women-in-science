window.addEventListener('load', (event) => {
  console.log("Page loaded.");
});

function showOrHide() {
    const visibility = document.getElementById("showthis").style.visibility;
    if (visibility == "hidden") {
        document.getElementById("showthis").style.visibility = "visible";
        document.getElementById("bio-image").style.filter = "brightness(30%)"
    } else {
        document.getElementById("showthis").style.visibility = "hidden";
        document.getElementById("bio-image").style.filter = "brightness(100%)"
    }
}
