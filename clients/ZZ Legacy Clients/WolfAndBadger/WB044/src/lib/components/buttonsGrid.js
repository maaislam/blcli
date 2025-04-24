const renderButtons = (defaults) => {
  const htmlStr = `

    <div class="WB044__buttons--block container ">
        <div class="WB044__buttons--next flex justify-center items-center">
            <button disabled class="WB044__btn--black WB044__disabled">NEXT</button>
            <button class="WB044__btn--black WB044__enabled WB044__hide" data-nextstep="${defaults.nextStep}" data-selection="${
    defaults.selection
  }">NEXT</button>
        </div>
        <div class="WB044__buttons--secondary-block WB044__buttons--next  ${
          defaults.nextStep == 'personality' ? 'WB044__right' : ''
        }">
            <div class="WB044__buttons--exit"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M7.84291 9L0.239609 1.3967C-0.0798695 1.07722 -0.0798695 0.559064 0.239609 0.239609C0.559087 -0.0798695 1.07724 -0.0798695 1.3967 0.239609L9 7.84291L16.6033 0.239609C16.9228 -0.0798695 17.4409 -0.0798695 17.7604 0.239609C18.0799 0.559087 18.0799 1.07724 17.7604 1.3967L10.1571 9L17.7604 16.6033C18.0799 16.9228 18.0799 17.4409 17.7604 17.7604C17.4409 18.0799 16.9228 18.0799 16.6033 17.7604L9 10.1571L1.3967 17.7604C1.07722 18.0799 0.559064 18.0799 0.239609 17.7604C-0.0798695 17.4409 -0.0798695 16.9228 0.239609 16.6033L7.84291 9Z" fill="black"/>
          </svg></div>
            <div class="WB044__buttons--previous ${defaults.nextStep == 'personality' ? 'WB044__hide' : ''}" data-previous="${
    defaults.previousStep
  }">Previous question</div>
            <button class="WB044__buttons--skip" data-selection="${defaults.selection}" data-nextstep="${
    defaults.nextStep
  }">Skip</button>
        </div>
    </div>`;

  return htmlStr;
};

export default renderButtons;
