import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';

const { VARIATION } = shared;

const startExperiment = () => {
  pollerLite(['.form--ll-mortgage-finder'], () => {
    //   <div class="container main_sec">
    //   <div class="left">
    //    <p class="left-heading">Later Life Mortgage Finder</p>
    //   <p class="left-para">A range of options to help manage existing mortgage debt or use some of the value in your home to help finance a better retirement.</p>
    //   </div>
    //   <div class="right">
    //     <form action="#" class="form form--step-form form--ll-mortgage-finder">
    //      <div class="formWrapper">

    //      <section class="form__heading">
    //         <div class="form__img-wrapper">
    //           <img class="form__image" src="https://blcro.fra1.digitaloceanspaces.com/KG-406/tabler_clock_KG-406.png" alt="Adviser">
    //         </div>
    //         <p class="image_desc">Our mortgage finder can help you understand your mortgage options.</p>
    //       </section>

    //       <div class="bag_grey">

    //      <div class="ques_sp">
    //         <div class="ques_no">
    //           <img class="form__img" src="https://blcro.fra1.digitaloceanspaces.com/KG-406/indicator--figure-KG-406.png" alt="Adviser">
    //         </div>
    //         <div class="ques">
    //           <p class="ques_context">Let’s get started. Do you have an existing mortgage?</p>
    //         </div>
    //     </div>
    //     <div class="progress_bar">
    //         <img src="https://blcro.fra1.digitaloceanspaces.com/KG-406/bar--progress.png">
    //     </div>

    //     <section class="fieldset fieldset--mortgage">
    //         <div class="field-wrapper">
    //           <div class="form_field__group">
    //             <input type="radio" class="for__field form__field--radio" id="HasMortgageYes" name="HasMortgage" label="Yes" value="Has a mortgage">
    //             <label class="form__label--rad bg_radio" for="HasMortgageYes">Yes</label>
    //             <input type="radio" class="form__field form__field--radio" id="HasMortgageNo" name="HasMortgage" label="No" value="Does not have a mortgage">
    //             <label class="form__label--rad bg_radio" for="HasMortgageNo">No</label>
    //           </div>
    //         </div>
    //     </section>

    //       <section class="form__controls row c-v-align justify-content-between mx-0">
    //         <button style="background-color: #F7F7F7;">Back</button>
    //         <button class="btn btn--next btn--success order-sm-1" type="submit" disabled="">Next</button>
    //       </section>

    //       </div>
    //     </div>
    //   </form>
    //   </div>

    // </div>
    //   `;

    // document.querySelector("#ll-mortgage-finder").innerHTML = badgeHTML;

    ////////////////////////////////////Ques1 for Phone/////////////////////////
    //form screen 1
    document.querySelector('#ll-mortgage-finder > div > form').classList.add('form--step-form_1');
    //form adjustments
    document.querySelector('#ll-mortgage-finder > div > form > div').classList.add('form_re_wrapper');

    //adding time stamp
    let imagTag = `<img class="time_stamp" src="https://cdn-3.convertexperiments.com/uf/10046273/10046720/tabler_clock_6744740e84c89.png">`;
    document
      .querySelector('#ll-mortgage-finder > div > form > div > section.form__heading')
      .insertAdjacentHTML('afterBegin', imagTag);

    //adding heading
    document.querySelector('#ll-mortgage-finder > div > form > div > section.form__heading').classList.add('form_margin');
    document.querySelector('#ll-mortgage-finder > div > form > div > section.form__heading > h2').innerHTML =
      'Our mortgage finder can help you understand your mortgage options.';
    document.querySelector('#ll-mortgage-finder > div > form > div > section.form__heading > h2').classList.add('image_desc');
    //adding Ques
    let ques1 = `<div class="ques_sp">
                    <div class="ques_no">
                      <img class="form__img form-step-img" src="https://cdn-3.convertexperiments.com/uf/10046273/10046720/indicator--figure_6744716d0f467.png" alt="Adviser">
                    </div>
                    <div class="ques">
                      <p class="ques_context">Let's get started. Do you have an existing mortgage?</p>
                    </div>
                  </div>`;
    document
      .querySelector('#ll-mortgage-finder > div > form > div > section.form__heading')
      .insertAdjacentHTML('afterEnd', ques1);
    document.querySelector('#ll-mortgage-finder .ques_sp .ques_context').classList.add('image_desc');
    //adding progressbar
    let progbar = document.querySelector('.form--ll-mortgage-finder .progress-bar');
    document.querySelector('.form--ll-mortgage-finder .ques_sp').insertAdjacentElement('afterend', progbar);
    document.querySelector('.form--ll-mortgage-finder .progress-bar__percentage span').style.display = 'none';
    if (document.querySelector('.form--ll-mortgage-finder .form__img-wrapper'))
      document.querySelector('.form--ll-mortgage-finder .form__img-wrapper').style.display = 'none';
    // document.querySelector('.form--ll-mortgage-finder .form__heading').style.padding = '0px 0px 10px 0px';
    document
      .querySelector('#ll-mortgage-finder > div > form > div > section.form__controls.row.c-v-align.justify-content-between.mx-0')
      .classList.add('row_modified');
    document
      .querySelector(
        '#ll-mortgage-finder > div > form > div > section.form__controls.row.c-v-align.justify-content-between.mx-0 > button.btn.btn--next.btn--success.order-sm-1'
      )
      .classList.add('nextCta');
    document.querySelector(
      '#ll-mortgage-finder > div > form > div > section.form__controls.row.c-v-align.justify-content-between.mx-0.row_modified > button.btn.btn--next.btn--success.order-sm-1.nextCta'
    ).innerHTML = 'Next';
    document.querySelector('#ll-mortgage-finder > div > form').setAttribute('data-stage', '1');

    //ques1 for Desktop
    var ques1_desktop = `<div class="main_sec_left"><h2 class="sec_left_heading">Later Life Mortgage Finder</h2><p class="sec_left_para">A range of options to help manage existing mortgage debt or use some of the value in your home to help finance a better retirement.</p></div>`;
    document.querySelector('#ll-mortgage-finder > div > h2').style.display = 'none';
    document.querySelector('#ll-mortgage-finder > div > p').style.display = 'none';
    document.querySelector('#ll-mortgage-finder > div > form').insertAdjacentHTML('beforeBegin', ques1_desktop);
    document.querySelector('#ll-mortgage-finder > div').classList.add('main_sec');
  });
};

//functionality for the next click
pollerLite(['#ll-mortgage-finder .form__controls .btn--next.btn--success'], () => {
  document.querySelector('#ll-mortgage-finder .form__controls .btn--next.btn--success').addEventListener('click', function () {
    moveNextFunction();
  });
});

function moveNextFunction() {
  var currStage = document.querySelector('#ll-mortgage-finder > div > form').getAttribute('data-stage');
  if (currStage == 1) {
    var image = `<img class="form__img form-step-img" src="https://cdn-3.convertexperiments.com/uf/10046273/10046720/indicator--figure-2_674471dd56fec.png" alt="Adviser"></div>`;
    document.querySelector('#ll-mortgage-finder .form__heading.form_margin .image_desc').insertAdjacentHTML('beforeBegin', image);
    document.querySelector('#ll-mortgage-finder > div > form > div > div').style.display = 'none';
    document.querySelector('#ll-mortgage-finder .form_margin .time_stamp').style.display = 'none';

    pollerLite(['.btn--prev'], () => {
      document.querySelector('#ll-mortgage-finder .form__controls .btn--prev').classList.add('btn_previous');
    });
    document.querySelector('#ll-mortgage-finder .form__heading.form_margin').classList.add('section_re_dim');
    document.querySelector('#ll-mortgage-finder > div > form').setAttribute('data-stage', '2');
    //functionality for the back click
    pollerLite(['#ll-mortgage-finder .btn--prev'], () => {
      document.querySelector('#ll-mortgage-finder .btn--prev').addEventListener('click', function () {
        // document.querySelector("#ll-mortgage-finder > div > form").classList.add('chnge_dim_onback');
        moveBackFunction();
      });
    });
  }
  if (currStage == 2) {
    pollerLite(['.form__group--postcode'], () => {
      // var addPost =`<span class="postCodeSpan">Add your postcode</span>`;

      document.querySelector('#ll-mortgage-finder .form__group.form__group--postcode').classList.add('re_form_group');
      document
        .querySelector('#ll-mortgage-finder .form__group.form__group--postcode > div')
        .classList.add('re_form_field_wrapper');
      document.querySelector('#ll-mortgage-finder .form__group.form__group--postcode > div > div').classList.add('postcode_div');

      document.querySelector('#ll-mortgage-finder .form__group--postcode > div > button').addEventListener('click', function () {
        document
          .querySelector('#ll-mortgage-finder .form__group.form__group--postcode > div')
          .classList.add('re_form_field_wrapper');
      });

      pollerLite(['form[data-stage="3"] .form__field-wrapper:nth-of-type(6) .form__toggle:nth-of-type(1)'], () => {
        document
          .querySelector('form[data-stage="3"] .form__field-wrapper:nth-of-type(6) .form__toggle:nth-of-type(1)')
          .addEventListener('click', function () {
            pollerLite(['.form__group--postcode'], () => {
              document.querySelector('#ll-mortgage-finder .form__group.form__group--postcode').classList.add('re_form_group');
              document
                .querySelector('#ll-mortgage-finder .form__group.form__group--postcode > div')
                .classList.add('re_form_field_wrapper');
              document
                .querySelector('#ll-mortgage-finder .form__group.form__group--postcode > div > div')
                .classList.add('postcode_div');
            });
          });
      });

      pollerLite(['form[data-stage="3"] .form__group--postcode .find_add'], () => {
        //find address for screen no.3
        document.querySelector("form[data-stage='3'] .form__group--postcode .find_add").addEventListener('click', function () {
          document.querySelector('#ll-mortgage-finder .btn.btn--next.btn--success.order-sm-1.nextCta').style.display = 'block';
          document.querySelector('form[data-stage="3"] .form__controls').style.display = 'flex';
        });
      });
      document
        .querySelector(
          '#ll-mortgage-finder > div > form > div > div.form__group.form__group--postcode.re_form_group > div > button'
        )
        .classList.add('find_add');

      document
        .querySelector('#ll-mortgage-finder .row.c-v-align.justify-content-between.mx-0.row_modified')
        .classList.add('d-block');
      document.querySelector('#ll-mortgage-finder > div > form').setAttribute('data-stage', '3');
    });
  }
  if (currStage == 3) {
    document.querySelector('#ll-mortgage-finder > div > form').setAttribute('data-stage', '4');
  }
  if (currStage == 4) {
    document.querySelector('#ll-mortgage-finder > div > form').setAttribute('data-stage', '5');
  }
  if (currStage == 5) {
    document.querySelector('#ll-mortgage-finder > div > form').setAttribute('data-stage', '6');
  }
  if (currStage == 6) {
    document.querySelector('#ll-mortgage-finder > div > form').setAttribute('data-stage', '7');
  }
  if (currStage == 7) {
    document.querySelector('#ll-mortgage-finder > div > form').setAttribute('data-stage', '8');
  }
  if (currStage == 8) {
    document.querySelector('#ll-mortgage-finder > div > form').setAttribute('data-stage', '9');
    //functionality for adding title radio button
    pollerLite(["form[data-stage='9'] .form__field-wrapper--title"], () => {
      let titleHtml = `<div class="form__group form__group--radio "><div class="form__field-wrapper   "><input type="radio" class="form__field form__field--radio" id="Title_Mr" name="Title" value="Mr"><label class="form__label--radio" for="Title_Mr">Mr</label></div><div class="form__field-wrapper   "><input type="radio" class="form__field form__field--radio" id="Title_Mrs" name="Title" value="Mrs" data-gtm-form-interact-field-id="4"><label class="form__label--radio" for="Title_Mrs">Mrs</label></div><div class="form__field-wrapper   "><input type="radio" class="form__field form__field--radio" id="Title_Ms" name="Title" value="Ms" data-gtm-form-interact-field-id="6"><label class="form__label--radio" for="Title_Ms">Ms</label></div><div class="form__field-wrapper   "><input type="radio" class="form__field form__field--radio" id="Title_Miss" name="Title" value="Miss" data-gtm-form-interact-field-id="5"><label class="form__label--radio" for="Title_Miss">Miss</label></div></div>`;
      document.querySelector("form[data-stage='9'] .form__field-wrapper--title").insertAdjacentHTML('afterend', titleHtml);
      const selectElement = document.getElementById('Title');
      const radioButtons = document.querySelectorAll('form[data-stage="9"] .form__field--radio');

      radioButtons.forEach((radio) => {
        radio.addEventListener('change', () => {
          // When a radio button is selected, update the <select> element
          selectElement.value = radio.value;
        });
      });

      let addLastName = `<span class="lastName_text">Your Last Name</span>`;
      document
        .querySelector('#ll-mortgage-finder .form__group.form__group--name > div:nth-child(4)')
        .insertAdjacentHTML('beforebegin', addLastName);
    });
  }
  if (currStage == 9) {
    document.querySelector('#ll-mortgage-finder > div > form').setAttribute('data-stage', '10');
  }
}

function moveBackFunction() {
  var currStage = document.querySelector('#ll-mortgage-finder > div > form').getAttribute('data-stage');
  if (currStage == 2) {
    document.querySelector('#ll-mortgage-finder > div > form').setAttribute('data-stage', '1');
    document.querySelector('#ll-mortgage-finder .form__heading .form-step-img').remove();

    //adding time stamp
    let imagTag = `<img class="time_stamp" src="https://cdn-3.convertexperiments.com/uf/10046273/10046720/tabler_clock_6744740e84c89.png">`;
    document.querySelector("form[data-stage='1'] section.form__heading").insertAdjacentHTML('afterBegin', imagTag);
    // document.querySelector('.form--ll-mortgage-finder .form__heading').style.padding = '0px 0px 10px 0px';

    pollerLite(["form[data-stage='1'] h2"], () => {
      //adding heading
      document.querySelector("form[data-stage='1'] .image_desc").style.display = 'none';
      setTimeout(() => {
        document.querySelector("form[data-stage='1'] .image_desc").innerHTML =
          'Our mortgage finder can help you understand your mortgage options.';
        document.querySelector("form[data-stage='1'] .image_desc").style.display = 'block';
      }, 10);

      // document.querySelector("#ll-mortgage-finder > div > form > div > section.form__heading > h2").classList.add("image_desc");
      //adding Ques
    });

    let ques1 = `<div class="ques_sp">
                    <div class="ques_no">
                      <img class="form__img form-step-img" src="https://cdn-3.convertexperiments.com/uf/10046273/10046720/indicator--figure_6744716d0f467.png" alt="Adviser">
                    </div>
                    <div class="ques">
                      <p class="ques_context">Let's get started. Do you have an existing mortgage?</p>
                    </div>
                  </div>`;
    document
      .querySelector('#ll-mortgage-finder > div > form > div > section.form__heading')
      .insertAdjacentHTML('afterEnd', ques1);
    document.querySelector('#ll-mortgage-finder .ques_sp .ques_context').classList.add('image_desc');
    // document.querySelector("#ll-mortgage-finder .form_margin.section_re_dim > img.form__img.new_image_dim").style.display = "none";
    // pollerLite(['.form--ll-mortgage-finder'], () => {
    //   document.querySelector("#ll-mortgage-finder .form_margin.section_re_dim > img.form__img.new_image_dim").style.display = "none";
    //   document.querySelector("#ll-mortgage-finder .form_margin .time_stamp").style.display = "block";
    //   document.querySelector('.form--ll-mortgage-finder .ques_sp').style.display = "block";
    //   document.querySelector('.form--ll-mortgage-finder .ques_sp').style.display = "flex";
    //   document.querySelector("#ll-mortgage-finder .form__heading.form_margin").classList.remove("section_re_dim");
    //   pollerLite(['.fieldset--mortgage'], () => {
    //     document.querySelector("#ll-mortgage-finder > div > form > div > section.fieldset.fieldset--mortgage > div").classList.add('feild_dis_wrapper');
    //     // document.querySelector("#ll-mortgage-finder .fieldset.fieldset--mortgage > div > div").classList.add('thread');
    //     // document.querySelector("#ll-mortgage-finder .fieldset.fieldset--mortgage > div > div > label:nth-child(2)").classList.add('thread_1');
    //     // document.querySelector("#ll-mortgage-finder .fieldset.fieldset--mortgage > div > div > label:nth-child(4)").classList.add('thread_1');
    //   }, 10000);
    //   setTimeout(function () {
    //     pollerLite(['.image_desc'], () => {
    //       document.querySelector("#ll-mortgage-finder .form__heading.form_margin > h2").innerHTML = "Our mortgage finder can help you understand your mortgage options.";
    //     }, 10000);
    //   })
    // });
  }
  if (currStage == 3) {
    document.querySelector('#ll-mortgage-finder > div > form').setAttribute('data-stage', '2');

    // document.querySelector("#ll-mortgage-finder .btn.btn--next.btn--success.order-sm-1.nextCta").style.display="block";
    // document.querySelector("#ll-mortgage-finder .form__heading.form_margin").classList.add("section_re_dim");

    // document.querySelector("#ll-mortgage-finder .form__group.form__group--postcode").classList.add('re_form_group');
    document.querySelector('#ll-mortgage-finder .form__group.form__group--postcode > div').classList.add('re_form_field_wrapper');
    document.querySelector('#ll-mortgage-finder .form__group.form__group--postcode > div > div').classList.add('postcode_div');
    pollerLite(['form[data-stage="3"] .form__group--postcode .find_add'], () => {
      //find address for screen no.3
      document.querySelector("form[data-stage='3'] .form__group--postcode .find_add").addEventListener('click', function () {
        document.querySelector('#ll-mortgage-finder .btn.btn--next.btn--success.order-sm-1.nextCta').style.display = 'block';
        document.querySelector('form[data-stage="3"] .form__controls').style.display = 'flex';
      });
    });
  }
  if (currStage == 4) {
    document.querySelector('#ll-mortgage-finder > div > form').setAttribute('data-stage', '3');
    pollerLite(['.form__group--postcode'], () => {
      document.querySelector('#ll-mortgage-finder .form__group.form__group--postcode').classList.add('re_form_group');
      document
        .querySelector('#ll-mortgage-finder .form__group.form__group--postcode > div')
        .classList.add('re_form_field_wrapper');
      document.querySelector('#ll-mortgage-finder .form__group.form__group--postcode > div > div').classList.add('postcode_div');

      document
        .querySelector('#ll-mortgage-finder .form__group--postcode.re_form_group > div > button')
        .addEventListener('click', function () {
          document
            .querySelector('#ll-mortgage-finder .form__group.form__group--postcode > div')
            .classList.add('re_form_field_wrapper');

          const stepThreeAddressElem = document.querySelector('form[data-stage="3"]  .form__field-wrapper--address');
          if (stepThreeAddressElem && stepThreeAddressElem.style.display != 'none') {
            document.querySelector('form[data-stage="3"] .re_form_field_wrapper button').style.marginTop = '15px';
          }
        });

      document
        .querySelector(
          '#ll-mortgage-finder > div > form > div > div.form__group.form__group--postcode.re_form_group > div > button'
        )
        .classList.add('find_add');
    });
    document
      .querySelector('#ll-mortgage-finder .row.c-v-align.justify-content-between.mx-0.row_modified')
      .classList.add('d-block');
  }
  if (currStage == 5) {
    document.querySelector('#ll-mortgage-finder > div > form').setAttribute('data-stage', '4');
  }
  if (currStage == 6) {
    document.querySelector('#ll-mortgage-finder > div > form').setAttribute('data-stage', '5');
  }
  if (currStage == 7) {
    document.querySelector('#ll-mortgage-finder > div > form').setAttribute('data-stage', '6');
  }
  if (currStage == 8) {
    document.querySelector('#ll-mortgage-finder > div > form').setAttribute('data-stage', '7');
  }
  if (currStage == 9) {
    document.querySelector('#ll-mortgage-finder > div > form').setAttribute('data-stage', '8');
  }
  if (currStage == 10) {
    document.querySelector('#ll-mortgage-finder > div > form').setAttribute('data-stage', '9');
    //functionality for adding title radio button
    pollerLite(["form[data-stage='9'] .form__field-wrapper--title"], () => {
      let titleHtml = `<div class="form__group form__group--radio "><div class="form__field-wrapper   "><input type="radio" class="form__field form__field--radio" id="Title_Mr" name="Title" value="Mr"><label class="form__label--radio" for="Title_Mr">Mr</label></div><div class="form__field-wrapper   "><input type="radio" class="form__field form__field--radio" id="Title_Mrs" name="Title" value="Mrs" data-gtm-form-interact-field-id="4"><label class="form__label--radio" for="Title_Mrs">Mrs</label></div><div class="form__field-wrapper   "><input type="radio" class="form__field form__field--radio" id="Title_Ms" name="Title" value="Ms" data-gtm-form-interact-field-id="6"><label class="form__label--radio" for="Title_Ms">Ms</label></div><div class="form__field-wrapper   "><input type="radio" class="form__field form__field--radio" id="Title_Miss" name="Title" value="Miss" data-gtm-form-interact-field-id="5"><label class="form__label--radio" for="Title_Miss">Miss</label></div></div>`;

      document.querySelector("form[data-stage='9'] .form__field-wrapper--title").insertAdjacentHTML('afterend', titleHtml);
      const selectElement = document.getElementById('Title');
      const radioButtons = document.querySelectorAll('form[data-stage="9"] .form__field--radio');

      radioButtons.forEach((radio) => {
        radio.addEventListener('change', () => {
          // When a radio button is selected, update the <select> element
          selectElement.value = radio.value;
        });
      });
    });
  }
}

export default () => {
  setup();

  fireEvent('Conditions Met');

  // document.body.addEventListener('click', (e) => {
  //   const { target } = e;

  //   if (target.closest(`.btn--next[type="submit"]`)) {
  //     const addressElem = document.querySelector("#Address");
  //     const isStepThree = document.querySelector("form[data-stage='3']");
  //     const submitBtn = target.closest(`.btn--next[type="submit"]`);

  //     if (addressElem && !addressElem.value.length > 0) {
  //       submitBtn.setAttribute('disabled', 'disabled');
  //     } else if (addressElem && addressElem.value.length > 0) {
  //       submitBtn.removeAttribute('disabled');
  //     }
  //   }
  // });

  if (VARIATION == 'control') {
    return;
  }

  startExperiment();
};
