<template>
  <footer class="footer">
    <p class="footer__address">
      614068, Пермь, ул. Букирева, 15,&nbsp;
      <a href="mailto:info@psu.ru" class="footer__address__mail">
        info@psu.ru
      </a>
    </p>
    <p class="footer__title">
      Пермский государственный национальный исследовательский университет <span class="copyright">&copy;</span> 2023
    </p>
    <nuxt-link to="/policy" class="footer__policy">
      Политика по обработке персональных данных
    </nuxt-link>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  font-size: 14px;
  line-height: 1.25rem;
  color: var(--c-white);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  max-width: 110rem;
  grid-gap: 1rem;
  padding: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.25);
  background-color: var(--c-black);

  &__address {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    &__mail {
      text-decoration: underline;
    }
  }

  &__title {
    opacity: .5;
  }

  &__address,
  &__title {
    color: var(--c-white);
  }

  &__policy {
    text-decoration: underline;
  }
}
</style>

