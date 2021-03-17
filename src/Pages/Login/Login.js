import React, { useState } from 'react'
import css from './Login.module.scss'
import { useForm } from 'react-hook-form'
import Input from 'components/Input/Input'
import Button from 'components/Button/Button'
import { ButtonHeights, LocalStorageAuthFields, ResponseStatuses } from 'utils/const'
import axiosWincom from 'axiosWincom'
import { Link, useHistory } from 'react-router-dom'
import { REGISTER, LOGIN, HOME_PAGE } from 'Pages/Routes'
import withModal from 'hoc/withModal'
import { useDispatch } from 'react-redux'
import { setAuthStatus, toggleModal } from 'store/actions'
import ModalError from 'components/Modal/ModalError/ModalError'

const Login = ({isRegistration}) => {
  const [isSubmitting, setSubmittingStatus] = useState(false)
  const history = useHistory()

  const FormSettings = {
    EMAIL: {
      label: `Login`,
      name: `wincom-login`,
      placeholder: `Your login...`,
    },
    PASSWORD: {
      label: `Password`,
      name: `wincom-password`,
      placeholder: `Your password...`,
    },
  }

  const dispatch = useDispatch()
  const {register, handleSubmit} = useForm()
  const {EMAIL, PASSWORD} = FormSettings

  const handleLogin = data => {
    setSubmittingStatus(true)

    axiosWincom.get(`/user/login`,{
      auth: {
        username: data[EMAIL.name],
        password: data[PASSWORD.name]
      },
    })
      .then(response => {
        setSubmittingStatus(false)
        const authHeader = response?.headers?.authorization
        const token = authHeader ? authHeader.split(' ')[1] : null

        if (token) {
          localStorage.setItem(LocalStorageAuthFields.TOKEN, response?.headers?.authorization.split(' ')[1])
          dispatch(setAuthStatus(true))
        }
      })
      .catch(error => {
        setSubmittingStatus(false)
        const responseStatus = error?.response?.status

        if (responseStatus && !Number.isNaN(+responseStatus) && +responseStatus === ResponseStatuses.UNAUTHORIZED) {
          dispatch(toggleModal(
            <ModalError
              title={ `Wrong authentication data` }
              descriptor={ `Please, check your login/password and try to log in again. Otherwise proceed to user registration.` }
              buttonLabel={ `Go back` }
              buttonClickHandler={() => dispatch(toggleModal(null))}
            />
          ))
        }
      })
  }

  const handleRegister = data => {
    axiosWincom.post(`/user/register`, {
        email: data[EMAIL.name],
        password: data[PASSWORD.name],
        type: 'CUSTOMER'
      }
    )
      .then(response => {
        if (response && response?.email === data[EMAIL.name]) {
          history.push({
            pathname: LOGIN
          })
        }
      })
      .catch(error => {
        console.log(2)
        dispatch(toggleModal(<div style={{ color: 'black' }}>Something went wrong</div>))
      })
  }

  return (
    <div className={css.wrapper}>
      <h2 className={css.heading}>
        {isRegistration
          ? `Register in WINCOM system`
          : `Login to WINCOM system`
        }
      </h2>
      <form onSubmit={handleSubmit(data => isRegistration ? handleRegister(data) : handleLogin(data))}>
        <div className={css.form}>
          <Input
            label={ EMAIL.label }
            register={register({
              required: true
            })}
            name={ EMAIL.name }
            placeholder={ EMAIL.placeholder }
            className={css.input}
            isAuthStyle
          />
          <Input
            label={ PASSWORD.label }
            register={register({
              required: true
            })}
            name={ PASSWORD.name }
            placeholder={ PASSWORD.placeholder }
            type={ `password` }
            className={css.input}
            isAuthStyle
          />
          <Button
            className={css.button}
            height={ButtonHeights.LARGE}
            type={ `submit` }
            isLoading={isSubmitting}
          >
            {isRegistration ? `Register` : `Log in`}
          </Button>
          {isRegistration
            ? <Link
              className={css.link}
              to={LOGIN}
            >
              Already registered
            </Link>
            : <Link
              className={css.link}
              to={REGISTER}
            >
              Register now
            </Link>
          }
        </div>
      </form>
    </div>
  )
}

export default withModal(Login)
