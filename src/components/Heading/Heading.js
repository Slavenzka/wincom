import React from 'react'
import css from './Heading.module.scss'
import classnames from 'classnames'
import { HeadingTypes } from 'utils/const'
import PropTypes from 'prop-types'

const Heading = ({
  label,
  className,
  type = HeadingTypes.H2,
  tagName,
  children
}) => {
  const TagName = type || tagName

  return (
    <TagName
      className={classnames(css.heading, className, {
        [css.h2]: type === HeadingTypes.H2,
        [css.h3]: type === HeadingTypes.H3,
      })}
    >
      { label || children }
    </TagName>
  )
}

Heading.propTypes = {
  /*
  * Heading text content
  * */
  label: PropTypes.string,
  /*
  * External css class
  * */
  className: PropTypes.string,
  /*
  * Heading style presets connected to heading tag name
  * */
  type: PropTypes.oneOf([HeadingTypes.H2, HeadingTypes.H3])
}

export default Heading
