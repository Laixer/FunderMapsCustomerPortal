import { hex_to_ascii } from '@/helpers/text'

export default class Address {

  id: string;
  buildingGeometry: string;
  buildingId: string;
  buildingNumber: string;
  builtYear: string;
  postalCode: string;
  street: string;
  city: string;

  constructor(
    id: string,
    buildingGeometry: string,
    buildingId: string,
    buildingNumber: string,
    builtYear: string,
    postalCode: string,
    street: string,
    city: string
  ) {
    this.id = id
    this.buildingGeometry = buildingGeometry
    this.buildingNumber = buildingNumber
    this.buildingId = buildingId
    this.builtYear = builtYear
    this.postalCode = postalCode
    this.street = street
    this.city = city
  }

  get geojson(): any {
    return JSON.parse(hex_to_ascii(this.buildingGeometry))
  }

  /**
   * This functions sums the x and y (separately) found in the 
   * geojson polygon and divides by the total number of points. 
   * 
   * This generates a coordinate for center point in the polygon
   */
  get coordinates(): string {
    const coordinates = this.geojson.coordinates[0][0]
    return coordinates.reduce((a: number[], b: number[]) => {
      return [a[0] + b[0], a[1] + b[1]]
    }).flatMap((val: number) => { return val / coordinates.length })
  }

  get label(): string {
    return this._format()
  }

  get label_compact(): string {
    return this._format(true, true, false, true)
  }

  labelWithMarkup(inputValue: string): string {
    let formatted = this._format()
    const indexOf = formatted.toLowerCase().indexOf(inputValue.toLowerCase())

    formatted = formatted.length > 32
      ? formatted.substr(0, 32 - 1) + '&hellip;'
      : formatted;

    if (indexOf >= 0) {
      const length: number = inputValue.length as number
      const end: number = indexOf + length
      return [formatted.slice(0, indexOf), '<strong>', formatted.slice(indexOf, end), '</strong>', formatted.slice(end, formatted.length)].join('')
    }

    return formatted
  }

  private _format(includeStreet = true, includeBuildingNumber = true, includePostalCode = true, includeCity = true): string {
    return `${includeStreet ? this.street : ''} ${includeBuildingNumber ? this.buildingNumber : ''}${(this.postalCode && includePostalCode) ? `, ${this.postalCode}` : ''}, ${includeCity ? this.city : ''}`.replace(/\s\s+/g, '')
  }
}