const root = document.querySelector("body, html");
const container = document.querySelector('.gg-container');
const images = document.querySelectorAll(".gg-box > img");
const l = images.length;

for(var i = 0; i < l; i++) {
    images[i].addEventListener("click", function(i) {
        let menu = root.querySelector(".panel.top");
        let sidePole = root.querySelector(".side.pole");
        menu.style.zIndex="0"
        sidePole.style.zIndex="0";
        var currentImg = this;
        const parentItem = currentImg.parentElement, screenItem = document.createElement('div');
        screenItem.id = "gg-screen";
        container.prepend(screenItem);
        if (parentItem.hasAttribute('data-theme')) screenItem.setAttribute("data-theme", "dark");
        var route = currentImg.getAttribute('data-url');
        root.style.overflow = 'hidden';
        screenItem.innerHTML = '<div class="gg-image"></div><div class="gg-close gg-btn">&times</div><div class="gg-next gg-btn">&rarr;</div><div class="gg-prev gg-btn">&larr;</div>';
        const first = images[0].getAttribute('data-url'), last = images[l-1].getAttribute('data-url');
        const imgItem = document.querySelector(".gg-image"), prevBtn = document.querySelector(".gg-prev"), nextBtn = document.querySelector(".gg-next"), close = document.querySelector(".gg-close");
        imgItem.innerHTML = '<img data-url="' + route + '" src="' + route + '">';
        if (l > 1) {
            if (route == first) {
                prevBtn.hidden = true;
                var prevImg = false;
                var nextImg = currentImg.nextElementSibling;
            }
            else if (route == last) {
                nextBtn.hidden = true;
                var nextImg = false;
                var prevImg = currentImg.previousElementSibling;
            }
            else {
                var prevImg = currentImg.previousElementSibling;
                var nextImg = currentImg.nextElementSibling;
            }
        }
        else {
            prevBtn.hidden = true;
            nextBtn.hidden = true;
        }

        screenItem.addEventListener("click", function(e) {
            if (e.target == this || e.target == close) hide();
        });

        root.addEventListener("keydown", function(e) {
            if (e.keyCode == 37 || e.keyCode == 38) prev();
            if (e.keyCode == 39 || e.keyCode == 40) next();
            if (e.keyCode == 27 ) hide();
        });

        prevBtn.addEventListener("click", prev);
        nextBtn.addEventListener("click", next);

        function prev() {
            prevImg = currentImg.previousElementSibling;
            if(!prevImg) {
                return hide()
            }
            let prevImgSrc = prevImg.getAttribute('data-url');
            imgItem.innerHTML = '<img data-url="' + prevImgSrc + '" src="' + prevImgSrc + '">';
            currentImg = currentImg.previousElementSibling;
            var mainImg = document.querySelector(".gg-image > img").getAttribute('data-url');
            nextBtn.hidden = false;
            prevBtn.hidden = mainImg === first;
        };

        function next() {
            nextImg = currentImg.nextElementSibling;
            if(!nextImg) {
                return hide()
            }
            let nextImgSrc = nextImg.getAttribute('data-url');
            imgItem.innerHTML = '<img data-url="' + nextImgSrc + '" src="' + nextImgSrc + '">';
            currentImg = currentImg.nextElementSibling;
            var mainImg = document.querySelector(".gg-image > img").getAttribute('data-url');
            prevBtn.hidden = false;
            nextBtn.hidden = mainImg === last;
        };

        function hide() {
            root.style.overflow = 'auto';
            screenItem.remove();
            sidePole.style.zIndex="100";
            menu.style.zIndex="100";
        };
    });
}

function gridGallery (options) {
    if (options.selector) selector = document.querySelector(options.selector);
    if (options.darkMode) selector.setAttribute("data-theme", "dark");
    if (options.layout == "horizontal" || options.layout == "square") selector.setAttribute("data-layout", options.layout);
    if (options.gaplength) selector.style.setProperty('--gap-length', options.gaplength + 'px');
    if (options.rowHeight) selector.style.setProperty('--row-height', options.rowHeight + 'px');
    if (options.columnWidth) selector.style.setProperty('--column-width', options.columnWidth + 'px');
}