import React, { Component } from 'react';
import '../index.css';
const apiUrl = `http://localhost:8080`;

export default class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMe: false,
      src: '',
      title: '',
      postData: false
    }
    this.showMsg = this.showMsg.bind(this);
    this.showMsgSend = this.showMsgSend.bind(this);
    this.sendData = this.sendData.bind(this);
    this.getData = this.getData.bind(this);
  }

  showMsg(){
    this.setState({
      showMe: true
    });
    setTimeout(()=> {
      this.setState({
        showMe: false
      });
    }, 1200);
  }

  showMsgSend() {
    this.showMsg();
    setTimeout(() => { this.sendData();}, 1000);
    setTimeout(() => { 
        let url = `http://${window.location.hostname}:${window.location.port}/reseptikirja`
        window.location.href = url;
      }, 1500);
    
  }
  getData(files) {
    let file = document.getElementById('reseptiKuva').files[0];
    if(file) {
      let reader = new FileReader();
      reader.onload = ((kuva) => {
        return (e) => {
          this.setState({src: e.target.result});
        };
      })(file);
      reader.readAsDataURL(file);
      console.log(this.state.src);
      this.setState({ postData: true});
    } else {
      let { postData } = this.state;
      if (postData) return;
      else {
        this.setState({src: "https://via.placeholder.com/400x300"});
        this.setState({postData: true});
      }
    }
  }

  async sendData(){
    let { postData } = this.state;

    if (postData) {
      let reci = {
        name: document.getElementById('reseptiNimi').value,
        image: this.state.src,
        instructions: document.getElementById('reseptiOhjeet').value,
        ingredients: document.getElementById('reseptiAineet').value
      };

      document.getElementById('reseptiNimi').value = '';
      this.setState({ src: ''});
      document.getElementById('reseptiOhjeet').value = '';
      document.getElementById('reseptiAineet').value = '';
      
      fetch('http://localhost:5000/upload', {
        method: 'post',
        redirect: 'follow',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          nimi: reci.nimi,
          image: reci.image,
          ohjeet: reci.ohjeet,
          ainesosat: reci.ainesosat
        })
      })
      .then((res) => {
        console.log('Data sent');
      })
    }
  }

  render() {
    const { showMe } = this.state;
    return (
      <div className="container">
      <div className="main"> 
        <h3>LISÄÄ RESEPTI</h3>
        <form>
          <input id="reseptiNimi" type="text" placeholder = "Nimi" name="Nimi" />
          <input id="reseptiKuva" type="file" placeholder="Lataa kuva" name="Kuva"/>
          <textarea id="reseptiAineet" placeholder="Ainesosat ja määrät" name="Ainesosat"></textarea>
          <textarea id="reseptiOhjeet" placeholder="Ohjeet" name="Ohjeet"></textarea>
          <input id="reseptiTallenna" value="Tallenna" type="button" onClick={this.showMsgSend} onMouseEnter={this.getData}/>
        </form>
        {
          showMe ?
            <div id="viesti">
                <h3>Resepti lisätty onnistuneesti!</h3>
              </div>
              :null
        }

      </div>
      </div>
    )
  }
}
