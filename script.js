let posts = JSON.parse(localStorage.getItem("teslaPosts")) || [];

function savePosts() {
  localStorage.setItem("teslaPosts", JSON.stringify(posts));
}

function addPost() {
  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("contentInput").value.trim();
  const category = document.getElementById("category").value;
  const imageFile = document.getElementById("imageInput").files[0];
  const xLink = document.getElementById("xLinkInput").value.trim();

  if (!title || !content) {
    alert("Fill in title and content.");
    return;
  }

  if (imageFile) {
    const reader = new FileReader();
    reader.onload = function(e) {
      createPost(title, content, category, e.target.result, xLink);
    };
    reader.readAsDataURL(imageFile);
  } else {
    createPost(title, content, category, null, xLink);
  }
}

function createPost(title, content, category, image, xLink) {
  const post = {
    id: Date.now(),
    title,
    content,
    category,
    image,
    xLink,
    date: new Date().toLocaleDateString()
  };

  posts.unshift(post);
  savePosts();
  alert("Article Published!");

  document.getElementById("title").value = "";
  document.getElementById("contentInput").value = "";
  document.getElementById("imageInput").value = "";
  document.getElementById("xLinkInput").value = "";
}

function displayPosts() {
  const container = document.getElementById("posts");
  if (!container) return;

  const page = document.body.getAttribute("data-page");

  container.innerHTML = "";

  posts
    .filter(post => post.category === page)
    .forEach(post => {
      const div = document.createElement("div");
      div.className = "article-card";

      div.innerHTML = `
        ${post.image ? `<img src="${post.image}">` : ""}
        <h2>${post.title}</h2>
        <small>${post.date}</small>
        <p>${post.content}</p>
        ${post.xLink ? `<p><a href="${post.xLink}" target="_blank">View X Post</a></p>` : ""}
      `;

      container.appendChild(div);
    });
}

function setHeroImage() {
  const hero = document.getElementById("heroImage");
  if (!hero) return;

  const page = document.body.getAttribute("data-page");

  const images = {
    news: "https://images.unsplash.com/photo-1631864512667-d611c2834e6c?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fHRlc2xhJTIwZ2lnYWZhY3Rvcnl8ZW58MHx8MHx8fDA%3D",
    cybertruck: "https://images.unsplash.com/photo-1724185278052-d611a92b9b97?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGN5YmVydHJ1Y2t8ZW58MHx8MHx8fDA%3D",
    modely: "https://images.unsplash.com/photo-1561580125-028ee3bd62eb?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dGVzbGElMjBtb2RlbCUyMHl8ZW58MHx8MHx8fDA%3D",
    energy: "https://images.unsplash.com/photo-1572375180666-c23ef8bef639?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVzbGElMjBlbmVyZ3l8ZW58MHx8MHx8fDA%3D",
    autonomy: "https://images.unsplash.com/photo-1733073277634-845a03a23f34?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y3liZXJjYWJ8ZW58MHx8MHx8fDA%3D"
  };

  hero.src = images[page];
}

displayPosts();
setHeroImage();
// NAVBAR SCROLL EFFECT
window.addEventListener("scroll", function() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});
// FADE-IN ARTICLES ON SCROLL
function revealOnScroll() {
  const cards = document.querySelectorAll(".article-card");

  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      card.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);