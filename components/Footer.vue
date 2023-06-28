<template>
  <footer class="footer">
    <p class="footer__address">
      614068, Пермь, ул. Букирева, 15,&nbsp;
      <a href="mailto:info@psu.ru" class="footer__address__mail">
        info<span class="special-symbol">@</span>psu.ru
      </a>
    </p>
    <p class="footer__title">
      Пермский государственный национальный исследовательский университет <span class="special-symbol">&copy;</span> 2023
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
    text-align: center;
    opacity: .5;
  }

  &__address,
  &__title {
    color: var(--c-white);
  }

  &__address {
    text-align: left;
  }

  &__policy {
    text-decoration: underline;
    text-align: right;
  }
}

@media (max-width: 600px) {
  .footer {
    flex-direction: column;
    align-items: center;

    &__policy {
      text-align: center;
      order: 1;
    }

    &__address {
      text-align: center;
      display: inline-flex;
      justify-content: center;
      order: 2;

      &__mail {
        text-align: center;
      }
    }

    &__title {
      order: 3;
    }
  }
}
</style>

