export const tooltip = (ref, pos, message) => {
  if (!ref) return;

  ref.insertAdjacentHTML(pos ? pos : 'beforeend', `
    <div class="DO001-tooltip">
      <div class="DO001-tooltip--wrap">
        <div class="DO001-tooltip--title">
          <h3>31DOVER SEAL OF APPROVAL</h3>
        </div>

        <div class="DO001-tooltip--info">
          ${message ? message : `Can we help you choose? We offer competitive pricing, next day delivery as standard, and our customer services team can recommend something you'll love.</span>`}
        </div>
      </div>
    </div>
  `)
}