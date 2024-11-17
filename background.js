// Verifica se a URL é válida para injeção
const isValidUrl = (url) => {
    return url && !url.startsWith('chrome://') && !url.startsWith('about:');
};

// Injeta uma função ou estilo em uma aba válida
const injectResource = (tabId, func) => {
    chrome.tabs.get(tabId, (tab) => {
        if (isValidUrl(tab.url)) {
            chrome.scripting.executeScript({
                target: { tabId },
                function: func,
            });
        } else {
            console.warn(`Injeção ignorada para URL: ${tab.url}`);
        }
    });
};

// Função para injetar o arquivo CSS na página
const injectStyles = () => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = chrome.runtime.getURL('styles/index.css');
    document.head.appendChild(link);
    // console.log('Estilos injetados com sucesso.');
};





// Função para criar e gerenciar a visibilidade de uma div
const toggleDiv = () => {
    let existingDiv = document.querySelector('#my-extension-div');

    if (!existingDiv) {
        // Criar a div se ainda não existir
        existingDiv = document.createElement('div');
        existingDiv.id = 'my-extension-div';
        existingDiv.className = 'divChatbot'; // Adiciona a classe CSS

        // Cabeçalho da div
        const headerDiv = document.createElement('div');
        headerDiv.className = 'headerDiv';

        const headerText = document.createElement('h3');
        headerText.textContent = 'Assistente virtual';

        const closeButton = document.createElement('img');
        closeButton.src = chrome.runtime.getURL('assets/close-chatbot.svg');
        closeButton.alt = 'Fechar';
        closeButton.className = 'icon';
        closeButton.width = 11;
        closeButton.height = 11;

        closeButton.addEventListener('click', () => {
            existingDiv.style.display = 'none'; // Esconde a div
        });

        headerDiv.appendChild(headerText);
        headerDiv.appendChild(closeButton);

        // Conteúdo do artigo
        const article = document.createElement('article');

        // Input para interação
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.required = true;

        // Montar a div principal
        existingDiv.appendChild(headerDiv);
        existingDiv.appendChild(article);
        existingDiv.appendChild(inputField);
        document.body.appendChild(existingDiv);

        // console.log("Div criada com classe .divChatbot");
    } else {
        // Alternar visibilidade se a div já existir
        existingDiv.style.display = existingDiv.style.display === 'none' ? 'block' : 'none';
    }
};


const addPersistentButton = () => {
    if (document.querySelector('#my-extension-button')) return;
    let existingDiv = document.querySelector('#my-extension-div');

    const button = document.createElement('button');
    button.id = 'my-extension-button';
    button.className = 'fixed';

    const img = document.createElement('img');
    img.src = chrome.runtime.getURL('assets/btn-fixed.svg');
    img.alt = 'Botão Fixo';

    button.appendChild(img);
    // console.log('Botão fixo criado.');
    document.body.appendChild(button);
    button.addEventListener('click', function () {
        console.log("click no BACKGROUND")
        existingDiv.style.display = 'flex';
    })
};

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.action === 'buttonClicked') {
//         console.log('Mensagem recebida do botão fixo!');
//         sendResponse({ status: 'success' });
//     }
// });




// Função para adicionar a seção de recomendações
const addRecommendationsToDiv = () => {
    const targetDiv = document.querySelector('.col-md-12.col-sm-12');
    if (targetDiv) {
        targetDiv.insertAdjacentHTML('beforeend', `
            <div class="recMD">
                <h4>Recomendações</h4>
                <img src="${chrome.runtime.getURL('assets/star-recomend.svg')}" 
                     class="icon" 
                     height="10px" 
                     width="10px" 
                     alt="Fechar">
            </div>
        `);
        // console.log('Elemento com classe "recMD" inserido com sucesso.');
    } else {
        console.error('Elemento <div class="col-md-12 col-sm-12"> não encontrado.');
    }
};



// Função para adicionar a ul após a div .recMD
const addUlAfterRecMD = () => {
    const recMDElement = document.querySelector('.recMD');
    if (recMDElement) {
        recMDElement.insertAdjacentHTML('afterend', `
            <ul class="recomendsEextension">
                <li>
                    <h5>Autores: Oleg Gaidai, Fang Wang, Vladimir Yakimov </h5>
                    <p>O artigo aborda a disseminação global do coronavírus (SARS-CoV-2), seus impactos na saúde pública e economia. Discute avanços em vacinas, tratamentos e medidas de contenção, além de enfatizar a importância da cooperação internacional no combate à pandemia.</p>
                    <h6>Publicado em 2024 - Editora 123</h6>
                    <a href="#" target="_blank">
                        <img src="${chrome.runtime.getURL('assets/acess-link-icon.svg')}" 
                             class="icon" 
                             height="10px" 
                             width="10px" 
                             alt="Fechar">
                        Acessar
                    </a>
                </li>
                    <li>
                    <h5>Autores: Oleg Gaidai, Fang Wang, Vladimir Yakimov </h5>
                    <p>O artigo aborda a disseminação global do coronavírus (SARS-CoV-2), seus impactos na saúde pública e economia. Discute avanços em vacinas, tratamentos e medidas de contenção, além de enfatizar a importância da cooperação internacional no combate à pandemia.</p>
                    <h6>Publicado em 2024 - Editora 123</h6>
                    <a href="#" target="_blank">
                        <img src="${chrome.runtime.getURL('assets/acess-link-icon.svg')}" 
                             class="icon" 
                             height="10px" 
                             width="10px" 
                             alt="Fechar">
                        Acessar
                    </a>
                </li>
                    <li>
                    <h5>Autores: Oleg Gaidai, Fang Wang, Vladimir Yakimov </h5>
                    <p>O artigo aborda a disseminação global do coronavírus (SARS-CoV-2), seus impactos na saúde pública e economia. Discute avanços em vacinas, tratamentos e medidas de contenção, além de enfatizar a importância da cooperação internacional no combate à pandemia.</p>
                    <h6>Publicado em 2024 - Editora 123</h6>
                    <a href="#" target="_blank">
                        <img src="${chrome.runtime.getURL('assets/acess-link-icon.svg')}" 
                             class="icon" 
                             height="10px" 
                             width="10px" 
                             alt="Fechar">
                        Acessar
                    </a>
                </li>
                    <li>
                    <h5>Autores: Oleg Gaidai, Fang Wang, Vladimir Yakimov </h5>
                    <p>O artigo aborda a disseminação global do coronavírus (SARS-CoV-2), seus impactos na saúde pública e economia. Discute avanços em vacinas, tratamentos e medidas de contenção, além de enfatizar a importância da cooperação internacional no combate à pandemia.</p>
                    <h6>Publicado em 2024 - Editora 123</h6>
                    <a href="#" target="_blank">
                        <img src="${chrome.runtime.getURL('assets/acess-link-icon.svg')}" 
                             class="icon" 
                             height="10px" 
                             width="10px" 
                             alt="Fechar">
                        Acessar
                    </a>
                </li>
                <li>
                    <h5>Autores: Oleg Gaidai, Fang Wang, Vladimir Yakimov </h5>
                    <p>O artigo aborda a disseminação global do coronavírus (SARS-CoV-2), seus impactos na saúde pública e economia. Discute avanços em vacinas, tratamentos e medidas de contenção, além de enfatizar a importância da cooperação internacional no combate à pandemia.</p>
                    <h6>Publicado em 2024 - Editora 123</h6>
                    <a href="#" target="_blank">
                        <img src="${chrome.runtime.getURL('assets/acess-link-icon.svg')}" 
                             class="icon" 
                             height="10px" 
                             width="10px" 
                             alt="Fechar">
                        Acessar
                    </a>
                </li>
            </ul>
        `);

        // Habilita o drag-scroll
        const scrollContainer = document.querySelector('.recomendsEextension');
        if (!scrollContainer) {
            console.error('Elemento <ul class="recomendsEextension"> não encontrado.');
            return;
        }

        let isDragging = false;
        let startX;
        let scrollLeft;

        // Quando o botão do mouse é pressionado
        scrollContainer.addEventListener('mousedown', (e) => {
            isDragging = true;
            scrollContainer.classList.add('dragging');
            startX = e.pageX - scrollContainer.offsetLeft;
            scrollLeft = scrollContainer.scrollLeft;
        });

        // Quando o mouse é movido
        scrollContainer.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - scrollContainer.offsetLeft;
            const walk = (x - startX) * 2; // Multiplicador ajusta a velocidade do scroll
            scrollContainer.scrollLeft = scrollLeft - walk;
        });

        // Quando o botão do mouse é solto
        scrollContainer.addEventListener('mouseup', () => {
            isDragging = false;
            scrollContainer.classList.remove('dragging');
        });

        // Quando o mouse sai da área
        scrollContainer.addEventListener('mouseleave', () => {
            isDragging = false;
            scrollContainer.classList.remove('dragging');
        });

        // console.log('Drag-scroll habilitado na <ul class="recomendsEextension">.');

        // console.log('<ul class="testttt"> adicionada após .recMD com sucesso.');
    } else {
        console.error('Elemento <div class="recMD"> não encontrado para adicionar a <ul>.');
    }
};



// Injeta os scripts e estilos ao atualizar abas
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
    if (changeInfo.status === 'complete') {
        injectResource(tabId, injectStyles); // Injeta o CSS
        injectResource(tabId, toggleDiv); // Injeção da função para a div
        injectResource(tabId, addPersistentButton); // Botão fixo

        injectResource(tabId, addRecommendationsToDiv); // Adiciona a div recMD
        injectResource(tabId, addUlAfterRecMD); // Adiciona a ul após a div recMD


    }
});

// Injeta os scripts e estilos na aba ativa ao iniciar
chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    if (tab && isValidUrl(tab.url)) {
        injectResource(tab.id, injectStyles); // Injeta o CSS
        injectResource(tab.id, toggleDiv); // Injeção inicial
        injectResource(tab.id, addPersistentButton); // Botão fixo

        injectResource(tab.id, addRecommendationsToDiv); // Adiciona a div recMD
        injectResource(tab.id, addUlAfterRecMD); // Adiciona a ul após a div recMD


    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'getInputValue') {
        console.log('Mensagem recebida do content.js:', message);

        // Responde ao content.js com o valor recebido
        sendResponse({ status: 'success', receivedValue: message.value });
    }
});





// /////////////////////////////////////////////////////////////////////////////////////



// /////////////////////////////////////////////////////////////////////////////////////


// // Função para carregar o data.js dinamicamente
// const loadData = async () => {
//     const dataUrl = chrome.runtime.getURL('data.js');
//     const module = await import(dataUrl);
//     return module.insertedValues;
// };

// // Função para renderizar os valores da lista na UL
// const renderRecommendations = async () => {
//     const data = await loadData();

//     const ulElement = document.querySelector('.recomends-extension');
//     if (!ulElement) {
//         console.error('Elemento <ul class="recomends-extension"> não encontrado.');
//         return;
//     }

//     data.forEach((element) => {
//         ulElement.insertAdjacentHTML('beforeend', `
//             <li>
//                 <h5>Autores: ${element.name}</h5>
//                 <p>${element.description}</p>
//                 <h6>Publicado em: ${element.publish}</h6>
//                 <a href="${element.html_url}" target="_blank">
//                     <img src="${chrome.runtime.getURL('assets/acess-link-icon.svg')}"
//                          class="icon"
//                          height="10px"
//                          width="10px"
//                          alt="Acessar">
//                     Acessar
//                 </a>
//             </li>
//         `);
//     });

//     console.log('Recomendações renderizadas com sucesso.');
// };

// // Listener para injetar a lista de recomendações ao atualizar abas
// chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
//     if (changeInfo.status === 'complete') {
//         injectResource(tabId, renderRecommendations); // Renderiza a lista na UL
//     }
// });

// // Injeta as recomendações na aba ativa ao iniciar
// chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
//     if (tab && isValidUrl(tab.url)) {
//         injectResource(tab.id, renderRecommendations); // Renderiza a lista na UL
//     }
// });
