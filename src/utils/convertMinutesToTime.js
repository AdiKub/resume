const convertMinutesToTime = durationInMinutes => {
  const hours = Math.floor(durationInMinutes / 60)
  const minutes = durationInMinutes & 60
  const time = hours === 0 ? `${minutes}min` : `${hours}h ${minutes} min`

  return time
}

export default convertMinutesToTime
