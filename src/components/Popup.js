import Component from "../core/Component"

export default class Popup extends Component {
  setData() {
    this.data = { show: false }
  }

  setMethods() {
    this.methods = {
      popupClose: () => {
        const popup = this.$target.querySelector(`[data-component="${ this.cKey }"]`)
        const background = popup.querySelector('.popup__background')
        const btn = popup.querySelector('.btn-close')

        background.addEventListener('click', (e) => {
          e.preventDefault()
          popup.classList.remove('open')
        })

        btn.addEventListener('click', (e) => {
          e.preventDefault()
          popup.classList.remove('open')
        })
      }
    }
  }

  template() {
    return `
      <div class="popup" data-component="${ this.cKey }">
        <div class="popup__background"></div>
        <div class="popup__body">
          <span class="btn-close">닫기</span>
          <div class="popup__contents"></div>
        </div>
      </div>
    `
  }

  setContents = (contents) => {
    const target = this.$target.querySelector(`[data-component="${ this.cKey }"] .popup__contents`)
    target.innerHTML = contents
  }

  toggle = () => {
    const popup = this.$target.querySelector(`[data-component="${ this.cKey }"]`)
    popup.classList.toggle('open')
  }
}