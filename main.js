var mensagemConfirmacao = document.getElementById('confirmacao');
var mensagem = document.getElementById('mensagem');

async function encurtarURL() {
    var longUrl = document.getElementById('input')
    const accessToken = 'ffb141d72350fef8ee778ed53eb1e69a858bc650'
    const bitlyApiUrl = 'https://api-ssl.bitly.com/v4/shorten'

    const data = {
        long_url: longUrl.value,
    };

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
    };

    const requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
    };

    if(verificaInputVazio()) {
        try {
            const response = await fetch(bitlyApiUrl, requestOptions);
            const result = await response.json();
    
            if(result.errors) {
                throw Error(erro)
            }
            else {
                const shortenedUrl = result.id;
                longUrl.value = shortenedUrl
                console.log(shortenedUrl)
            }
        } catch (erro) {
            mensagem.textContent = 'Invalid URL!'
            mensagem.classList = 'erro'
            setTimeout(() => {
                mensagem.classList = 'desativado'
            }, 2000);
        }
    }
}

function copiar() {
    if (verificaInputVazio()) {
        var url = document.getElementById('input')
        navigator.clipboard.writeText(url.value);
    
        mensagem.textContent = 'URL copied!';
        mensagem.classList = 'confirmacao'
        setTimeout(() => {
            mensagem.classList = 'desativado';
        }, 2000);
    }
}

function verificaInputVazio() {
    var url = document.getElementById('input').value

    if (url == '') {
        mensagem.textContent = 'Enter an URL!';
        mensagem.classList = 'erro'
        setTimeout(() => {
            mensagem.classList = 'desativado';
        }, 2000);
        return false
    }

    return true
}