import React from 'react'
import Heading from './Heading'
import { HeadingTypes } from 'utils/const'

export default {
  title: 'Components/Heading',
  component: Heading
}

const Template = args => <Heading {...args} />

export const h2 = Template.bind({})
h2.args = {
  label: 'Some test heading',
  type: HeadingTypes.H2
}
