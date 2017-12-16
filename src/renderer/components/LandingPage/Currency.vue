<template>
  <li>
      <table border="1">
          <thead>
              <tr>
                  <th>Name</th>
                  <th>Value (in €)</th>
                  <th>% (1h)</th>
                  <th>% (24h)</th>
                  <th>% (7d)</th>
              </tr>
          </thead>
          <tbody>
              <tr>
                  <td>{{ currency.name }}</td>
                  <td>{{ currency.price }}</td>
                  <td>{{ getLastHourValue }}</td>
                  <td>{{ getLastDayValue }}</td>
                  <td>{{ getLastWeekValue }}</td>
              </tr>
          </tbody>
      </table>
  </li>
</template>

<script>
  export default {
    props: {
      currency: {}
    },
    computed: {
      getLastHourValue () {
        return this.currency.percentChanges.hour + '%'
      },
      getLastDayValue () {
        return this.currency.percentChanges.day + '%'
      },
      getLastWeekValue () {
        return this.currency.percentChanges.week + '%'
      }
    }
  }
</script>

<style scoped></style>
