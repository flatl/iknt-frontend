<template>
  <div class="main">
    <div class="main__logo">
      <div class="main__logo__embleme-wrapper">
        <svg id="svg" width="530" height="530" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="00%" x2="100%" y2="100%">
              <stop id="pink"    offset="0%"     stop-color="#FF33BB" />
              <stop id="yellow"  offset="25%"    stop-color="#FFCC00" />
              <stop id="pink2"   offset="33.33%" stop-color="#FF33BB" />
              <stop id="blue"    offset="50%"   stop-color="#1A1AFF" />
              <stop id="violet" offset="80%" stop-color="#150080" />
            </linearGradient>
          </defs>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M40 0H0V20C0 31.0457 8.95431 40 20 40C31.0457 40 40 31.0457 40 20V0ZM5 5H20V10H15V15H10V20H5V5ZM15 15H20V20H15V15Z"
            fill="url(#gradient)"
          />
        </svg>
      </div>
      <div class="main__logo__bottom">
        <div class="main__logo__bottom__container-1">
          <h1 class="main__logo__title title">
            Институт<br>компьютерных наук<br>и технологий
          </h1>
        </div>
        <div class="main__logo__bottom__container-2">
          <button class="main__logo__button small-text">
            подать документы
          </button>
        </div>
      </div>
    </div>
    <div class="main__program">
      <h2 class="subtitle">
        Факультет информационных технологий и программирования
      </h2>
      <div class="main__program__container">
        <table class="main__program__info">
          <tbody>
            <tr
              v-for="(option, index) of programOptions"
              :key="index"
              class="main__program__info__option"
            >
              <td class="main__program__info__option__title">
                {{ option.title }}
              </td>
              <td class="main__program__info__option__value">
                {{ option.value }}
              </td>
            </tr>
          </tbody>
        </table>
        <div class="main__program__price">
          <p class="main__program__price__label small-text">
            стоимость контрактного обучения (год)
          </p>
          <div class="main__program__price__bottom">
            <h3 class="main__program__price__value subtitle">
              130 000 <span class="special-symbol">₽</span>
            </h3>
            <div class="main__program__price__button-container">
              <span class="main__program__price__hidden-text small-text">
                подать документы
              </span>
              <button class="main__program__price__button">
                <arrow-right />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <a name="program" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Emblem from '@/assets/icons/emblem.svg?inline';
import ArrowRight from '@/assets/icons/arrow-right.svg?inline';

export default Vue.extend({
  components: { Emblem, ArrowRight },

  data() {
    return {
      programOptions: [
        {
          title: 'форма обучения',
          value: 'Очная',
        },
        {
          title: 'длительность',
          value: '4 года',
        },
        {
          title: 'язык обучения',
          value: 'Русский',
        },
        {
          title: 'общежитие',
          value: 'Да',
        },
        {
          title: 'военный учебный центр',
          value: 'Нет',
        },
        {
          title: 'гос. аккредитация',
          value: 'Да',
        },
      ],
    };
  },
});
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 110rem;
  padding: 0 2.5rem 8rem 2.5rem;
  grid-gap: 8rem;
  background-color: var(--c-black);

  background: linear-gradient(100% 100% at 100% 0%, #FFCC00 0%, #991F99 33.33%, #150080 66.67%, #000000 100%);

  &__logo {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: calc(100vh - 5rem);

    &__emblem {
      width: 530px;
      height: 528px;
    }

    &__bottom {
      display: grid;
      grid-template-columns: 40% 20% 40%;
      width: 100%;
      max-height: 108px;
      padding: 0 5rem;

      &__container-1 {
        display: flex;
        align-items: flex-end;
        height: 100%;
      }

      &__container-2 {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        height: 100%;
      }
    }

    &__title {
      text-transform: uppercase;
    }

    &__button {
      color: var(--c-black);
      width: 180px;
      height: 2.5rem;
      border-radius: 100px;
      background-color: var(--c-white);

      &:hover {
        color: var(--c-white);
        background-color: var(--c-dark-blue);
      }
    }
  }

  &__program {
    display: flex;
    flex-direction: column;
    width: 100%;
    grid-gap: 2rem;

    &__container {
      display: grid;
      grid-template-columns: calc(50% - 1rem) calc(50% - 1rem);
      grid-gap: 2rem;
    }

    &__info {
      width: 100%;
      border-collapse: collapse;

      &__option {
        width: 100%;
        border: 1px solid rgba(255, 255, 255, 0.25);
        border-right: none;
        border-left: none;

        &__title,
        &__value {
          font-size: .75rem;
          line-height: 1rem;
          color: var(--c-white);
          text-align: left;
          text-transform: uppercase;
          padding: 1rem 0;
        }
      }
    }

    &__price {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
      padding: 1.5rem;
      border: 1px solid rgba(255, 255, 255, 0.25);
      border-radius: 1.5rem;
      background: radial-gradient(100% 100% at 100% 100%, rgba(26, 102, 255, 0.5) 0%, rgba(26, 102, 255, 0) 100%);
      cursor: pointer;

      &:hover {
        background: linear-gradient(135deg, #FF33BB 0%, #FFCC00 25%, #FF33BB 33.33%, #1A1AFF 50%, #150080 80%); 
      
        .main__program__price__hidden-text {
          display: inline;
        }
      }

      &__label {
        text-transform: uppercase;
      }

      &__bottom {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
      }

      &__button-container {
        display: flex;
        align-items: center;
        grid-gap: 1rem;
      }

      &__hidden-text {
        display: none;
        text-transform: uppercase;
      }
    }
  }
}
</style>
