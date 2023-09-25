export const defaultDateformat = (datetime) => {
  const tmp = new Date(datetime)
  const hh = tmp.getHours()
  const mm = tmp.getMinutes().toString().padStart(2, '0')
  return `${hh}:${mm}`
}

export const makeKey = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export const deepEqual = (v1, v2) => {
  // array는 체크 안한다..
  if (Array.isArray(v1) || Array.isArray(v2)) return true
  if (v1 === v2) {
    return true
  } else {
    if (typeof v1 !== typeof v2) return false
    if (typeof v1 === 'number' && typeof v2 === 'number' ) return false
    if (typeof v1 === 'string' && typeof v2 === 'string' ) return false
    if (!v1 && !!v2) return false
    if (!!v1 && !v2) return false
  }

  const keys1 = Object.keys(v1)
  const keys2 = Object.keys(v2)
  if (keys1.length !== keys2.length) return false

  let isDiff = false
  for (const key in v2) {
    if (v1.hasOwnProperty(key)) {
      isDiff = deepEqual(v1[key], v2[key]) === false
      if (isDiff) {
        break
      }
    } else {
      isDiff = true
      break
    }
  }

  return isDiff === false
}

export default {
  defaultDateformat,
  makeKey,
  deepEqual
}