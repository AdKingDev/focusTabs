const form = document.getElementById("link-form");
const inputName = document.getElementById("link-name");
const inputUrl = document.getElementById("link-url");
const linksContainer = document.getElementById("links-container");
const searchInput = document.getElementById("search-input");


// Salvar links no navegador
function saveLinks(links) {
    localStorage.setItem("links", JSON.stringify(links));
}

// Carregar links do navegador
function loadLinks() {
    const storedLinks = localStorage.getItem("links");
    return storedLinks ? JSON.parse(storedLinks) : [];
}

// Renderizar lista de links
function renderLinks(linksToRender) {
    linksContainer.innerHTML = "";
    linksToRender.forEach(function(link) {
        const linkItem = document.createElement("div");
        const linkElement = document.createElement("a");
        const deleteBtn = document.createElement("button");

        deleteBtn.textContent = "Excluir";

        linkElement.textContent = link.name;
        linkElement.title = link.url;
        linkElement.href = link.url;
        linkElement.target = "_blank";

        deleteBtn.addEventListener("click", function() {
            const links = loadLinks();
            const updatedLinks = links.filter(function(l) {
                return l.url !== link.url;
            });

            saveLinks(updatedLinks);
            updateView();
        });

        linkItem.appendChild(linkElement);
        linkItem.appendChild(deleteBtn);
        linksContainer.appendChild(linkItem);
    });
}

// Atualiza a tela conforme a busca
function updateView() {
    const searchValue = searchInput.value.toLowerCase();
    const links = loadLinks();

    if (searchValue === "") {
        renderLinks(links);
        return;
    }

    const filteredLinks = links.filter(function(link) {
        return link.name.toLowerCase().includes(searchValue);
    });

    renderLinks(filteredLinks);
}

// Evento de adicionar link
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = inputName.value.trim();
    const url = inputUrl.value.trim();
    const links = loadLinks();

    links.push({
        name: name,
        url: url
    });

    saveLinks(links);
    form.reset();
    updateView();
});

// Evento de busca
searchInput.addEventListener("input", updateView);

// Carrega links ao iniciar
updateView();