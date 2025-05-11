
const cloudName = "883841328745521"; // Cloudinary cloud name
const uploadPreset = "freefire_upload"; // Upload preset

const form = document.getElementById("upload-form");
const gallery = document.getElementById("gallery");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("player-name").value;
  const fileInput = document.getElementById("shot-file");
  const description = document.getElementById("description").value;

  const file = fileInput.files[0];

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      const url = data.secure_url;
      const container = document.createElement("div");
      container.classList.add("shot");

      const title = document.createElement("h3");
      title.textContent = name;

      const desc = document.createElement("p");
      desc.textContent = description;

      let media;
      if (file.type.startsWith("image/")) {
        media = document.createElement("img");
        media.src = url;
      } else if (file.type.startsWith("video/")) {
        media = document.createElement("video");
        media.src = url;
        media.controls = true;
      }

      container.appendChild(title);
      container.appendChild(media);
      container.appendChild(desc);
      gallery.prepend(container);

      form.reset();
    })
    .catch((err) => console.error("Upload error:", err));
});
