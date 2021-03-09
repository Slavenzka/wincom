import { VehicleOwners } from 'utils/const'

export const filterCarPark = {
  primary: {
    field: 'owner',
    list: [
      {
        label: 'All Cars',
        values: [],
        isDefault: true,
      },
      {
        label: 'WINCOM Cars',
        values: [VehicleOwners.WINCOM],
      },
      {
        label: 'Partner Cars',
        values: [VehicleOwners.PARTNER],
      },
    ]
  },
  secondary: {
    field: 'type',
    list: [
      {
        label: 'All',
        values: [],
        isDefault: true,
      },
      {
        label: 'Economy',
        values: ['ECONOMY'],
      },
      {
        label: 'Comfort',
        values: ['COMFORT'],
      },
      {
        label: 'Premium',
        values: ['PREMIUM'],
      },
    ]
  },
}
