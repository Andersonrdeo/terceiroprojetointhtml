
function mostrarPagina(pagina) {
    document.querySelectorAll("section").forEach(sec => sec.style.display = "none");
    document.getElementById(pagina).style.display = "block";
}


document.getElementById("formCadastro").onsubmit = async function (e) {
    e.preventDefault();


    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const esportes = Array.from(document.getElementById("esportes").selectedOptions).map(opt => opt.value);

    
    const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha, esportes })
    });

    const data = await response.json();
    if (response.ok) {
        alert("Cadastro realizado com sucesso!");
        mostrarPagina("login"); 
    } else {
        alert(data.message || "Erro ao cadastrar.");
    }
};


document.getElementById("formLogin").onsubmit = async function (e) {
    e.preventDefault(); 

  
    const email = document.getElementById("emailLogin").value;
    const senha = document.getElementById("senhaLogin").value;

   
    const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
    });

    const data = await response.json();
    if (response.ok) {
        alert(`Bem-vindo(a), ${data.nome}!`);
        mostrarPagina("home");
    } else {
        alert(data.message || "Erro ao fazer login.");
    }
};


function deslogar() {
    alert("Deslogado com sucesso!");
    mostrarPagina("login");
}


mostrarPagina("login");
