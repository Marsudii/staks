(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = () => matchMedia("(max-width: 768px)").matches;

  /* ---------- Content ---------- */
  const GAME = "https://www.roblox.com/games/87455294086429/peace";
  const COMMUNITY = "https://www.roblox.com/communities/975304744/staks#!/about";
  const IMGS = ["img/peace-1.webp", "img/peace-2.webp"];
  const work = [
    { name: "peace", desc: "An independent space by staks.", tag: "Map", href: GAME, img: IMGS[0], c: ["#9be7ff", "#3a2be2", "#05060d"] },
    { name: "peace — after dark", desc: "Scenes from the community", tag: "Photo", href: GAME, img: IMGS[1], c: ["#ff3b1f", "#ffb199", "#120403"] },
    { name: "Staks Assets", desc: "Ready-to-use Roblox assets", tag: "Assets", c: ["#d6ff5c", "#2b2b2b", "#0d0d0d"] },
    { name: "Frostbyte", desc: "Low-poly 3D weapon pack", tag: "3D", c: ["#cfd8dc", "#455a64", "#0b0f12"] },
    { name: "Skyline Racers", desc: "Launch trailer edit", tag: "Video", c: ["#ffd3e1", "#e2512f", "#1a0d10"] },
    { name: "Mossgrove", desc: "Fantasy RPG overworld", tag: "Map", c: ["#e7d8c9", "#2f6b3a", "#0b120c"] },
    { name: "Pet Rush", desc: "Pets, eggs & trading system", tag: "System", c: ["#fff7d6", "#f2b705", "#141008"] },
    { name: "Game Icons", desc: "Thumbnails & key art", tag: "Photo", c: ["#f6efe6", "#c9b49a", "#191612"] },
  ];
  const services = [
    ["Map design", "#9be7ff", "#3a2be2"], ["Game systems", "#ff3b1f", "#ffb199"], ["Roblox assets", "#d6ff5c", "#2b2b2b"],
    ["3D assets", "#cfd8dc", "#455a64"], ["Video editing", "#ffd3e1", "#e2512f"], ["Photo editing", "#f6efe6", "#c9b49a"],
  ];
  const gallery = [
    ["16 / 9", "#e8dccb", "#3e5c76"], ["16 / 9", "#ff3b1f", "#1a1a1a"], ["16 / 10", "#f2f2ee", "#1f4fd1"], ["4 / 5", "#d6ff5c", "#222"],
    ["1 / 1", "#ffd3e1", "#6b1d2a"], ["4 / 3", "#cfd8dc", "#455a64"], ["3 / 4", "#fff7d6", "#f2b705"], ["16 / 10", "#9be7ff", "#3a2be2"],
  ];
  const socials = ["Community", "Discord", "YouTube", "TikTok", "X", "ArtStation", "Sketchfab", "Behance", "Instagram"];
  const ph = ([c1, c2, c3 = "#0d0d0d"], glyph, img) =>
    `<div class="ph" style="--c1:${c1};--c2:${c2};--c3:${c3}"${glyph ? ` data-glyph="${glyph}"` : ""}${img ? ` data-img="${img}"` : ""}></div>`;

  $("[data-cards]").innerHTML = work.map((w) => `
    <li><a class="case-study" href="${w.href || "#work"}"${w.href ? ' target="_blank" rel="noopener"' : ""}>
      <div class="media">${ph(w.c, w.img ? "" : w.name[0], w.img)}<span class="tag b2">${w.tag}</span></div>
      <div class="text"><h3 class="a1 work-name">${w.name}</h3><p class="b1 work-description">${w.desc}</p></div>
    </a></li>`).join("");

  $("[data-services]").insertAdjacentHTML("beforeend", services.map(([name, c1, c2], i) => `
    <div class="single-service">
      <div class="service-media">${ph([c1, c2])}</div>
      <h2 class="a4 service-name">${name}${i === services.length - 1 ? "<sup>®</sup>" : ""}</h2>
    </div>`).join(""));

  $("[data-gallery]").innerHTML = gallery.map(([ar, c1, c2], i) => `<li style="--ar:${ar}">${ph([c1, c2], "", i < 2 ? IMGS[i] : "")}</li>`).join("");

  $("[data-socials]").innerHTML = socials.map((s, i) => {
    const [, c1, c2] = gallery[i % gallery.length];
    return `<li><a href="${s === "Community" ? COMMUNITY : "#"}"${s === "Community" ? ' target="_blank" rel="noopener"' : ""}>${s}</a><div class="hover-item">${ph([c1, c2], s[0])}</div></li>`;
  }).join("");

  $$(".ph[data-img]").forEach((el) => {
    el.classList.add("has-img");
    el.style.backgroundImage = `url(${el.dataset.img})`;
  });

  // Optional real media: <div class="ph" data-video="clip.mp4">
  const placeServiceMedia = () => {
    const wrap = $("[data-services]");
    $$(".single-service", wrap).forEach((el) => {
      const m = $(".service-media", el);
      const mh = m.offsetHeight;
      const center = el.offsetTop + el.offsetHeight / 2;
      const top = Math.min(Math.max(center - mh / 2, 0), Math.max(wrap.offsetHeight - mh, 0));
      m.style.top = `${top - el.offsetTop}px`;
      m.style.transform = "none";
    });
  };
  addEventListener("resize", placeServiceMedia);
  document.fonts.ready.then(placeServiceMedia);
  placeServiceMedia();

  $$(".ph[data-video]").forEach((el) => {
    el.classList.add("has-video");
    el.innerHTML = `<video src="${el.dataset.video}" muted loop playsinline autoplay></video>`;
  });

  /* ---------- Line splitting + reveal ---------- */
  const splitLines = (el) => {
    el.dataset.text ??= el.textContent.trim().replace(/\s+/g, " ");
    el.innerHTML = el.dataset.text.split(" ").map((w) => `<span class="w">${w}</span>`).join(" ");
    const lines = [];
    let top = null;
    $$(".w", el).forEach((w) => {
      if (w.offsetTop !== top) { lines.push([]); top = w.offsetTop; }
      lines.at(-1).push(w.textContent);
    });
    el.innerHTML = lines.map((l, i) => `<span class="line"><span class="line-inner" style="--i:${i}">${l.join(" ")}</span></span>`).join("");
  };
  const reveals = $$("[data-reveal]");

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("is-in");
      io.unobserve(e.target);
    });
  }, { rootMargin: "0px 0px -5% 0px" });

  /* ---------- Hero word flip ---------- */
  const flip = $(".flip");
  const words = flip.dataset.words.split(",");
  flip.innerHTML = words.map((w) =>
    `<span class="flip-word">${[...w].map((ch, i) => `<span class="ch" style="--c:${i}">${ch}</span>`).join("")}</span>`).join("");
  const flipEls = $$(".flip-word", flip);
  let flipIndex = 0;
  const sizeFlip = () => { flip.style.width = `${flipEls[flipIndex].offsetWidth}px`; };
  flipEls[0].classList.add("is-current");

  const nextWord = () => {
    const cur = flipEls[flipIndex];
    flipIndex = (flipIndex + 1) % flipEls.length;
    const next = flipEls[flipIndex];
    cur.classList.replace("is-current", "is-leaving");
    next.classList.add("is-reset");
    next.classList.remove("is-leaving");
    void next.offsetWidth;
    next.classList.remove("is-reset");
    next.classList.add("is-current");
    sizeFlip();
  };

  /* ---------- Preloader → intro ---------- */
  const preloader = $(".preloader");
  const hero = $(".hero_title .title");
  const start = () => {
    hero.classList.add("is-in");
    reveals.forEach((el) => io.observe(el));
    io.observe($(".video_module"));
    if (!reduced) setInterval(nextWord, 2600);
  };

  document.fonts.ready.then(() => {
    reveals.forEach(splitLines);
    sizeFlip();
    fitFooterMark();
    if (reduced) { preloader.classList.add("is-done"); start(); return; }
    requestAnimationFrame(() => preloader.classList.add("is-logo"));
    setTimeout(() => preloader.classList.add("is-out"), 1100);
    setTimeout(start, 1500);
    setTimeout(() => preloader.classList.add("is-done"), 2200);
  });

  let resizeTimer;
  addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { reveals.forEach(splitLines); sizeFlip(); fitFooterMark(); }, 150);
  });

  /* ---------- Header: hide on scroll down ---------- */
  const header = $(".page-header");
  let lastY = scrollY;
  addEventListener("scroll", () => {
    const y = scrollY;
    if (!document.body.classList.contains("is-locked")) header.classList.toggle("is-hidden", y > lastY && y > 120);
    lastY = y;
  }, { passive: true });

  /* ---------- Mobile menu ---------- */
  const burger = $(".hamburger");
  const dropdown = $(".dropdown-menu");
  const setMenu = (open) => {
    burger.setAttribute("aria-expanded", open);
    dropdown.classList.toggle("is-open", open);
    dropdown.setAttribute("aria-hidden", !open);
    document.body.classList.toggle("is-locked", open);
  };
  burger.addEventListener("click", () => setMenu(burger.getAttribute("aria-expanded") !== "true"));
  $$("a", dropdown).forEach((a) => a.addEventListener("click", () => setMenu(false)));

  /* ---------- Sliders: native scroll + mouse drag + arrows ---------- */
  $$(".slider").forEach((slider) => {
    const key = slider.id.replace("slider-", "");
    const arrows = $$(`[data-slide="${key}"]`);
    const step = () => {
      const items = slider.querySelectorAll(".track > li");
      return items.length > 1 ? items[1].offsetLeft - items[0].offsetLeft : slider.clientWidth;
    };
    const update = () => {
      const max = slider.scrollWidth - slider.clientWidth - 2;
      arrows.forEach((b) => { b.disabled = b.dataset.dir < 0 ? slider.scrollLeft <= 2 : slider.scrollLeft >= max; });
    };
    arrows.forEach((b) => b.addEventListener("click", () => slider.scrollBy({ left: step() * b.dataset.dir, behavior: "smooth" })));
    slider.addEventListener("scroll", update, { passive: true });
    update();

    let down = null;
    slider.addEventListener("pointerdown", (e) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      down = { x: e.clientX, left: slider.scrollLeft, moved: false };
    });
    addEventListener("pointermove", (e) => {
      if (!down) return;
      const dx = e.clientX - down.x;
      if (!down.moved && Math.abs(dx) > 4) { down.moved = true; slider.classList.add("is-dragging"); }
      if (down.moved) slider.scrollLeft = down.left - dx;
    });
    addEventListener("pointerup", () => {
      if (!down) return;
      if (down.moved) {
        // Snap to the nearest slide after a drag
        const s = step();
        const target = Math.round(slider.scrollLeft / s) * s;
        slider.classList.remove("is-dragging");
        slider.scrollTo({ left: target, behavior: "smooth" });
      }
      down = null;
    });
    slider.addEventListener("dragstart", (e) => e.preventDefault());
  });

  /* ---------- Services: active item follows scroll on mobile ---------- */
  const serviceEls = $$(".single-service");
  addEventListener("scroll", () => {
    if (!isMobile()) return;
    const mid = innerHeight / 2;
    let best = null, bestD = Infinity;
    serviceEls.forEach((el) => {
      const r = el.getBoundingClientRect();
      const d = Math.abs(r.top + r.height / 2 - mid);
      if (d < bestD) { bestD = d; best = el; }
    });
    serviceEls.forEach((el) => el.classList.toggle("is-active", el === best && bestD < innerHeight / 3));
  }, { passive: true });

  /* ---------- Custom cursor pill ---------- */
  const cursor = $(".cursor");
  const cursorLabel = $("span", cursor);
  const pos = { x: innerWidth / 2, y: innerHeight / 2 }, cur = { ...pos };
  if (matchMedia("(hover: hover)").matches) {
    addEventListener("pointermove", (e) => { pos.x = e.clientX; pos.y = e.clientY; });
    $$("[data-cursor]").forEach((el) => {
      el.addEventListener("pointerenter", () => {
        if (isMobile()) return;
        cursorLabel.textContent = el.dataset.cursor;
        cursor.classList.add("is-active");
      });
      el.addEventListener("pointerleave", () => cursor.classList.remove("is-active"));
    });
    const loop = () => {
      cur.x += (pos.x - cur.x) * 0.2;
      cur.y += (pos.y - cur.y) * 0.2;
      cursor.style.transform = `translate3d(${cur.x}px, ${cur.y}px, 0)`;
      requestAnimationFrame(loop);
    };
    loop();
  }

  /* ---------- Fullscreen reel (simulated 45s playback) ---------- */
  const fs = $(".fullscreen-video");
  const progress = $(".progress-bar", fs);
  const DURATION = 45000;
  let playing = false, elapsed = 0, lastT = 0;
  const setProgress = () => {
    progress.value = (elapsed / DURATION) * 1000;
    progress.style.setProperty("--p", `${(elapsed / DURATION) * 100}%`);
  };
  const tick = (t) => {
    if (!playing) return;
    elapsed = (elapsed + (t - lastT)) % DURATION;
    lastT = t;
    setProgress();
    requestAnimationFrame(tick);
  };
  const setPlaying = (p) => {
    playing = p;
    fs.classList.toggle("is-playing", p);
    if (p) { lastT = performance.now(); requestAnimationFrame(tick); }
  };
  const openReel = (open) => {
    fs.classList.toggle("is-open", open);
    fs.setAttribute("aria-hidden", !open);
    document.body.classList.toggle("is-locked", open);
    cursor.classList.remove("is-active");
    setPlaying(open);
  };
  $("[data-open-reel]").addEventListener("click", () => openReel(true));
  $(".close-fs", fs).addEventListener("click", () => openReel(false));
  $("[data-play]", fs).addEventListener("click", () => setPlaying(!playing));
  $("[data-mute]", fs).addEventListener("click", (e) => e.currentTarget.classList.toggle("muted"));
  progress.addEventListener("input", () => { elapsed = (progress.value / 1000) * DURATION; setProgress(); });
  addEventListener("keydown", (e) => {
    if (e.key === "Escape") { openReel(false); setMenu(false); }
    if (e.key === " " && fs.classList.contains("is-open")) { e.preventDefault(); setPlaying(!playing); }
  });

  /* ---------- Footer wordmark fills the container width ---------- */
  function fitFooterMark() {
    const mark = $(".footer-mark");
    if (!mark) return;
    const avail = mark.parentElement.clientWidth;
    mark.style.fontSize = "100px";
    mark.style.display = "inline-block";
    const w = mark.offsetWidth;
    mark.style.display = "";
    mark.style.fontSize = `${(100 * avail) / w}px`;
  }
})();
