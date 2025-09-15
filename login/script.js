const openRegisterModal = document.getElementById('openRegisterModal');
const closeModal = document.getElementById('closeModal');
const cancelRegister = document.getElementById('cancelRegister');
const modalOverlay = document.getElementById('modalOverlay');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

// Modal Functions
function openModal() {
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModalFunction() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    resetRegisterForm();
}

function resetRegisterForm() {
    registerForm.reset();
}

// Event Listeners
openRegisterModal.addEventListener('click', openModal);
closeModal.addEventListener('click', closeModalFunction);
cancelRegister.addEventListener('click', closeModalFunction);

// Close modal when clicking outside
modalOverlay.addEventListener('click', function(e) {
    if (e.target === modalOverlay) {
        closeModalFunction();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModalFunction();
    }
});

// Login Form Handler
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    
    // Basic validation
    if (!email || !senha) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    
    // Simulate login process
    console.log('Login tentado:', { email, senha });
    alert('Login realizado com sucesso! (simulação)');
    
    // Reset form
    loginForm.reset();
});

// Register Form Handler
registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nome = document.getElementById('regNome').value;
    const email = document.getElementById('regEmail').value;
    const senha = document.getElementById('regSenha').value;
    const confirmarSenha = document.getElementById('regConfirmarSenha').value;
    
    // Basic validation
    if (!nome || !email || !senha || !confirmarSenha) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    
    if (senha !== confirmarSenha) {
        alert('As senhas não coincidem.');
        return;
    }
    
    if (senha.length < 6) {
        alert('A senha deve ter pelo menos 6 caracteres.');
        return;
    }
    
    // Simulate registration process
    console.log('Cadastro realizado:', { nome, email, senha });
    alert('Cadastro realizado com sucesso! (simulação)');
    
    // Close modal and reset form
    closeModalFunction();
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Real-time email validation
document.getElementById('email').addEventListener('blur', function() {
    const email = this.value;
    if (email && !isValidEmail(email)) {
        this.style.borderColor = '#e53e3e';
        this.style.boxShadow = '0 0 0 3px rgba(229, 62, 62, 0.1)';
    } else {
        this.style.borderColor = '#e2e8f0';
        this.style.boxShadow = 'none';
    }
});

document.getElementById('regEmail').addEventListener('blur', function() {
    const email = this.value;
    if (email && !isValidEmail(email)) {
        this.style.borderColor = '#e53e3e';
        this.style.boxShadow = '0 0 0 3px rgba(229, 62, 62, 0.1)';
    } else {
        this.style.borderColor = '#e2e8f0';
        this.style.boxShadow = 'none';
    }
});

// Password confirmation validation
document.getElementById('regConfirmarSenha').addEventListener('input', function() {
    const senha = document.getElementById('regSenha').value;
    const confirmarSenha = this.value;
    
    if (confirmarSenha && senha !== confirmarSenha) {
        this.style.borderColor = '#e53e3e';
        this.style.boxShadow = '0 0 0 3px rgba(229, 62, 62, 0.1)';
    } else {
        this.style.borderColor = '#e2e8f0';
        this.style.boxShadow = 'none';
    }
});

// Add smooth transitions for form inputs
document.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('focus', function() {
        this.style.transform = 'translateY(-1px)';
        this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    });
    
    input.addEventListener('blur', function() {
        this.style.transform = 'translateY(0)';
        if (!this.style.borderColor.includes('229, 62, 62')) {
            this.style.boxShadow = 'none';
        }
    });
});

// Profile photo placeholder click handler
document.querySelector('.profile-photo-placeholder').addEventListener('click', function() {
    // Create a file input element
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                // Here you would typically handle the image upload
                console.log('Imagem selecionada:', file.name);
                alert('Imagem selecionada: ' + file.name + ' (funcionalidade de upload seria implementada aqui)');
            };
            reader.readAsDataURL(file);
        }
    });
    
    fileInput.click();
});

// Google login simulation
document.querySelector('.google-login').addEventListener('click', function() {
    alert('Login com Google seria implementado aqui (simulação)');
});

console.log('MotoHelp - Sistema carregado com sucesso!');

document.addEventListener("DOMContentLoaded", () => {
    const cpfCnpjInput = document.getElementById("cpf_cnpj_editar");

    cpfCnpjInput.addEventListener("input", () => {
        // Remove tudo que não for número
        cpfCnpjInput.value = cpfCnpjInput.value.replace(/\D/g, "");
    });
});
