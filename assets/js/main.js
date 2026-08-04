(function () {
	"use strict";

	/* Mobile nav toggle */

	/* DEBUG - remove after testing */
	var dbg = document.createElement('div');
	dbg.id = 'nav-debug';
	dbg.style.cssText = 'position:fixed;bottom:0;left:0;right:0;background:#000;color:#0f0;font-size:11px;padding:6px;z-index:9999;font-family:monospace;max-height:100px;overflow-y:auto;';
	dbg.innerHTML = 'Debug ready<br>';
	document.body.appendChild(dbg);
	function dbgLog(msg){ dbg.innerHTML += msg + '<br>'; dbg.scrollTop = dbg.scrollHeight; }

	var toggle = document.querySelector(".nav-toggle");
	var nav = document.querySelector(".main-nav");
	dbgLog('toggle:' + !!toggle + ' nav:' + !!nav + ' w:' + window.innerWidth);
	if(toggle){ 
		var r = toggle.getBoundingClientRect();
		dbgLog('btn pos: t:'+Math.round(r.top)+' l:'+Math.round(r.left)+' w:'+Math.round(r.width)+' h:'+Math.round(r.height));
	}

	var toggle = document.querySelector(".nav-toggle");
	var nav = document.querySelector(".main-nav");
	if (toggle && nav) {
		toggle.addEventListener("click", function (e) {
			e.stopPropagation();
			var open = nav.classList.toggle("is-open");
			toggle.setAttribute("aria-expanded", open ? "true" : "false");
			if(window.dbgLog) dbgLog('CLICK! open:' + open + ' has-is-open:' + nav.classList.contains("is-open"));
		});
		nav.querySelectorAll("a").forEach(function (a) {
			a.addEventListener("click", function () {
				nav.classList.remove("is-open");
				toggle.setAttribute("aria-expanded", "false");
			});
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

	/* Gallery filter (Photography page) */
	var filterBar = document.querySelector(".filter-bar");
	if (filterBar) {
		var buttons = filterBar.querySelectorAll("button");
		var items = document.querySelectorAll("[data-category]");
		buttons.forEach(function (btn) {
			btn.addEventListener("click", function () {
				buttons.forEach(function (b) {
					b.classList.remove("is-active");
				});
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

	/* Pause/play videos on hover for masonry video tiles, autoplay muted on view for hero */
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
