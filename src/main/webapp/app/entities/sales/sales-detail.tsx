import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, RouteComponentProps } from 'react-router-dom'
import { Button, Row, Col } from 'reactstrap'
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { IRootState } from 'app/shared/reducers'
import { getEntity } from './sales.reducer'
import { ISales } from 'app/shared/model/sales.model'
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import EditIcon from '@material-ui/icons/Edit'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button2 from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import 'fontsource-roboto'

export interface ISalesDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

const useStyles = makeStyles(theme=> ({
  root: {
    minWidth: 275,
    maxWidth: 500,
    margin: '5rem auto',
    [theme.breakpoints.down('md')]: {
      margin: '0rem auto'
    },
  },

  CardHeader: {
    background: '#2A6A9E',
    color: '#FFFFFF',
    textAlign: 'right'
  },
  title: {
    fontSize: 20
  },
  pos: {
    marginBottom: 12
  },
  buttonStyle: {
    backgroundColor: '#004f87',
    '&:hover': {
      background: '#5E99C5'
    }
  },
  EditButtonStyle: {
    color: '#FFFFFF'
  },
  avatar: {
    backgroundColor: '#FFFFFF',
    color: '#5E99C5'
  }
}))

export const SalesDetail = (props: ISalesDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id)
  }, [])

  const classes = useStyles()
  const { salesEntity } = props
  const title = salesEntity ?  `Order : ${salesEntity.id}` : null

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label='Sales' className={classes.avatar}>
            S
          </Avatar>
        }
        title={title}
        subheader='Sales'
        className={classes.CardHeader}
        action={
          <Link to={`/sales/${salesEntity.id}/edit`} style={{ textDecoration: 'none' }}>
            <IconButton aria-label='edit' className={classes.EditButtonStyle}>
              <EditIcon />
            </IconButton>
          </Link>
        }
      />
      <CardContent>
        <Typography variant='h5' component='h2'>
          Description:
        </Typography>
        <Typography className={classes.pos} color='textSecondary'>
          {salesEntity.description}
        </Typography>
        <Typography variant='h5' component='h2'>
          Date:
        </Typography>
        <Typography className={classes.pos} color='textSecondary'>
          {salesEntity.date ? <TextFormat value={salesEntity.date} type='date' format={APP_LOCAL_DATE_FORMAT} /> : null}
        </Typography>
        <Typography variant='h5' component='h2'>
          State:
        </Typography>
        <Typography className={classes.pos} color='textSecondary'>
          {salesEntity.state}
        </Typography>
      </CardContent>

      <CardActions>
        <Link to='/sales' style={{ textDecoration: 'none' }}>
          <Button2 variant='contained' color='primary' className={classes.buttonStyle} startIcon={<ArrowBackIcon />}>
            Volver
          </Button2>
        </Link>
      </CardActions>
    </Card>
  )
}

const mapStateToProps = ({ sales }: IRootState) => ({
  salesEntity: sales.entity
})

const mapDispatchToProps = { getEntity }

type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = typeof mapDispatchToProps

export default connect(mapStateToProps, mapDispatchToProps)(SalesDetail)
