/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, getSiteFromHostname } from './services';
import { events } from '../../../../../lib/utils';
import shared from './shared';

const { ID, VARIATION } = shared;

export default () => {
  if(VARIATION == 'control') {
    events.send(`${ID} - Control`, 'Fired');
  } else {
    events.send(`${ID} - V` + VARIATION, 'Fired');

    setup();

    const closedStores = ['3304','4074','4420','3417','3490','4387','4396','4397','4399','4614','4650','4651','4665','3011','3017','3025','3036','3045','3048','3060','3067','3069','3072','3089','3093','3098','3099','3103','3105','3124','3144','3170','3173','3174','3178','3182','3183','3188','3191','3194','3197','3203','3204','3221','3223','3228','3235','3237','3249','3259','3260','3268','3272','3284','3293','3294','3310','3330','3331','3335','3343','3350','3357','3372','3374','3386','3393','3413','3437','3438','3439','3441','3442','3443','3445','3446','3447','3450','3459','3461','3462','3466','3467','3474','3478','3480','3483','3491','3492','3493','3495','3496','3508','4010','4015','4018','4021','4022','4025','4026','4031','4034','4045','4047','4048','4055','4056','4062','4064','4066','4079','4081','4090','4103','4105','4107','4108','4111','4120','4123','4128','4133','4136','4137','4140','4142','4143','4146','4147','4148','4151','4153','4156','4160','4162','4172','4177','4182','4183','4188','4192','4196','4198','4203','4205','4210','4214','4217','4218','4219','4222','4229','4232','4235','4236','4240','4244','4250','4259','4271','4277','4279','4299','4306','4307','4308','4310','4314','4317','4319','4322','4323','4328','4331','4332','4333','4336','4340','4341','4342','4345','4354','4358','4368','4370','4371','4374','4380','4381','4407','4410','4417','4442','4452','4460','4461','4462','4469','4470','4475','4495','4496','4499','4503','4521','4540','4541','4572','4576','4582','4592','4595','4608','4611','4623','4624','4628','4637','4647','4648','4649','4654','4656','4658','4661','4663','4664','4668','4669','4670','3308','3407','3430','4181','4405','4411','4574','4588','4643','3165','3180','3208','3236','3244','3340','3352','3485','3489','4005','4013','4086','4095','4104','4113','4116','4119','4150','4159','4199','4270','4330','4400','4424','4644','4646','4671','3476','4033','4069','4094','4230','4276','4324','4343','4631'];
    const tempStores = ['3014','3086','3117','3157','3195','3226','3254','3255','3275','3290','3296','3314','3338','3339','3341','3348','3353','3368','3410','3412','3440','3449','3451','3454','3468','3469','3470','3472','3473','3482','3484','3494','3497','3498','3505','3506','3507','4027','4030','4032','4049','4054','4078','4101','4132','4138','4191','4227','4253','4267','4273','4281','4309','4344','4347','4359','4375','4468','4570','4571','4578','4581','4589','4596','4612','4662','4675','4680','4681','4685','3349','3444','4577','4655','4667','3220','3239','4293','4666'];
    const url = window.location.href;


    const loopThroughStores = () => {

      let searchResults; 

      if(getSiteFromHostname() == 'hsamuel') {
        searchResults = document.querySelectorAll('.searchResults tbody tr');
      } else {
        searchResults = document.querySelectorAll('.search-results .search-results__store');
      }

      for (let index = 0; index < searchResults.length; index += 1) {

        const element = searchResults[index];
        const storeID = element.querySelector('a').getAttribute('data-store-number');

        if(storeID) {
          if(closedStores.indexOf(storeID) > -1) {

            element.classList.add(`${ID}-closed`);

            const storeClosedBlock = `<div class="${ID}-storeClosed"><span>Temporarily Closed</span></div>`;


            if(getSiteFromHostname() == 'hsamuel') {
              element.querySelector('.storeOpeningTimes').insertAdjacentHTML('afterbegin', storeClosedBlock);
            } else {
              element.querySelector('.store-opening-time').insertAdjacentHTML('afterbegin', storeClosedBlock);
            }
          }
          else if(tempStores.indexOf(storeID) > -1) {

            //element.classList.add(`${ID}-closed`);

            const storeClosedBlock = `<div class="${ID}-storeClosed tempStore"><span>Open For Click & Collect Only</span></div>`;


            if(getSiteFromHostname() == 'hsamuel') {
              element.querySelector('.storeOpeningTimes').insertAdjacentHTML('afterbegin', storeClosedBlock);
            } else {
              element.querySelector('.store-opening-time').insertAdjacentHTML('afterbegin', storeClosedBlock);
            }
          }
        }
      }
    }

    const addCovidMessage =() => {
      document.body.classList.add(`${ID}-storeClosed`);
      
      const message = document.createElement('div');
      message.classList.add(`${ID}-storeClosed-message`);
      message.innerHTML = `<h3>Temporarily Closed</h3>
      <p>Due to Covid-19 measures, this store has temporarily closed.</p>`;

      if(getSiteFromHostname() == 'hsamuel') {
        document.querySelector('.storeDetails').insertAdjacentElement('afterbegin' , message);
      } else {
        document.querySelector('.store-summary').insertAdjacentElement('afterbegin' , message);
      }
    }

    const addCollectMessage =() => {
      
      const message = document.createElement('div');
      message.classList.add(`${ID}-storeClosed-message`);
      message.innerHTML = `<h3>Store Available for Click and Collect</h3>
      <p>This store is currently open for click and collect orders only. To use click and collect, please place an order online and select this store in checkout.</p>`;

      if(getSiteFromHostname() == 'hsamuel') {
        document.querySelector('.storeDetails').insertAdjacentElement('afterbegin' , message);
      } else {
        document.querySelector('.store-summary').insertAdjacentElement('afterbegin' , message);
      }
    }

    for (let index = 0; index < tempStores.length; index++) {
      const element = tempStores[index];
      if (url.indexOf(element) > -1){
        addCollectMessage();
        break;
      }
      
    }

    if(url.indexOf('showStoreSearchResults') > -1) {
      loopThroughStores();
    }
    
    for (let index = 0; index < closedStores.length; index++) {
      const element = closedStores[index];
      if (url.indexOf(element) > -1){
        addCovidMessage();
        break;
      }
      
    }

  }
};











