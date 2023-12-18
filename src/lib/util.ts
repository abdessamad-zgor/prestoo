export const PRESTOO_COOKIE_TOKEN = "prestoo_id_token"

export function generateCode() {
  return Array(6).fill(0).reduce((acc, _)=>acc += String(Math.random()*Date.now())[Math.ceil((acc.length-1)*Math.random())], "")
}

