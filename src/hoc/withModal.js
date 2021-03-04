import React, { useCallback, useEffect, useRef } from 'react'
import css from './withModal.module.scss'
import classnames from 'classnames'
import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock'
import { useDispatch, useSelector } from 'react-redux'
import { toggleModal } from 'store/actions'
import IconClose from 'assets/icons/IconClose'

const withModal = WrappedComponent => {
  return props => {
    const modalRef = useRef(null)
    const modal = useSelector(state => state.ui.modal)
    const dispatch = useDispatch()
    const { content, options = {} } = modal
    const { isCloseBtnRequired = true } = options

    const handleEscPress = useCallback(evt => {
      if (evt.key === 'Escape') {
        dispatch(toggleModal(null))
      }
    }, [dispatch])

    const handleCloseModal = () => dispatch(toggleModal(null))

    useEffect(() => {
      if (!!content && modalRef.current) {
        disableBodyScroll(modalRef.current, {
          reserveScrollBarGap: true,
        })
      } else {
        clearAllBodyScrollLocks()
      }
    }, [content])

    useEffect(() => {
      document.addEventListener('keydown', handleEscPress)

      return () => {
        document.removeEventListener('keydown', handleEscPress)
      }
    }, [handleEscPress])

    return (
      <>
        <div
          className={classnames(css.wrapper, {
            [css.wrapperOpened]: !!content
          })}
          ref={modalRef}
        >
          <div className={css.content}>
            {isCloseBtnRequired &&
              <button
                className={css.button}
                onClick={handleCloseModal}
                type='button'
              >
                <IconClose className={css.icon} />
                Close modal
              </button>
            }
            { content }
          </div>
        </div>
        <WrappedComponent {...props} />
        </>
    )
  }
}

export default withModal
