import { number } from "zod"

type Activity = {
  id: string
  title: string
  date: Date
  description: string
  category: string
  isCancelled: boolean
  city: string
  venue: string
  latitude: number
  longitude: number
  attendees: Profile[]
  isGoing: boolean
  isHost: boolean
  hostId: string
  hostDisplayName: string
  hostImageUrl: string


}

type Profile =
  {
    // imageUrl: string | undefined
    id: string
    displayName: string
    bio?: string
    imageUrl?: string
    followersCount?: number
    followingCount?: number
    following?: boolean

  }

type Photo = {
  id: string
  url: string
}
type User =
  {
    id: string
    email: string
    displayName: string
    imageUrl?: string
    // imageUrl: string | undefined
    
  }

type ChatComment = {
  id: string
  createAt: string
  body: string
  userId: string
  displayname: string
  imageUrl?: string

}


type LocationIQSuggestoin = {
  place_id: string
  osm_id: string
  osm_type: string
  licence: string
  lat: string
  lon: string
  boundingbox: string[]
  class: string
  type: string
  display_name: string
  display_place: string
  display_address: string
  address: LocationIQAddress
}

type LocationIQAddress = {
  name: string
  house_number: string
  road: string
  suburb?: string
  city: string
  county?: string
  state: string
  postcode: string
  country: string
  country_code: string
  neighbourhood?: string
  town?: string
  village?: string
  city?: string
}
