const camposDoFormulario = document.querySelectorAll('[required]');
const formulario = document.querySelector("[data-formulario]");

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const listaRespostas = {
        "nome": e.target.elements["nome"].value,
        "email": e.target.elements["email"].value,
        "comment": e.target.elements["comment"].value,
    }

    localStorage.setItem("cadastro", JSON.stringify(listaRespostas));

    excluiForm();
    MensagemExito();   
})

camposDoFormulario.forEach((campo) => {
    campo.addEventListener("blur", () => verificaCampo(campo));
    campo.addEventListener("invalid",  () => verificaCampo(campo), evento => evento.preventDefault())
})

const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort'
]

const mensagens = {
    nome: {
        valueMissing: "O campo não pode estar vazio.",
        patternMismatch: "Preencha um nome valido",
        tooShort: "Nome muito curto"
    },
    email: {
        valueMissing: "O campo não pode estar vazio",
        typeMismatch: "Preencha um email valido",
        tooShort: "Email muito curto"
    },
    comment: {
        valueMissing: "O campo não pode estar vazio",
        tooShort: "texto muito curto",
        patternMismatch: "Preencha um texto valido"
    }   
}

function MensagemExito() {
    var element = document.getElementById('msg');
    element.innerHTML = `
    <div class="msg fundo Tabela">
        <i id="msg__I" class="lni lni-thumbs-up"></i><strong id="msg__Ti">comment sent successfully!</strong></p>
    </div>`;
}


function excluiForm() {
    const element = document.getElementById("form");
    element.remove();
}


function verificaCampo(campo) {
    let mensagem = "";

    tiposDeErro.forEach(erro => {
        if (campo.validity[erro]) {
            mensagem = mensagens[campo.name][erro];
            console.log(mensagem);
        }
    })
    const mensagemErro = campo.parentNode.querySelector('.mensagem-erro');
    const validadorDeInput = campo.checkValidity();

    if (!validadorDeInput) {
        mensagemErro.textContent = mensagem;
    } else {
        mensagemErro.textContent = "";
    }

}


