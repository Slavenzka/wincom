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
    const { isCloseBtnRequired = true, isContentOnly = false, isLoading = false, callbackOnClose } = options

    const handleCloseModal = () => {
      dispatch(toggleModal(null))
      callbackOnClose && callbackOnClose()
    }

    const handleEscPress = useCallback(evt => {
      if (evt.key === 'Escape') {
        handleCloseModal()
      }
    }, [dispatch])

    const handleClickOutside = useCallback(evt => {
      if (modalRef.current && evt.target === modalRef.current) {
        handleCloseModal()
      }
    }, [dispatch, options])

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
      document.addEventListener('click', handleClickOutside)

      return () => {
        document.removeEventListener('keydown', handleEscPress)
        document.removeEventListener('click', handleClickOutside)
      }
    }, [handleEscPress, handleClickOutside])

    return (
      <>
        <div
          className={classnames(css.wrapper, {
            [css.wrapperOpened]: !!content
          })}
          ref={modalRef}
        >
          <div
            className={classnames(css.content, {
              [css.contentOnly]: isContentOnly,
              [css.contentLoading]: isLoading,
            })}
          >
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
