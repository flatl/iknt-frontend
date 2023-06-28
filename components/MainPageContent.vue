<template>
  <div class="main">
    <div class="main__logo">
      <div class="main__logo__embleme-wrapper">
        <iknt-animation class="main__logo__embleme">
          <embleme-reverse class="main__logo__embleme__thumb" />
        </iknt-animation>
      </div>
      <div class="main__logo__bottom">
        <div class="main__logo__bottom__container-1">
          <h1 class="main__logo__title title">
            Институт<br>компьютерных наук<br>и технологий
          </h1>
        </div>
        <div class="main__logo__bottom__container-2">
          <button class="main__logo__button">
            <span class="main__logo__button__text small-text">
              подать документы
            </span>
            <span class="main__logo__button__inner small-text">
              подать документы
            </span>
          </button>
        </div>
      </div>
    </div>
    <div class="main__program">
      <a name="program" />
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
          <iknt-animation class="main__program__price__background" />
          <div class="main__program__price__background-overlay">
            <div class="main__program__price__background-overlay__gradient" />
          </div>
          <div class="main__program__price__container">
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
    </div>
    <iknt-carousel
      v-if="news.length"
      :slide-width="418"
      :slide-gap="28"
      title="Новости и события"
      hash-link="news"
      class="main__news"
    >
      <nuxt-link
        v-for="article of news"
        :key="article.id"
        :to="`/news/${article.id}`"
        class="main__news__article slide"
      >
        <span class="main__news__article__date small-text">
          {{ humanizeDate(article.datetime) }}
        </span>
        <h3 class="main__news__article__title subtitle">
          {{ article.title }}
        </h3>
        <div class="main__news__article__link">
          <button class="main__news__article__button">
            <span class="main__news__article__button__text small-text">
              подробнее
            </span>
            <arrow-right class="main__news__article__button__thumb" />
          </button>
        </div>
      </nuxt-link>
    </iknt-carousel>
    <div class="main__background-container">
      <div class="main__banner">
        <a name="faculty" />
        <div class="main__banner__left">
          <div class="main__banner__logo">
            <emblem />
            <logo />
            <logo-text />
          </div>
          <div class="main__banner__left__bottom">
            <h3 class="main__banner__title title">
              О факультете
            </h3>
            <p class="main__banner__text text">
              Программа включает в себя изучение теоретических принципов и
              приобретение практических навыков разработки программного обеспечения
              и реализации процессов создания и эксплуатации информационных
              систем и технологий, предназначенных для решения широкого класса задач.
            </p>
          </div>
        </div>
        <div class="main__banner__right">
          <a href="/IKNT_2023_plan.pdf" download class="main__banner__download">
            <download-icon />
            <span class="main__banner__download__text">
              скачать план обучения
            </span>
            <span class="main__banner__download__meta">
              PDF, 150 KB
            </span>
          </a>
        </div>
      </div>
      <div class="main__companies">
        <h3 class="main__companies__title title">
          Сотрудничаем с ведущими компаниями
        </h3>
        <div class="main__companies__container">
          <a
            v-for="company of companies"
            :key="company.id"
            :href="company.link"
            class="main__companies__company"
          >
            <img :src="company.imgSrc" class="main__companies__company__image" />
          </a>
        </div>
      </div>
    </div>
    <iknt-carousel
      :slide-width="720"
      :slide-gap="32"
      title="Что говорят выпускники"
      hash-link="reviews"
      class="main__reviews"
    >
      <div
        v-for="review of reviews"
        :key="review.id"
        class="main__reviews__review"
      >
        <p class="main__reviews__review__text text">
          {{ review.text }}
        </p>
        <div class="main__reviews__review__meta">
          <span class="main__reviews__review__author small-text">
            {{ review.author }}
          </span>
          <span class="ellipse" />
          <span class="main__reviews__review__year small-text">
            {{ review.year }}
          </span>
        </div>
      </div>
    </iknt-carousel>
    <div class="main__faq">
      <a name="faq" />
      <h3 class="main__faq__title title">
        Часто задаваемые вопросы
      </h3>
      <div class="main__faq__list">
        <details
          v-for="faqItem of faq"
          :key="faqItem.id"
          class="main__faq__item"
        >
          <summary class="main__faq__item__question subtitle">
            {{ faqItem.question }}<span class="special-symbol">?</span>
          </summary>
          <p class="main__faq__item__answer text">
            {{ faqItem.answer }}
          </p>
        </details>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { programOptions, companies, reviews, faq } from '@/lib/mainPageStructures';
import { humanizeDate } from '@/lib/helpers';
import IkntAnimation from '@/components/ui/IkntAnimation.vue';
import IkntCarousel from '@/components/ui/IkntCarousel.vue';
import Emblem from '@/assets/icons/emblem.svg?inline';
import Logo from '@/assets/img/logo.svg?inline';
import LogoText from '@/assets/icons/logo-text.svg?inline';
import EmblemeReverse from '@/assets/icons/embleme-reverse.svg?inline';
import ArrowRight from '@/assets/icons/arrow-right.svg?inline';
import DownloadIcon from '@/assets/icons/download.svg?inline';
import { Getters } from '@/lib/store/news/models';

export default defineComponent({
  // @ts-ignore
  components: {
    IkntAnimation,
    IkntCarousel,
    Emblem,
    Logo,
    LogoText,
    ArrowRight,
    EmblemeReverse,
    DownloadIcon,
  },

  data() {
    return {
      programOptions,
      companies,
      reviews,
      faq,
    };
  },

  computed: {
    news(): Getters["list"] {
      return this.$store.getters['news/list'];
    },
  },

  methods: {
    humanizeDate,
  }
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

  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__logo {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: calc(100vh - 5rem);

    &__embleme {
      width: 500px !important;
      height: 500px !important;

      ::v-deep .canvas {
        border-bottom-right-radius: 250px;
        border-bottom-left-radius: 250px;
      }

      &__thumb {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 4;
      }
    }

    &__bottom {
      display: grid;
      grid-template-columns: 40% 20% 40%;
      width: 100%;
      max-height: 108px;
      padding: 0;

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
      position: relative;
      overflow: hidden;
      width: 180px;
      height: 2.5rem;
      border-radius: 100px;
      background-color: var(--c-white);
      transition: background-color .15s linear;

      &:hover {
        background-color: var(--c-dark-blue);

        .main__logo__button__text {
          transform: translateY(-2.5rem);
        }

        .main__logo__button__inner {
          transform: translateY(0);
        }
      }

      &__text,
      &__inner {
        font-weight: 700;
        text-transform: uppercase;
        color: var(--c-black);
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        transition: transform .15s ease-out;
        z-index: 1;
      }

      &__inner {
        color: var(--c-white);
        transform: translateY(2.5rem);
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
          width: 50%;
          padding: 1rem 0;
        }
      }
    }

    &__price {
      overflow: hidden;
      position: relative;
      width: 100%;
      border: 1px solid rgba(255, 255, 255, 0.25);
      border-radius: 1.5rem;
      cursor: pointer;

      &__background-overlay {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 4;
        width: 100%;
        height: 100%;
        transition: opacity .5s ease-out;
        background-color: var(--c-black);
      
        &__gradient {
          width: 100%;
          height: 100%;
          background: radial-gradient(100% 100% at 100% 100%, rgba(26, 102, 255, 0.5) 0%, rgba(26, 102, 255, 0) 100%);
        }
      }

      &:hover {
        .main__program__price__background {
          visibility: visible;
        }
      
        .main__program__price__hidden-text {
          display: inline;
        }

        .main__program__price__background-overlay {
          opacity: 0;
        }
      }

      &__container {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 5;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        padding: 1.5rem;
      }

      &__background {
        visibility: visible;
        position: absolute;
        z-index: 3;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        ::v-deep .canvas {
          border-radius: 1.5rem;
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

  &__news {
    &__article {
      display: grid;
      align-items: flex-start;
      width: 420px;
      grid-gap: 1rem;

      &:hover {
        .main__news__article__title {
          color: var(--c-dark-blue);
        }

        .main__news__article__button {
          color: var(--c-dark-blue);
          width: 133px;
          background-color: var(--c-white);

          &__text {
            color: var(--c-dark-blue);
            display: inline;
          }

          &__thumb {
            path {
              fill: var(--c-dark-blue);
            }
          }
        }
      }

      &__date {
        opacity: .5;
      }

      &__title {
        text-align: left;
        transition: color .15s ease-out;
      }

      &__link {
        width: 100%;
      }

      &__button {
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 2rem;
        height: 2rem;
        grid-gap: .75rem;
        border-radius: 100px;
        transition: width .15s ease-out;
        background-color: var(--c-dark-blue);

        &__text {
          font-weight: 700;
          text-transform: uppercase;
          color: var(--c-white);
          display: none;
          transition: display .15s ease-out;
        }

        &__thumb {
          width: 1rem;
          height: 1rem;
        }
      }
    }
  }

  &__background-container {
    display: flex;
    flex-direction: column;
    grid-gap: 8rem;
    width: 100%;
    background: radial-gradient(48.91% 50% at 51.09% 50%, #150080 0%, #000000 100%);
  }

  &__banner {
    display: flex;
    width: 100%;
    min-height: 30rem;
    height: fit-content;
    border-radius: 1.5rem;
    background-color: var(--c-cream-white);

    &:hover {
      .main__banner__right {
        background-size: 107% 107%;
      }
    }

    &__left,
    &__right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      width: 50%;
      height: 100%;
      min-height: 30rem;
      padding: 2rem;
      border-radius: 1.5rem;

      &__bottom {
        display: flex;
        flex-direction: column;
        grid-gap: 2rem;
      }
    }

    &__title,
    &__text {
      color: var(--c-black);
    }

    &__right {
      flex-direction: column-reverse;
      background-image: url('~@/assets/img/abstract-hueta.png');
      background-position: left top;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      transition: background-size .4s ease-out;
    }

    &__logo {
      display: flex;
      align-items: center;
      grid-gap: 0.5rem;

      svg {
        path,
        rect {
          fill: var(--c-black);
        }
      }
    }

    &__download {
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      line-height: 100%;
      text-transform: uppercase;
      align-self: flex-end;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 233px;
      height: 116px;
      padding: 1.5rem;
      border-radius: .5rem;
      transition: height .3s ease-out;
      background-color: var(--c-white);

      &:hover {
        height: 132px;

        svg path {
          fill: var(--c-dark-blue);
        }

        .main__banner__download__text {
          color: var(--c-dark-blue);
        }

        .main__banner__download__meta {
          display: inline;
        }
      }

      svg {
        min-width: 2rem;
        min-height: 2rem;

        path {
          transition: fill .3s ease-out;
        }
      }

      &__text {
        transition: color .3s ease-out;
        margin-top: 1.5rem;
      }

      &__meta {
        display: none;
        margin-top: 0.25rem;
        opacity: 0.5;
      }
    }
  }

  &__companies {
    display: flex;
    flex-direction: column;
    grid-gap: 2rem;

    &__container {
      display: grid;
      grid-template-columns: repeat(4, 25%);
      grid-template-rows: 1fr 1fr;
      width: 100%;
      border: 1px solid #443d66;
      border-bottom: none;
    }

    &__company {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 68px 0;
      border-right: 1px solid #443d66;
      border-bottom: 1px solid #443d66;
      cursor: pointer;
      transition:
        box-shadow .8s ease-out,
        border-color .8s ease-out;

      &:hover {
        padding: 67px 0;
        border: 1px solid #978fbf;
        background: radial-gradient(50% 110% at 50% 100%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 100%);
        box-shadow: 0px 40px 80px #000000;
      }

      &:nth-of-type(4n) {
        border-right: none;
      }
    }
  }

  &__reviews {
    &__review {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      grid-gap: 1rem;
      height: 400px;
      padding: 2rem;
      border-radius: 1.5rem;
      background-color: var(--c-cream-white);

      .ellipse {
        width: 2px;
        height: 2px;
        border-radius: 50%;
        background-color: var(--c-black);
      }

      &__text {
        line-height: 1.5rem;
        color: var(--c-black);
      }

      &__meta {
        display: flex;
        flex-direction: row;
        align-items: center;
        grid-gap: 0.75rem;
      }

      &__author {
        font-weight: 500;
        letter-spacing: .05em;
        text-transform: uppercase;
        color: var(--c-black);
      }

      &__year {
        font-weight: 500;
        letter-spacing: .05em;
        color: var(--c-black);
        text-transform: uppercase;
        opacity: .5;
      }
    }
  }

  &__faq {
    display: flex;
    flex-direction: column;
    grid-gap: 2rem;

    &__list {
      display: flex;
      flex-direction: column;
      width: 100%;
      grid-gap: .25rem;
    }

    &__item {
      position: relative;
      width: 100%;
      transition:
        background-color .3s ease-out
        height .3s ease-out;
      border-radius: 0.5rem;
      background: rgba(255, 255, 255, 0.05);
      cursor: pointer;

      &:hover {
        background-color: rgba(255, 255, 255, 0.15);

        .main__faq__item__question::after {
          opacity: 1;
        }
      }

      &[open] {
        background-color: rgba(255, 255, 255, 0.15);

        .main__faq__item__question::after {
          transform: rotateZ(135deg);
          opacity: 1;
        }
      }

      &__question {
        padding: 26px calc(1.5rem + 26px) 26px 26px;
        user-select: none;

        &::after {
          content: '';
          position: absolute;
          top: 28px;
          right: 26px;
          width: 1.5rem;
          height: 1.5rem;
          opacity: 0.5;
          transition:
            transform .3s ease-out,
            opacity .3s ease-out;
          background-image: url('~@/assets/icons/plus.svg');
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }
      }
        

      &__answer {
        width: 100%;
        max-width: 940px;
        padding: 26px;
        padding-top: 1.5rem;
      }
    }
  }
}

@media (max-width: 991px) {
  .main {
    &__logo {
      padding-bottom: .5rem;

      &__embleme-wrapper {
        width: calc(100vh - 244px);
        height: calc(100vh - 244px);
        max-width: min(500px, calc(100vw - 2rem));
        max-height: min(500px, calc(100vw - 2rem));
      }

      &__embleme {
        width: 100% !important;
        height: 100% !important;

        &__thumb {
          width: 50%;
          height: 50%;
        }
      }

      &__bottom {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: min-content;
        max-height: unset;
        grid-gap: 1rem;

        &__container-1 {
          align-self: flex-start;
        }
      }
    }

    &__program {
      &__container {
        display: flex;
        flex-direction: column;
      }

      &__price {
        height: 288px;
      }
    }

    &__banner {
      display: flex;
      flex-direction: column;
      background-image: url('~@/assets/img/abstract-hueta.png');
      background-repeat: no-repeat;
      background-size: cover;

      &__left,
      &__right {
        width: 100%;
        min-height: unset;
        background-image: none;
      }

      &__left {
        grid-gap: 2rem;

        &__bottom {
          grid-gap: 1rem;
        }
      }
    }

    &__companies {
      &__container {
        grid-template-columns: repeat(2, 50%);
        grid-template-rows: repeat(4, 1fr);
      }
    }

    &__reviews {
      &__review {
        height: auto;
        max-width: 100%;
      }
    }
  }
}

@media (max-width: 600px) {
  .main {
    grid-gap: 4rem;
    padding: 0 1rem;

    &__companies {
      &__container {
        grid-template-columns: 100%;
        grid-template-rows: repeat(8, 1fr);
      }
    }
  }
}
</style>
