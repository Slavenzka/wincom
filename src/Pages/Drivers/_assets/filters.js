import { VehicleOwners } from 'utils/const'

export const filterDrivers = {
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
}
