//https://jsonplaceholder.typicode.com/posts

//função que vai ler os posts
async function readPosts() {
    //função que vai tirar tdo da tela e aparecer Carregando
    let postArea = document.querySelector('.posts');
    postArea.innerHTML = 'Carregando...';

    //função que vai fazer a requisição na url
    let response = await fetch('https://jsonplaceholder.typicode.com/posts');

    //função que vai pegar os posts
    let json = await response.json();

    //condição para saber se tem algum post
    if (json.length > 0) {
        postArea.innerHTML = '';

        //loop para montar os posts
        for(let i in json) {
            //montando a estrutura do post
            let postHtml = `<div><h1>${json[i].title}</h1>${json[i].body}<hr/></div>`;
            postArea.innerHTML += postHtml;
            /*ou pode usar o append para colocar o post novo, ja que fazer essa funçãoacima o sistema
            sempre vai tirar tudo da memória e colocar todos os post outra vez */
        }
    }else{
        postArea.innerHTML = 'Nenhum post encontrado para exibir';
    }
}

//função que vai ficar responsável por fazer a requisição
async function addNewPost(title, body) {
    //a função vai fazer a requisição direto no servidor
    await fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                title,
                body,
                userId: 2
            })
        }
    );

    //limpando a area dos posts antes de colocar um post novo
    document.querySelector('#titleField').value = '';
    document.querySelector('#bodyField').value = '';

    //função que vai recarregar todos os posts
    readPosts();
}

//adicionando um evento no botão de novo post
document.querySelector('#insertButton').addEventListener('click', () => {
    //pegando o que está digitado no campo de titulo e corpo dis inputs
    let title = document.querySelector('#titleField').value;
    let body = document.querySelector('#bodyField').value;

    //verificação se os inputs estão preenchidos
    if(title && body) {
        //função que vai fazer a requisição dentro da condição
        addNewPost(title, body);
    }else{
        alert("Preencha todos os campos");
    }
});

readPosts();