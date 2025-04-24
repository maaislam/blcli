import { crossIcon } from '../files/data'

export const mainModal = (id) => {

    const htmlStr = `
    <div class="${id}__modal-container">
        <div class="${id}__modal">
            <div class="${id}__modal-cross-icon">${crossIcon('cross-icon')}</div>
            <div class="modal-headline">
                <p>How GoCardless works</p>
            </div>
            <div class="${id}__modal-body">
            <div class="modal-image">
                <img src="https://blcro.fra1.digitaloceanspaces.com/GCOR032/image.png" alt="odal-image">
            </div>
                <div class="modal-copy">
                    <div class="modal-lists">
                        <div>
                            <div class="modal-li item01">
                                <div class="list-header">
                                    <span class="number">01</span>
                                    <span class="copy">Sign up for free</span>
                                </div>
                                <div class="list-body">
                                    <div>
                                        Log into our dashboard or connect to your existing business software, such as
                                        Xero, Salesforce or Zuora.
                                    </div>
                                </div>
                            </div>
                            <div class="modal-li item02">
                                <div class="list-header">
                                    <span class="number">02</span>
                                    <span class="copy">Arrange payments in just a few clicks</span>
                                </div>
                                <div class="list-body">
                                    <div>
                                        <p>Set up instantly confirmed payments to take via your invoices, website, emails or
                                            even SMS. </p>
                                        <p>For easy scheduled payments, set up a Direct Debit.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-li item03">
                                <div class="list-header">
                                    <span class="number">03</span>
                                    <span class="copy">Set up, sit back, and relax</span>
                                </div>
                                <div class="list-body">
                                    <div>
                                        Businesses using GoCardless spend 59% less time on payments and save 56% on their
                                        payment costs.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="${id}__modal-footer">
                <div class="modal-signup"><a href="https://manage.gocardless.com/sign-up">Sign Up</a></div>
                <div class="modal-learn-more"><a href="https://gocardless.com/solutions/learn-more/">Learn more</a></div>
            </div>
        </div>
    </div>`;

    return htmlStr.trim();
};