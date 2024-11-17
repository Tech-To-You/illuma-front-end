// Verifica se o botão já foi adicionado
// if (!document.querySelector('#my-extension-button')) {
//     const button = document.createElement('button');

//     button.addEventListener('click', function () {
//         console.log("click no CONTENT")
//     })

//      // Evento de clique no botão
//     //  button.addEventListener('click', () => {
//     //     console.log('Clique no botão no content.js!');
//     //     chrome.runtime.sendMessage({ action: 'buttonClicked' }, (response) => {
//     //         console.log('Resposta do background.js:', response);
//     //     });
//     // });

// }

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
