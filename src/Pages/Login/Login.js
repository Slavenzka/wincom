import React, { useState } from 'react'
import css from './Login.module.scss'
import { useForm } from 'react-hook-form'
import Input from 'components/Input/Input'
import Button from 'components/Button/Button'
import { ButtonHeights, LocalStorageAuthFields } from 'utils/const'
import axiosWincom from 'axiosWincom'
import { Link, useHistory } from 'react-router-dom'
import { REGISTER, LOGIN, HOME_PAGE } from 'Pages/Routes'
import withModal from 'hoc/withModal'
import { useDispatch } from 'react-redux'
import { setAuthStatus, toggleModal } from 'store/actions'
import ModalMessage from 'components/Modal/ModalMessage/ModalMessage'

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
          history.push({
            pathname: HOME_PAGE
          })
        }
      })
      .catch(() => {
        setSubmittingStatus(false)
      })
  }

  const handleRegister = data => {
    setSubmittingStatus(true)

    axiosWincom.post(`/user/register`, {
        email: data[EMAIL.name],
        password: data[PASSWORD.name],
        type: 'CUSTOMER'
      }
    )
      .then(response => {
        setSubmittingStatus(false)

        if (response && response?.data?.email === data[EMAIL.name]) {
          dispatch(toggleModal((
            <ModalMessage
              title={ `New user was successfully registered` }
              descriptor={ `You can use associated email and password to log into the system.` }
              buttonLabel={ `Go to login page` }
              buttonClickHandler={() => {
                dispatch(toggleModal(null))
                history.push({
                  pathname: LOGIN
                })
              }}
            />
          )))
        }
      })
      .catch(error => {
        setSubmittingStatus(false)

        const errorMessage = error?.response?.data?.message
        dispatch(toggleModal((
          <ModalMessage
            title={ `Failed to register a new user` }
            descriptor={ `An error occurred during the process of user registration. Please, try again later or contact your database administrator to investigate the issue.` }
            error={errorMessage}
          />
        )))
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
