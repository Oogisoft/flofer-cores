/* Mobile navigation toggle — progressive enhancement.
   The page sets <html class="js"> inline (in <head>) so the collapsed mobile
   nav only applies when JavaScript is available. Without JS, the full nav shows. */
(function () {
  "use strict";
  var btn = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (!btn || !nav) return;

  function close() {
    nav.classList.remove("is-open");
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-label", "Open menu");
  }
  function toggle() {
    var open = nav.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  btn.addEventListener("click", toggle);

  // Close after tapping a link.
  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) close();
  });

  // Close on Escape.
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") close();
  });
})();
