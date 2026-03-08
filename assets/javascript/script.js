const form = document.getElementById("link-form");
const inputName = document.getElementById("link-name");
const inputUrl = document.getElementById("link-url");
const linksContainer = document.getElementById("links-container");

/*
    LÓGICA:
    1. Escutar envio do formulário
    2. Impedir recarregamento
    3. Pegar dados digitados
    4. Criar elementos HTML
    5. Configurar o link
    6. Adicionar na página
    7. Limpar formulário
*/
form.addEventListener("submit", function(event){
    event.preventDefault();

    const name = inputName.value;
    const url = inputUrl.value;

    const linkItem = document.createElement("div")
    const linkElement = document.createElement("a");

    linkElement.textContent = name;
    linkElement.href = url;
    linkElement.target = "_blank";

    linkItem.appendChild(linkElement);
    linksContainer.appendChild(linkItem);

    form.reset();
});