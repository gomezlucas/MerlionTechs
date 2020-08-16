import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { ISales } from 'app/shared/model/sales.model'
import { IRootState } from 'app/shared/reducers'
import { getEntity, deleteEntity } from './sales.reducer'
import Button2 from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import BlockIcon from '@material-ui/icons/Block';


export interface ISalesDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

const useStyles = makeStyles({
  buttonStyle: {
    backgroundColor: '#004f87',
    '&:hover': {
      background: '#5E99C5'
    }
  },
  buttonsContainer: {
    marginTop: '1rem'
  }
})

export const SalesDeleteDialog = (props: ISalesDeleteDialogProps) => {
  const classes = useStyles()

  useEffect(() => {
    props.getEntity(props.match.params.id)
  }, [])

  const handleClose = () => {
    props.history.push('/sales')
  }

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose()
    }
  }, [props.updateSuccess])

  const confirmDelete = () => {
    props.deleteEntity(props.salesEntity.id)
  }

  const { salesEntity } = props
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>
        <Translate contentKey='entity.delete.title'>Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody id='testApp.sales.delete.question'>
        <Translate contentKey='testApp.sales.delete.question' interpolate={{ id: salesEntity.id }}>
          Are you sure you want to delete this Sales?
        </Translate>
      </ModalBody>
      <ModalFooter>

        <Grid container spacing={2} className={classes.buttonsContainer}>
            <Grid item>
                 <Button2
                onClick={handleClose}
                variant='contained'
                color='primary'
                className={classes.buttonStyle}
                startIcon={<BlockIcon/>}>
                  Cancelar
                </Button2>
             </Grid>
            <Grid item>
              <Button2
                onClick={confirmDelete}
                id='save-entity'
                type='submit'
                 variant='contained'
                color='primary'
                className={classes.buttonStyle}
                startIcon={<DeleteOutlineIcon />}
              >
                Eliminar
              </Button2>
            </Grid>
          </Grid>

      </ModalFooter>
    </Modal>
  )
}

const mapStateToProps = ({ sales }: IRootState) => ({
  salesEntity: sales.entity,
  updateSuccess: sales.updateSuccess
})

const mapDispatchToProps = { getEntity, deleteEntity }

type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = typeof mapDispatchToProps

export default connect(mapStateToProps, mapDispatchToProps)(SalesDeleteDialog)
