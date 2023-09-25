import Component from "../core/Component"
import { defaultDateformat as dateformat } from "../util"

export default class Reservation extends Component {
  /**
   * @typedef {object} ReservationValue
   * @property {object} customer
   * @property {string} id
   * @property {Array} menus
   * @property {string} status
   * @property {Array} tables
   * @property {string} timeRegistered
   * @property {string} timeReserved
   */

  setData() {
    // 상태 정보 하드코딩
    const statusTxt = {
      reserved: { name: 'reserved', text: '예약', color: '#3BB94C', next: 'seated' },
      seated: { name: 'seated', text: '착석', color: '#162149', next: 'done' },
      done: { name: 'done', text: '퇴석', color: null, next: null }
    }

    this.data = { statusTxt }
    this.data.reservation = { ...this.props.reservation }
  }

  selectReserv = () => {
    const reserv = { ...this.data.reservation }
    this.ePublish('selectReservation', reserv)
  }

  setMethods() {
    this.methods = {
      clickBody: () => {
        const el = this.$target.querySelector(`[data-component="${this.cKey}"]`)
        el.addEventListener('click', (e) => {
          e.preventDefault()
          this.selectReserv()
        })
      },
      clickBtn: () => {
        const el = this.$target.querySelector(`[data-component="${this.cKey}"]`)
        const btn = el.querySelector('.reservation__tail > button')
        btn.addEventListener('click', (e) => {
          e.stopPropagation()
          const st = this.getStatus()
          if (st.next) {
            this.data.reservation.status = st.next

            // 위에서 상태 변경 후
            // 그 다음의 버튼 텍스트가 없으면 제거
            if (this.getBtnStatusTxt()) {
              this.reRender()
              if (this.props.isMobile === false) {
                this.selectReserv()
              }
            } else {
              el.remove()
            }
          }
        })
      }
    }
  }

  // 현재 상태 정보를 가져온다.
  getStatus = () => {
    const { reservation } = this.data
    return this.data.statusTxt?.[reservation.status]
  }

  // 현재 상태 텍스트를 가져온다.
  getStatusTxt = () => {
    const st = this.getStatus()
    return st.name === 'seated' ? st.text + ' 중' : st.text
  }

  // 버튼은 다음 단계의 텍스트를 입력한다.
  getBtnStatusTxt = () => {
    const st = this.getStatus()
    if (st?.next) {
      const next = this.data.statusTxt[st.next]
      return next.text
    }
    return null
  }
  
  // 테이블 표기 텍스트
  getTableTxt = () => {
    const { tables } = this.data.reservation
    const defaultTxt = tables[0].name

    if (tables.length > 1) {
      const subTables = tables.slice(1)
      const subTxt = subTables.map(s => s.name).join(', ')
      return `${defaultTxt} [, ${subTxt}]`
    } else {
      return defaultTxt
    }
  }

  // 손님 표기 텍스트
  getCustomerTxt = () => {
    const { customer: { adult, child } } = this.data.reservation
    const ad = adult.toString().padStart(2, '0')
    const ch = child.toString().padStart(2, '0')
    return `성인 ${ad} 아이 ${ch}`
  }

  // 메뉴 표기 텍스트
  getMenuTxt = () => {
    const { menus } = this.data.reservation
    const defaultTxt = `${menus[0].name}(${menus[0].qty})`

    if (menus.length > 1) {
      const subMenus = menus.slice(1)
      const subTxt = subMenus.map(m => `${m.name}(${m.qty})`).join(', ')
      return `${defaultTxt} [, ${subTxt}]`
    } else {
      return defaultTxt
    }
  }

  template() {
    const { reservation } = this.data

    return `
      <div class="reservation" data-component="${ this.cKey }">
        <div class="reservation__header">
          <p class="header__time mb-3">
            ${ dateformat(reservation.timeReserved) }
          </p>
          <p class="header__status" style="color: ${ this.getStatus().color }">
            ${ this.getStatusTxt() }
          </p>
        </div>
        <div class="reservation__body">
          <p class="body__name-table mb-2">
            ${ reservation.customer.name } - ${ this.getTableTxt() }
          </p>

          <p class="body__customers mb-2">
            ${ this.getCustomerTxt() }
          </p>

          <p class="body__menu mb-0">
            ${ this.getMenuTxt() }
          </p>
        </div>
        <div class="reservation__tail">
          <button>
            ${ this.getBtnStatusTxt() }
          </button>
        </div>
      </div>
    `
  }
}