<footer>
  <h2 class="gradient title">Stroke it</h2>
  <div>
    <span class="subtext">A lil' something by</span><span class="gradient name"
      >Miles</span
    >
  </div>
</footer>

<style>
  .gradient {
    background-color: #c937b9;
    background-image: linear-gradient(45deg, #ff5a5a, #f75de5);
    background-size: 100%;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-text-fill-color: transparent;
  }
  .name {
    font-size: 32px;
  }

  .title::after {
    content: " ";
    width: 200px;
    height: 50px;
    background: url("/stroke-it-stroke.svg");
    background-size: cover;
  }
  .subtext {
    font-style: italic;
    color: #fe67ad;
    margin-right: 0.4rem;
    font-size: 24px;
    font-weight: bold;
  }
  h2 {
    font-size: 52px;
    margin: 0 auto;
    text-align: center;
  }
  footer {
    font-family: "Funkydori", sans-serif;
    position: absolute;
    bottom: 1rem;
    left: 0rem;
    border-radius: 8px;
    padding: 1.5rem 3rem;
    /* border: 1px solid #d5d5d5; */
    /* box-shadow: 0 0 22px 1px rgba(0, 0, 0, 0.1),
      inset 0 -2px 3px rgba(0, 0, 0, 0.08); */
  }
</style>
