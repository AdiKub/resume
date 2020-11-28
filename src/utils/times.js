import { DateTime } from "luxon";

export const convertMinutesToTime = min => {
  if (min < 60) return `${min} min.`
      const hour = Math.floor(min/60)
      return `${hour}h ${min%60 !== 0 ? min-(60*hour)+'min' : ''} `
}

export const getTime = (unix) => {
  return DateTime.fromSeconds(unix).toFormat('t')
}

export const converTime = (time) => {
  return DateTime.fromISO(`1995-12-17T${time}:00`).toFormat('t')
}