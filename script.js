//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const errorDiv = document.getElementById("error");
const loadingDiv = document.getElementById("loading");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;

    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image at ${url}`));
  });
}

function downloadImages() {
  output.innerHTML = "";
  errorDiv.textContent = "";
  loadingDiv.style.display = "block";

  const imagePromises = images.map(img => downloadImage(img.url));

  Promise.all(imagePromises)
    .then(imgElements => {
      imgElements.forEach(img => output.appendChild(img));
    })
    .catch(err => {
      errorDiv.textContent = err.message;
    })
    .finally(() => {
      loadingDiv.style.display = "none";
    });
}

btn.addEventListener("click", downloadImages);
