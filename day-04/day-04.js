const fs = require('fs')
const data = fs.readFileSync('./input.txt').toString()

const passports = data.split('\n\n')
  .map(passport => {
    return passport.split('\n').join(' ')
  })
  .map(passport => passport.split(' ')
    .map(item => item.split(':')))
  .map(passport => {
    return passport
      .reduce((pass, item) => {
        const [key, value] = item
        return {
          ...pass,
          [key]: value
        }

      }, {})
  })

const REQUIRED_KEYS = [
  'byr', // (Birth Year)
  'iyr', // (Issue Year)
  'eyr', // (Expiration Year)
  'hgt', // (Height)
  'hcl', // (Hair Color)
  'ecl', // (Eye Color)
  'pid', // (Passport ID)
  //'cid' // (Country ID)
]

const passportValidity = passports
  .filter(passport => {
    return REQUIRED_KEYS.every(reqKey => {
      return passport.hasOwnProperty(reqKey)
    })
  })
  .filter(validatePassport)

function validatePassport(passport) {
  const {
    byr: birthYear,
    iyr: issued,
    eyr: expiration,
    hgt: height,
    hcl: hairColor,
    ecl: eyeColor,
    pid: passportId
  } = passport
  const yearValidator = /^\d{4}$/

  if (!/^#[a-f0-9]{6}$/.test(hairColor)) return false

  if (yearValidator.test(birthYear) && yearValidator.test(issued) && yearValidator.test(expiration)) {
    const by = parseInt(birthYear)
    const iy = parseInt(issued)
    const exp = parseInt(expiration)
    if (by < 1920 || by > 2002 || iy < 2010 || iy > 2020 || exp < 2020 || exp > 2030) return false
  } else {
    return false
  }
  if (!validPassportId(passportId)) return false
  if (!validEyeColor(eyeColor)) return false
  if (!validHeight(height)) return false
  return true
}

function validHeight(heightStr) {
  const strValidator = /^(\d+)(in|cm)$/
  if (!strValidator.test(heightStr)) return false
  const [,numStr, units] = strValidator.exec(heightStr)
  const num = parseInt(numStr)
  const min = units === 'in' ? 59 : 150
  const max = units === 'in' ? 76 : 193
  return num >= min && num <= max
}

function validEyeColor(ec) {
  const VALID_EYE_COLORS = [
    'amb',
    'blu',
    'brn',
    'gry',
    'grn',
    'hzl',
    'oth'
  ]
  return VALID_EYE_COLORS.some(color => ec === color)
}


function validPassportId(id) {
  return /^\d{9}$/.test(id)
}

console.log('1234', validPassportId('1234'))
console.log('012345678', validPassportId('012345678'))

console.log(passportValidity.length)