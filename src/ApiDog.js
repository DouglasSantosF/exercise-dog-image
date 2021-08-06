import React from 'react';

class ApiDog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: '',
      loading: true,
    };
    console.log('constructor');
    this.fetchApi = this.fetchApi.bind(this);
  }

  // chama a funcão fetchAPI assim q o render renderiza os componentes
  componentDidMount() {
    console.log('componentDidMount');
    this.fetchApi();
  }

  // verifica qual vai ser o proximo estado, caso o estado seja terrier, o shouldComponentUpdate não deixa o render atualizar os componentes.
  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate');
    if (nextState.images.includes('terrier')) {
      return false;
    }
    return true;
  }

  // toda vez que o render atualiza os estados e props, o componentDidUpdate é executado. ( nesse caso ele está guardando o link da imagem no storage,
  // Depois ele guarda na variavel dogBreed, utilizando o link da imagem, esse link foi dividido em palavras, e o requisito para separar as strings foi "/".
  // ai ele pega o quarto elemento de numero 4 e guarda na variável.
  componentDidUpdate() {
    console.log('componentDidUpdate');
    const { images } = this.state;
    localStorage.setItem('dogURL', images);
    const dogBreed = images.split('/')[4];
    /* alert(dogBreed); */
  }

  fetchApi() {
    this.setState({ loading: true });
    fetch('https://dog.ceo/api/breeds/image/random')
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          loading: false,
          images: data.message,
        });
      });
  }

  render() {
    const { images, loading } = this.state;
    const loadingMessage = <span> loading </span>;
    console.log('render');
    return (
      <div>
        <p>Doguinhos</p>
        {loading ? loadingMessage : <img src={ images } alt="Random dog" />}
        <br />
        <button type="button" onClick={ this.fetchApi }>Novo doguinho!</button>
      </div>
    );
  }
}

export default ApiDog;
