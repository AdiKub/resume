export const getParamFromUrl = (param) => new URL(window.location).searchParams.get(param)
