const form = document.getElementById("link-form");
const inputName = document.getElementById("link-name");
const inputUrl = document.getElementById("link-url");
const linksContainer = document.getElementById("links-container");

// Transforma objeto em texto para armazenar
function saveLinks(links) {
    localStorage.setItem("links", JSON.stringify(links));
}

// Transforma texto em objeto novamente
function loadLinks() {
    const storedLinks = localStorage.getItem("links");

    if (storedLinks) {
        return JSON.parse(storedLinks);
    }

    return [];
}

function renderLinks() {
    linksContainer.innerHTML = "";

    const links = loadLinks();

    links.forEach(function(link) {
        const linkItem = document.createElement("div");
        const linkElement = document.createElement("a");

        linkElement.textContent = link.name;
        linkElement.href = link.url;
        linkElement.target = "_blank";

        linkItem.appendChild(linkElement);

        linksContainer.appendChild(linkItem);
    });
}

form.addEventListener("submit", function(event){
    event.preventDefault();

    const name = inputName.value;
    const url = inputUrl.value;

    const links = loadLinks();

    links.push({
        name: name,
        url: url
    });

    saveLinks(links);

    renderLinks();

    form.reset();
});

renderLinks();