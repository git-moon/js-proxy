import client from "./core/client"

export const getReservations = async () => {
  const url = ""
  const { reservations } = await client.get(url)
  return reservations
}

export const getReservationsJson = async () => {
  const result = (await import('./data/reservations.json')).default
  const { reservations } = result
  return reservations
}
