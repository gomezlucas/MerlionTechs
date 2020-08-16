import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, RouteComponentProps } from 'react-router-dom'
import { Button, Row, Col, Label } from 'reactstrap'
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation'
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IRootState } from 'app/shared/reducers'
import { makeStyles } from '@material-ui/core/styles'

import { getEntity, updateEntity, createEntity, reset } from './sales.reducer'
import { ISales } from 'app/shared/model/sales.model'
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils'
import { mapIdList } from 'app/shared/util/entity-utils'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Grid from '@material-ui/core/Grid'
import Button2 from '@material-ui/core/Button'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import SaveIcon from '@material-ui/icons/Save'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import NativeSelect from '@material-ui/core/NativeSelect'
import Input from '@material-ui/core/Input'
import FormHelperText from '@material-ui/core/FormHelperText'
import { valuesIn } from 'lodash'

export interface ISalesUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

const useStyles = makeStyles(theme => ({
  titleStyle: {
    marginBottom: '0rem'
  },
  subTitleStyle: {
    marginBottom: '2rem'
  },
  rowContainer: {
    marginBottom: '1.5rem'
  },
  paperStyle: {
    backgroundColor: '#EBEBEB',
    padding: '4rem 10rem 6rem',
    [theme.breakpoints.down('md')]: {
      padding: '2rem 2rem'
    }
  },
  buttonStyle: {
    backgroundColor: '#004f87',
    '&:hover': {
      background: '#5E99C5'
    }
  },
  buttonsContainer: {
    marginTop: '2rem'
  }
}))

export const SalesUpdate = (props: ISalesUpdateProps) => {
  const classes = useStyles()

  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id)

  const { salesEntity, loading, updating } = props
  const [description, setDescription] = useState('')
  const [state, setState] = useState('')
  const [date, setDate] = useState('')

  const handleClose = () => {
    props.history.push('/sales')
  }

  const onChangeDesc = e => {
    setDescription(e.target.value)
  }

  const onChangeState = e => {
    setState(e.target.value)
  }

  const onChangeDate = e => {
    setDate(e.target.value)
  }

  useEffect(() => {
    if (isNew) {
      props.reset()
    } else {
      props.getEntity(props.match.params.id)
    }
  }, [])

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose()
    }
  }, [props.updateSuccess])

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      if (description) {
        values = { ...values, description }
      } else {
        values = { ...values, description: salesEntity.description }
      }

      if (state) {
        values = { ...values, state }
      } else {
        values = { ...values, state: salesEntity.state }
      }

      if (date) {
        values = { ...values, date }
      } else {
        values = { ...values, date: salesEntity.date }
      }

      const entity = {
        ...salesEntity,
        ...values
      }

      if (isNew) {
        props.createEntity(entity)
        setDescription('')
        setState('')
        setDate('')
      } else {
        props.updateEntity(entity)
        setDescription('')
        setState('')
        setDate('')
      }
    }
  }

  return (
    <Paper className={classes.paperStyle} elevation={0}>
      <Typography
      variant='h4'
      className={classes.titleStyle}
      style={{marginBottom:"1rem"}}
      >
        Crear o Editar Sales
      </Typography>
      {!isNew ? (
        <Typography variant='h6' className={classes.subTitleStyle}>
          ID: {salesEntity.id}
        </Typography>
      ) : null}

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <AvForm model={isNew ? {} : salesEntity} onSubmit={saveEntity}>
          <Grid container xs={12} className={classes.rowContainer}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor='sales-description'> Descripción </InputLabel>
                <Input
                  id='sales-description'
                  aria-describedby='description-helper'
                  name='description'
                  value={description ? description : salesEntity.description}
                  onChange={e => {
                    onChangeDesc(e)
                  }}
                  onClick={() => description === '' && setDescription(salesEntity.description)}
                />
                <FormHelperText id='description-helper'>Inserte Descripción </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor='State'>Estado </InputLabel>
                <NativeSelect
                  value={state ? state : salesEntity.state}
                  onChange={e => {
                    onChangeState(e)
                  }}
                  inputProps={{
                    name: 'state',
                    id: 'sales-state'
                  }}
                  onClick={() => state === '' && setState(salesEntity.state)}
                >
                  <option value='IN_CHARGE'>IN_CHARGE </option>
                  <option value='SHIPPED'>SHIPPED</option>
                  <option value='DELIVERED'>DELIVERED</option>
                </NativeSelect>
                <FormHelperText>Seleccione el estado de la Venta</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id='sales-date'
                label='Fecha'
                type='date'
                defaultValue='2017-05-24'
                helperText="Ingrese Fecha de la Venta"
                value={date ? date : salesEntity.date}
                onChange={e => {
                  onChangeDate(e)
                }}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} className={classes.buttonsContainer}>
            <Grid item>
              <Link to='/sales' style={{ textDecoration: 'none' }}>
                <Button2 variant='contained' color='primary' className={classes.buttonStyle} startIcon={<ArrowBackIcon />}>
                  Volver
                </Button2>
              </Link>
            </Grid>
            <Grid item>
              <Button2
                id='save-entity'
                type='submit'
                disabled={updating}
                variant='contained'
                color='primary'
                className={classes.buttonStyle}
                startIcon={<SaveIcon />}
              >
                Guardar
              </Button2>
            </Grid>
          </Grid>
        </AvForm>
      )}
    </Paper>
  )
}

const mapStateToProps = (storeState: IRootState) => ({
  salesEntity: storeState.sales.entity,
  loading: storeState.sales.loading,
  updating: storeState.sales.updating,
  updateSuccess: storeState.sales.updateSuccess
})

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
}

type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = typeof mapDispatchToProps

export default connect(mapStateToProps, mapDispatchToProps)(SalesUpdate)
