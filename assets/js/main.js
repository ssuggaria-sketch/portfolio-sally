(function () {
	"use strict";

	/* Mobile nav toggle - drop down from top */
	var toggle = document.querySelector(".nav-toggle");
	var nav = document.querySelector(".main-nav");
	if (toggle && nav) {
		toggle.addEventListener("click", function () {
			var isOpen = nav.classList.contains("is-open");
			if (isOpen) {
				nav.classList.remove("is-open");
				toggle.setAttribute("aria-expanded", "false");
				toggle.innerHTML = "&#9776;";
			} else {
				nav.classList.add("is-open");
				toggle.setAttribute("aria-expanded", "true");
				toggle.innerHTML = "&times;";
			}
		});
		nav.querySelectorAll("a").forEach(function (a) {
			a.addEventListener("click", function () {
				nav.classList.remove("is-open");
				toggle.setAttribute("aria-expanded", "false");
				toggle.innerHTML = "&#9776;";
			});
		});
		document.addEventListener("click", function (e) {
			if (nav.classList.contains("is-open") &&
				!nav.contains(e.target) &&
				!toggle.contains(e.target)) {
				nav.classList.remove("is-open");
				toggle.setAttribute("aria-expanded", "false");
				toggle.innerHTML = "&#9776;";
			}
		});
	}

	/* Scroll reveal */
	var revealEls = document.querySelectorAll(".reveal");
	if ("IntersectionObserver" in window && revealEls.length) {
		var io = new IntersectionObserver(
			function (entries) {
				entries.forEach(function (entry) {
					if (entry.isIntersecting) {
						entry.target.classList.add("is-visible");
						io.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.12 }
		);
		revealEls.forEach(function (el) {
			io.observe(el);
		});
	} else {
		revealEls.forEach(function (el) {
			el.classList.add("is-visible");
		});
	}

	/* Lightbox for gallery images */
	var lightbox = document.querySelector(".lightbox");
	if (lightbox) {
		var lbImg = lightbox.querySelector("img");
		var lbClose = lightbox.querySelector(".lightbox-close");
		document.querySelectorAll("[data-lightbox]").forEach(function (item) {
			item.addEventListener("click", function () {
				var full = item.getAttribute("data-lightbox");
				lbImg.src = full;
				lbImg.alt = item.querySelector("img") ? item.querySelector("img").alt : "";
				lightbox.classList.add("is-open");
			});
		});
		function closeLb() {
			lightbox.classList.remove("is-open");
			lbImg.src = "";
		}
		if (lbClose) lbClose.addEventListener("click", closeLb);
		lightbox.addEventListener("click", function (e) {
			if (e.target === lightbox) closeLb();
		});
		document.addEventListener("keydown", function (e) {
			if (e.key === "Escape") closeLb();
		});
	}

	/* Gallery filter */
	var filterBar = document.querySelector(".filter-bar");
	if (filterBar) {
		var buttons = filterBar.querySelectorAll("button");
		var items = document.querySelectorAll("[data-category]");
		buttons.forEach(function (btn) {
			btn.addEventListener("click", function () {
				buttons.forEach(function (b) { b.classList.remove("is-active"); });
				btn.classList.add("is-active");
				var filter = btn.getAttribute("data-filter");
				items.forEach(function (item) {
					if (filter === "all" || item.getAttribute("data-category") === filter) {
						item.style.display = "";
					} else {
						item.style.display = "none";
					}
				});
			});
		});
	}

	/* Autoplay videos in view */
	document.querySelectorAll("video[data-autoplay-inview]").forEach(function (vid) {
		if ("IntersectionObserver" in window) {
			var vio = new IntersectionObserver(
				function (entries) {
					entries.forEach(function (entry) {
						if (entry.isIntersecting) {
							vid.play().catch(function () {});
						} else {
							vid.pause();
						}
					});
				},
				{ threshold: 0.4 }
			);
			vio.observe(vid);
		}
	});
})();
