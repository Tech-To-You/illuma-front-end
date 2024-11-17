// Certifique-se de que o script só será executado após o DOM estar carregado
document.addEventListener('DOMContentLoaded', () => {
  // Botão de fechar
  const closeButton = document.getElementById('close-button');
  if (closeButton) {
      closeButton.addEventListener('click', () => {
          const formContainer = document.getElementById('form-container');
          if (formContainer) {
              formContainer.style.display = 'none';
          }
      });
  }

  // Lógica do formulário de cadastro
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
      registerForm.addEventListener('submit', (event) => {
          event.preventDefault(); // Evita o recarregamento da página

          // Obter os elementos do formulário apenas dentro do listener
          const emailInput = document.getElementById('email');
          const checkInput = document.getElementById('check');

          if (!emailInput || !checkInput) {
              console.error('Campos do formulário não encontrados.');
              return;
          }

          // Garantir que os valores sejam acessados corretamente
          const email = emailInput.value.trim();
          const isChecked = checkInput.checked;

          // Dados do formulário
          const formData = {
              email: email,
              check: isChecked
          };

          console.log('Dados enviados:', formData);

          // Opcional: Limpar o formulário após o envio
          registerForm.reset();
      });
  }
});
