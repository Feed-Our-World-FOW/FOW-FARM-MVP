export interface AllFarmsInterface {
  data: {
    data: {
      data: [
        {
          name: string,
          description: string,
          summery: string,
          imageCover: string,
          images: string,
          meat: boolean,
          produce: boolean,
          ratingsAverage: number,
          ratingsQuantity: number,
          _id: string
        }
      ]
    }
  }
}

export interface FarmDetailsInterface {
  name: string,
  description: string,
  summery: string,
  imageCover: string,
  images: string,
  location: {
    address: string
  },
  meat: boolean,
  produce: boolean,
  ratingsAverage: number,
  ratingsQuantity: number,
  _id: string,
  id: string
}

export interface FarmCardInterface {
  name: string,
  images: string,
  location: {
    address: string
  },
  meat: boolean,
  produce: boolean,
  ratingsAverage: number
}

export interface RouterQueryInterface {
  data: string,
  [key: string]: string | string[]
}

export interface SignupFormInterface {
  name: string,
  email: string,
  password: string,
  passwordConfirm: string
}

export interface LoginFormInterface {
  email: string,
  password: string
}
