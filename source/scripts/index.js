const mainNavigationButton = document.querySelector('.js-toggle-button');
const mainNavigation = document.querySelector('.main-navigation');
const priceSlider = document.querySelector('.price-slider');
const startPriceInput = document.querySelector('#start-price');
const endPriceInput = document.querySelector('#end-price');
const inputs = [startPriceInput, endPriceInput];

const slider = document.querySelector('.slider');
const sliderButtonPrew = slider.querySelector('.slider__switch--left');
const sliderButtonNext = slider.querySelector('.slider__switch--right');
const slides = Array.from(slider.querySelectorAll('.slide'));
const paginationButtons = Array.from(slider.querySelectorAll('.slider-pagination__button'));

let slideIndex = 0;

function onMainNavigationButtonClick () {
  if (mainNavigation.classList.contains('main-navigation--closed')) {
    mainNavigation.classList.remove('main-navigation--closed');
    mainNavigation.classList.add('main-navigation--opened');
  } else {
    mainNavigation.classList.remove('main-navigation--opened');
    mainNavigation.classList.add('main-navigation--closed');
  }
}

mainNavigationButton.addEventListener('click', onMainNavigationButtonClick);

noUiSlider.create (priceSlider, {
  start: [0, 900],
  step: 10,
  connect: [false, true, false],
  range: {
    min: 0,
    max: 1100
  },
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    }
  }
});

startPriceInput.value = 0;
endPriceInput.value = 900;

priceSlider.noUiSlider.on('update', (values, handle) => {
  inputs[handle].value = values[handle];
});

startPriceInput.addEventListener('change', () => {
  priceSlider.noUiSlider.set([startPriceInput.value, ]);
});

endPriceInput.addEventListener('change', () => {
  priceSlider.noUiSlider.set([ , endPriceInput.value]);
});

//Слайдер

sliderButtonPrew.addEventListener('click', showPreviousSlide);
sliderButtonNext.addEventListener('click', showNextSlide);

function showPreviousSlide() {
  if (slideIndex > 0) {
    slideIndex = slideIndex - 1;
  }

  if (slideIndex === 0) {
    sliderButtonPrew.disabled = true;
  }

  sliderButtonNext.disabled = '';
  slider.querySelector('.slider-pagination__button--current').classList.remove('slider-pagination__button--current');
  paginationButtons[slideIndex].classList.add('slider-pagination__button--current');

  updateSlider();
}

function showNextSlide() {
  if (slideIndex < slides.length - 1) {
    slideIndex = slideIndex + 1;
  }

  if (slideIndex === slides.length) {
    sliderButtonNext.disabled = true;
  }

  sliderButtonPrew.disabled = '';
  slider.querySelector('.slider-pagination__button--current').classList.remove('slider-pagination__button--current');
  paginationButtons[slideIndex].classList.add('slider-pagination__button--current');

  updateSlider();
}

for (let i = 0; i < paginationButtons.length; i++) {

  paginationButtons[i].addEventListener ('click', () => {
    slideIndex = i;
    slider.querySelector('.slider-pagination__button--current').classList.remove('slider-pagination__button--current');
    paginationButtons[i].classList.add('slider-pagination__button--current');

    if (slideIndex > 0) {
      sliderButtonPrew.disabled = '';
    }

    if (slideIndex < slides.length) {
      sliderButtonNext.disabled = '';
    }

    updateSlider();
  });
}

function updateSlider() {
  slides.forEach((slide, index) => {
    if (index === slideIndex) {
      slide.style.display = 'flex';
    } else {
      slide.style.display = 'none';
    }
  });
}

updateSlider();
