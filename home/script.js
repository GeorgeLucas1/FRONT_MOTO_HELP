document.addEventListener('DOMContentLoaded', () => {
    // --- DADOS (Simulando uma resposta de API/Banco de Dados) ---
    const mockData = [
        {
            id: 1,
            type: 'oficina',
            nome: 'Oficina do George',
            local: 'Manaus, Jorge Teixeira',
            descricao: 'Serviços completos por preços baixos – incluindo trocas!',
            imagem: 'oficina1.jpg',
            contato: {
                telefone: '(92) 92961-8730',
                endereco: 'Rua das Palmeiras, 123 – Bairro Centro, Manaus/AM',
            },
            funcionamento: 'Aberto até 18:00',
            servicos: ['troca de óleo', 'alinhamento', 'suspensão', 'elétrica', 'funilaria'],
            pagamento: ['cartão', 'pix', 'boleto', 'parcelamento'],
        },
        {
            id: 2,
            type: 'oficina',
            nome: 'Oficina do Derek',
            local: 'Manaus, Centro',
            descricao: '👍 Oferecemos serviços completos. Venha conferir!',
            imagem: 'oficina2.jpg',
            contato: {
                telefone: '(92) 99999-9999',
                endereco: 'Av. Central, 456 – Centro, Manaus/AM',
            },
            funcionamento: 'Aberto até 17:00',
            servicos: ['manutenção geral', 'reparos', 'diagnósticos'],
            pagamento: ['cartão', 'pix', 'dinheiro'],
        },
        {
            id: 3,
            type: 'mecanico',
            nome: 'Kennedy, 28 anos',
            local: 'Atendimento Domiciliar',
            descricao: 'Disponível para serviços agora, entre em contato!',
            imagem: 'mecanico1.jpg',
            contato: {
                telefone: '(92) 88888-8888',
                endereco: 'Atendimento domiciliar e em oficinas parceiras',
            },
            funcionamento: 'Disponível agora',
            servicos: ['reparos rápidos', 'manutenção preventiva', 'diagnósticos'],
            pagamento: ['pix', 'dinheiro'],
        },
    ];

    // --- ELEMENTOS DO DOM ---
    const listingsContainer = document.getElementById('listingsContainer');
    const searchInput = document.getElementById('searchInput');
    const filterCheckboxes = document.querySelectorAll('input[name="filter"]');
    const detailsModal = document.getElementById('detailsModal');
    const detailsModalBody = document.getElementById('detailsModalBody');
    const cadastroModal = document.getElementById('modalCadastro');
    const formCadastro = document.getElementById('formCadastro');

    // --- FUNÇÕES ---

    /** Renderiza os anúncios na página */
    const renderListings = (data) => {
        listingsContainer.innerHTML = '';
        if (data.length === 0) {
            listingsContainer.innerHTML = '<p>Nenhum resultado encontrado.</p>';
            return;
        }
        data.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'listing-item';
            itemElement.dataset.id = item.id;
            itemElement.innerHTML = `
                <div class="listing-image">
                    <img src="${item.imagem}" alt="${item.nome}">
                </div>
                <div class="listing-content">
                    <h3 class="listing-title">${item.nome}  
<small>${item.local}</small></h3>
                    <p class="listing-description">"${item.descricao}"</p>
                </div>
            `;
            itemElement.addEventListener('click', () => showDetails(item));
            listingsContainer.appendChild(itemElement);
        });
    };

    /** Mostra o modal de detalhes com as informações do item */
    const showDetails = (item) => {
        detailsModalBody.innerHTML = `
            <div class="business-info">
                <div class="business-image">
                    <img src="${item.imagem}" alt="${item.nome}">
                </div>
                <div class="business-details">
                    <h3>${item.nome}  
<small>${item.local}</small></h3>
                    <div class="services">
                        <p><strong>Serviços:</strong> ${item.servicos.join(', ')}</p>
                        <p><strong>Pagamento:</strong> ${item.pagamento.join(', ')}</p>
                    </div>
                    <div class="contact-info">
                        <p>📞 ${item.contato.telefone} – WhatsApp</p>
                        <p>🕐 ${item.funcionamento}</p>
                        <p>📍 <strong>Endereço:</strong> ${item.contato.endereco}</p>
                    </div>
                </div>
            </div>
        `;
        openModal(detailsModal);
    };

    /** Filtra e busca os anúncios */
    const filterAndSearch = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const activeFilters = [...filterCheckboxes].filter(cb => cb.checked).map(cb => cb.value);

        const filteredData = mockData.filter(item => {
            const matchesFilter = activeFilters.length === 0 || activeFilters.includes(item.type);
            const matchesSearch = item.nome.toLowerCase().includes(searchTerm) ||
                                  item.local.toLowerCase().includes(searchTerm) ||
                                  item.servicos.some(s => s.includes(searchTerm));
            return matchesFilter && matchesSearch;
        });

        renderListings(filteredData);
    };

    /** Abre um modal */
    const openModal = (modalElement) => {
        modalElement.classList.add('show');
        document.body.style.overflow = 'hidden';
    };

    /** Fecha um modal */
    const closeModal = (modalElement) => {
        modalElement.classList.remove('show');
        document.body.style.overflow = 'auto';
    };

    /** Manipula o envio do formulário de cadastro */
    const handleFormSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const submitBtn = form.querySelector('.btn-cadastrar');

        if (!form.checkValidity()) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        submitBtn.textContent = 'Enviando...';

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        console.log("Dados do formulário para enviar à API:", data);

        // Simula uma chamada de API
        setTimeout(() => {
            alert('Cadastro enviado com sucesso! Entraremos em contato em breve.');
            form.reset();
            toggleEmpresaField(false); // Reseta o campo de empresa
            closeModal(cadastroModal);
            
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
            submitBtn.textContent = 'Cadastrar';
        }, 2000);
    };
    
    /** Alterna a visibilidade e obrigatoriedade do campo de nome da empresa */
    const toggleEmpresaField = (show) => {
        const container = document.getElementById('empresaFieldContainer');
        const input = document.getElementById('nome_empresa');
        if (show) {
            container.style.display = 'block';
            input.required = true;
        } else {
            container.style.display = 'none';
            input.required = false;
            input.value = '';
        }
    };

    // --- EVENT LISTENERS ---

    // Pesquisa e Filtros
    searchInput.addEventListener('input', filterAndSearch);
    filterCheckboxes.forEach(cb => cb.addEventListener('change', filterAndSearch));

    // Modais
    document.getElementById('btnAbrirModalCadastro').addEventListener('click', () => openModal(cadastroModal));
    
    document.querySelectorAll('[data-close-modal]').forEach(btn => {
        btn.addEventListener('click', () => {
            const modalToClose = btn.closest('.modal');
            closeModal(modalToClose);
        });
    });

    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            closeModal(event.target);
        }
    });
    
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            const openModalElement = document.querySelector('.modal.show');
            if (openModalElement) {
                closeModal(openModalElement);
            }
        }
    });

    // Formulário de Cadastro
    formCadastro.addEventListener('submit', handleFormSubmit);
    formCadastro.querySelectorAll('input[name="is_empresa"]').forEach(radio => {
        radio.addEventListener('change', (e) => toggleEmpresaField(e.target.value === 'sim'));
    });

    // --- INICIALIZAÇÃO ---
    renderListings(mockData);
});

// --- ELEMENTOS DO DOM ---
// ... (outros elementos)
const cpfCnpjInput = document.getElementById('cpf_cnpj');

// --- FUNÇÕES ---
// ... (outras funções)

/**
 * Formata um campo para aceitar apenas números.
 * @param {Event} event - O evento de input.
 */
const formatToNumericOnly = (event) => {
    const input = event.target;
    // Salva a posição atual do cursor
    const cursorPosition = input.selectionStart;
    // Remove tudo que não for dígito (número)
    const numericValue = input.value.replace(/\D/g, '');
    
    // Atualiza o valor do campo apenas com os números
    input.value = numericValue;

    // Restaura a posição do cursor para não atrapalhar a digitação
    // Isso é importante caso o usuário cole um valor com pontos no meio do texto
    input.setSelectionRange(cursorPosition, cursorPosition);
};


// --- EVENT LISTENERS ---
// ... (outros event listeners)

// Adiciona o formatador em tempo real para o campo CPF/CNPJ
cpfCnpjInput.addEventListener('input', formatToNumericOnly);

// --- INICIALIZAÇÃO ---

document.addEventListener("DOMContentLoaded", () => {
  const meuPerfilBtn = document.getElementById("meuPerfil");
  const modalEditar = document.getElementById("modalEditar");

  // abrir modal de editar ao clicar no ícone do perfil
  meuPerfilBtn.addEventListener("click", (e) => {
    e.preventDefault();
    openModal(modalEditar);
    prefillEditForm();
  });

  // Funções auxiliares
  function openModal(modal) {
    modal.style.display = "flex";
  }
  function closeModal(modal) {
    modal.style.display = "none";
  }

  // fechar com botões [data-close-modal] (funciona para qualquer modal)
  document.querySelectorAll("[data-close-modal]").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.target;
      if (target && document.getElementById(target)) {
        closeModal(document.getElementById(target));
      } else {
        // fecha o modal mais próximo
        const m = btn.closest(".modal");
        if (m) closeModal(m);
      }
    });
  });

  // fechar clicando fora do conteúdo
  window.addEventListener("click", (event) => {
    document.querySelectorAll(".modal").forEach(modal => {
      if (event.target === modal) {
        closeModal(modal);
      }
    });
  });

  // preenche campos com dados do localStorage (se existirem)
  function prefillEditForm() {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    document.getElementById("edit_nome_empresa").value = userData.nome_empresa || "";
    document.getElementById("edit_email").value = userData.email || "";
    document.getElementById("edit_telefone").value = userData.telefone || "";
    document.getElementById("edit_cpf_cnpj").value = userData.cpf_cnpj || "";
    document.getElementById("edit_endereco").value = userData.endereco || "";
    document.getElementById("edit_categoria").value = userData.categoria || "";

    // marcar radio empresa conforme dado
    if (userData.is_empresa === "sim") {
      document.querySelector('#modalEditar input[name="is_empresa"][value="sim"]').checked = true;
      document.getElementById("edit_empresaFieldContainer").style.display = "block";
    } else {
      document.querySelector('#modalEditar input[name="is_empresa"][value="nao"]').checked = true;
      document.getElementById("edit_empresaFieldContainer").style.display = "none";
    }
  }

  // toggle do campo Nome da Empresa dentro do modal editar
  document.querySelectorAll('#modalEditar input[name="is_empresa"]').forEach(radio => {
    radio.addEventListener("change", (ev) => {
      const isSim = ev.target.value === "sim";
      const container = document.getElementById("edit_empresaFieldContainer");
      container.style.display = isSim ? "block" : "none";
      if (!isSim) document.getElementById("edit_nome_empresa").value = "";
    });
  });

  // salvar alterações (simulado -> armazena em localStorage)
  document.getElementById("formEditar").addEventListener("submit", (e) => {
    e.preventDefault();
    const data = {
      is_empresa: document.querySelector('#modalEditar input[name="is_empresa"]:checked')?.value || "nao",
      nome_empresa: document.getElementById("edit_nome_empresa").value.trim(),
      email: document.getElementById("edit_email").value.trim(),
      telefone: document.getElementById("edit_telefone").value.trim(),
      cpf_cnpj: document.getElementById("edit_cpf_cnpj").value.trim(),
      endereco: document.getElementById("edit_endereco").value.trim(),
      categoria: document.getElementById("edit_categoria").value
    };

    // validação simples
    if (!data.email || !data.telefone || !data.cpf_cnpj || !data.endereco || !data.categoria) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    localStorage.setItem("userData", JSON.stringify(data));
    alert("Dados salvos com sucesso!");
    closeModal(modalEditar);
  });

  // excluir conta (simulação)
  document.getElementById("excluirContaLink").addEventListener("click", (e) => {
    e.preventDefault();
    if (confirm("Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.")) {
      localStorage.removeItem("userData");
      alert("Conta excluída.");
      closeModal(modalEditar);
      // aqui você pode redirecionar ou chamar API para exclusão real
    }
  });
});
