import Component from "./core/Component"
import { getReservationsJson } from "./api/reservations"

export default class App extends Component {
  setData() {
    const { innerWidth } = window
    this.data = { isMobile: innerWidth < 1024 }
  }

  template() {
    const { isMobile } = this.data
    if (isMobile) {
      document.querySelector('div#app').classList.add('mobile')
    }
    return `
      <article>
        <div class="reservation-title mb-4">
          <h1 class="text-center"> 예약 목록 </h1>
        </div>

        <div class="row">
          <div class="${ isMobile ? 'col-12' : 'col-pc-list'}">
            <div class="reservation-list" data-component="reservation-list"></div>
          </div>
          <div class="${ isMobile ? 'col-12' : 'col-pc-details'}" data-component="reservation-details"></div>
        </div>
      </article>
    `
  }

  async created() {
    const reservations = await getReservationsJson()
    this.data.reservations = reservations
    this.renderChildren()
  }

  async renderChildren() {
    await this.renderList()
  }

  renderList = async () => {
    const { reservations } = this.data
    const Reservation = (await import('./components/Reservation')).default
    
    const target = this.$target.querySelector('[data-component="reservation-list"]')
    const showReservs = reservations.filter(reservation => reservation.status !== 'done')
    target.innerHTML = showReservs.map(reserv => {
      const r = new Reservation({ target, props: { reservation: reserv, isMobile: this.data.isMobile }, autoRender: false, isChild: true })
      return r.template()
    }).join('')

    await this.renderDetails(showReservs[0])
  }

  renderDetails = async (reservation) => {
    const { isMobile } = this.data
    let ReservationDetails
    if (isMobile) {
      ReservationDetails = (await import('./components/ReservationDetailsM')).default
    } else {
      ReservationDetails = (await import('./components/ReservationDetails')).default
    }

    const target = this.$target.querySelector('[data-component="reservation-details"]')
    new ReservationDetails({ target, props: { reservation }, autoRender: !isMobile, isChild: true })
  }
}