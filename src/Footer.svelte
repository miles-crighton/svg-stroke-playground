<script lang="ts">
  import LogoSvg from "./svgs/footerIcon.svg";
  import GithubSmallSvg from "./svgs/githubSmall.svg";
</script>

<footer>
  <LogoSvg />
  <div class="vertical-spacing-1" />
  <div>
    <h2 class="gradient title">SVG Stroke Tools</h2>
    <div class="name-row">
      <span class="subtext">A lil' something by Miles</span>
      <a href="https://github.com/miles-crighton" target="_blank">
        <GithubSmallSvg />
      </a>
    </div>
  </div>
</footer>

<style>
  .name-row {
    display: flex;
    align-items: center;
  }
  h2 {
    margin: 0;
    font-size: 16px;
  }

  .vertical-spacing-1 {
    width: 0.7rem;
  }

  .subtext {
    font-size: 14px;
    color: #3571a6;
    margin-right: 0.3rem;
  }
  footer {
    align-items: center;
    display: flex;
    left: 1rem;
    position: absolute;
    border-radius: 8px;
    padding: 0.5rem 1rem;
    background-color: #6cb8fb;
    color: white;
    /* border: 1px solid #d5d5d5; */
    box-shadow: inset 0 2px 3px rgba(0, 0, 0, 0.08);
  }
</style>
