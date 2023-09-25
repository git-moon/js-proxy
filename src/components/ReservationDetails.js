import Component from "../core/Component"
import { defaultDateformat as dateformat, deepEqual } from "../util"

export default class ReservationDetails extends Component {
  setData() {
    const statusTxt = {
      reserved: { name: 'reserved', text: '예약', color: '#3BB94C', next: 'seated' },
      seated: { name: 'seated', text: '착석', color: '#162149', next: 'done' },
      done: { name: 'done', text: '퇴석', color: null, next: null }
    }

    this.data = { statusTxt }
  }

  created() {
    this.eSubscribe('selectReservation', (reserv) => {
      if (deepEqual(this.props.reservation, reserv) === false) {
        this.props = { ...this.props, reservation: reserv }
      }
    })
  }

  getStatus = () => {
    const { status } = this.props.reservation
    return this.data.statusTxt?.[status]
  }

  getStatusTxt = () => {
    const st = this.getStatus()
    return st.name === 'seated' ? st.text + ' 중' : st.text
  }

  template() {
    const { reservation } = this.props
    return `
      <div class="reservation-details" data-component="${ this.cKey }">
        <div class="row" style="margin-bottom: 3rem;">
          <div class="col-12">
            <h2 class="text-center mb-4"> 예약 정보 </h2>
          </div>

          <div class="col-3 mb-3">
            <p class="details__key"> 예약 상태 </p>
          </div>
          <div class="col-9 mb-3">
            <p class="details__value"> 
              ${ this.getStatusTxt() } 
            </p>
          </div>

          <div class="col-3 mb-3">
            <p class="details__key"> 예약 시간 </p>
          </div>
          <div class="col-9 mb-3">
            <p class="details__value"> 
              ${ dateformat(reservation.timeReserved) } 
            </p>
          </div>

          <div class="col-3">
            <p class="details__key"> 접수 시간 </p>
          </div>
          <div class="col-9">
            <p class="details__value"> 
              ${ dateformat(reservation.timeRegistered) } 
            </p>
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <h2 class="text-center mb-4"> 고객 정보 </h2>
          </div>

          <div class="col-3 mb-3">
            <p class="details__key"> 고객 성명 </p>
          </div>
          <div class="col-9 mb-3">
            <p class="details__value"> 
              ${reservation.customer.name} 
            </p>
          </div>

          <div class="col-3 mb-3">
            <p class="details__key"> 고객 등급 </p>
          </div>
          <div class="col-9 mb-3">
            <p class="details__value"> 
              ${reservation.customer.level} 
            </p>
          </div>

          <div class="col-3 mb-3">
            <p class="details__key"> 고객 메모 </p>
          </div>
          <div class="col-9 mb-3">
            <p class="details__value mulit-line-ellipsis text-center"> 
              ${reservation.customer.memo} 
            </p>
          </div>

          <div class="col-3">
            <p class="details__key"> 요청사항 </p>
          </div>
          <div class="col-9">
            <p class="details__value mulit-line-ellipsis text-center"> 
              ${reservation.customer.request} 
            </p>
          </div>
        </div>
      </div>
    `
  }
}