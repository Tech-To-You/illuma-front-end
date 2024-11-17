// /////////////// input SEARCH
// Verifica se o elemento com o ID existe na página
const inputElement = document.querySelector('#input-busca');

if (inputElement) {
    const inputValue = inputElement.value;

    console.log('Valor do input capturado no content.js:', inputValue);

    // Envia a mensagem ao background.js
    chrome.runtime.sendMessage(
        { action: 'getInputValue', value: inputValue },
        (response) => {
            if (chrome.runtime.lastError) {
                console.error('Erro ao enviar mensagem:', chrome.runtime.lastError);
            } else {
                console.log('Resposta do background.js:', response);
            }
        }
    );
} else {
    console.error('Elemento #input-busca não encontrado no DOM.');
}
// //////////////////////////////////////////////////////////////////////////////

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'insertToList') {
        const userInput = message.value;
        console.log('Inserindo valor na lista', userInput);

        // Selecionar a UL dentro do #my-extension-div
        const listContainer = document.querySelector('#my-extension-div ul');

        if (message.status == 'user') {
            // Inserir o valor como um novo item na lista
            listContainer.insertAdjacentHTML(
                'beforeend',
                `<li>${userInput}</li>`
            );
        } else {
            listContainer.insertAdjacentHTML(
                'beforeend',
                `<li class="gpt">${userInput}</li>`
            );
        }
        // Salvar a mensagem no localStorage
        saveMessageToLocalStorage({
            type: message.status === 'user' ? 'user' : 'gpt',
            text: userInput,
        });
    }
});

/**
 * Salva mensagens no localStorage de forma cumulativa.
 * @param {Object} newMessage - O objeto da mensagem a ser salva (com tipo e texto).
 */
function saveMessageToLocalStorage(newMessage) {
    // Recupera mensagens existentes do localStorage
    let messages = JSON.parse(localStorage.getItem('chatMessages')) || [];

    // Adiciona a nova mensagem ao array
    messages.push(newMessage);

    // Salva o array atualizado no localStorage
    localStorage.setItem('chatMessages', JSON.stringify(messages));

    console.log('Mensagem salva no localStorage:', newMessage);
}