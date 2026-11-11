// 1. Fade cards in as you scroll down the story
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// 2. "Tried it" buttons on the experiment cards (remembered in your browser)
function load(id) {
  try { return localStorage.getItem(id) === "done"; } catch (e) { return false; }
}
function save(id, done) {
  try { localStorage.setItem(id, done ? "done" : ""); } catch (e) {}
}

document.querySelectorAll(".experiment").forEach((card) => {
  const id = card.dataset.id;
  const btn = card.querySelector(".try-btn");

  const update = (done) => {
    card.classList.toggle("done", done);
    btn.textContent = done ? "☑ tried it! ✨" : "☐ tried it";
  };

  update(load(id));

  btn.addEventListener("click", () => {
    const done = !card.classList.contains("done");
    update(done);
    save(id, done);
  });
});
