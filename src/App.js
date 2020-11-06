import React from 'react';
import 'tachyons';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      quotesDB:[],
      quote: '',
      author: ''
    }
    this.retrieveQuote = this.retrieveQuote.bind(this)
  }

  componentDidMount(){
    fetch('https://gist.githubusercontent.com/apatrickg/de7a7fae9ab4bd94d7965d01ca253f21/raw/5da320eaa183f3047bbd55cf3d1c36a3847ebd66/quotes.json')
    .then(response => response.json())
    .then(data => {
      this.setState({
        quotesDB: data.quotes
      }, () => {
        this.retrieveQuote()
      })
    })
    .catch(error => console.log('error'))
  }

  retrieveQuote(){
      let random = Math.floor(Math.random() * this.state.quotesDB.length)
      let randomized = this.state.quotesDB[random]

      this.setState({
        quote: randomized.quote,
        author: randomized.author
      })
  }


  render (){
    let uri = this.state.quote + " - " + this.state.author;
    let encoded = encodeURIComponent(uri);
    return (
      <div id="quote-box">
        <h1 id="opening">Quote for Your Thoughts?</h1>
        <p id="text">"{this.state.quote}"</p>
        <p id="author">-{this.state.author}</p>
        <a class="no-underline near-white bg-animate bg-gold hover-bg-yellow inline-flex items-center tc br2 pa2" 
           id="tweet-quote" 
           href={`https://twitter.com/intent/tweet?text=` + encoded} target="_blank" rel="noreferrer">
        <svg class="dib h2 w2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414"><path d="M16 3.038c-.59.26-1.22.437-1.885.517.677-.407 1.198-1.05 1.443-1.816-.634.375-1.337.648-2.085.795-.598-.638-1.45-1.036-2.396-1.036-1.812 0-3.282 1.468-3.282 3.28 0 .258.03.51.085.75C5.152 5.39 2.733 4.084 1.114 2.1.83 2.583.67 3.147.67 3.75c0 1.14.58 2.143 1.46 2.732-.538-.017-1.045-.165-1.487-.41v.04c0 1.59 1.13 2.918 2.633 3.22-.276.074-.566.114-.865.114-.21 0-.416-.02-.617-.058.418 1.304 1.63 2.253 3.067 2.28-1.124.88-2.54 1.404-4.077 1.404-.265 0-.526-.015-.783-.045 1.453.93 3.178 1.474 5.032 1.474 6.038 0 9.34-5 9.34-9.338 0-.143-.004-.284-.01-.425.64-.463 1.198-1.04 1.638-1.7z" fill-rule="nonzero"/></svg>
        <span class="f6 ml3 pr2">Twitter</span>
        </a>
        <button 
        class="no-underline near-white bg-animate bg-gold hover-bg-yellow inline-flex items-center tc br2 pa2"
        id="new-quote" 
        onClick={this.retrieveQuote}>
        <svg class="dib h2 w2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm2 12l-4.5 4.5 1.527 1.5 5.973-6-5.973-6-1.527 1.5 4.5 4.5z"/></svg>
        <span class="f6 m13 pr2">New Quote</span>
        </button>
      </div>
    )
  }
}

export default App;
