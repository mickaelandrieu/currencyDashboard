export default class Currency {
  constructor (fromApiData) {
    this.rawData = fromApiData
  }

  get name () {
    return this.rawData['name']
  }

  get percentChanges () {
    return {
      '1h': this.rawData['percent_change_1h'],
      '24h': this.rawData['percent_change_24h'],
      '7d': this.rawData['percent_change_7d']
    }
  }

  get price () {
    return this.rawData['price_eur']
  }

  get rank () {
    return this.rawData['rank']
  }
}
