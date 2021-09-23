<template>
  <div>
    <nav class="navbar">
      <p>
        <a class="link" href="#">
          Explore the freat
        </a>
      </p>
      <p>
        <a class="link" href="https://github.com/beeetooo/guitar-scales" target="_blank"> Github </a>
      </p>
    </nav>
    <Nuxt />
  </div>
</template>

<style>
html {
  width: 100%;
  height: 100%;
  font-family: Poppins;
}

body {
  margin: 0;
}

.navbar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 24px 0 24px;
  background-color: #7692ff;
}

.link {
  text-decoration: none;
  color: black;
}
</style>
