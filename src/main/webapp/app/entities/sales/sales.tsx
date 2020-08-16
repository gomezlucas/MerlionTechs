import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';
import { getEntities } from './sales.reducer';
import { ISales } from 'app/shared/model/sales.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { makeStyles } from '@material-ui/core/styles'
import Button2 from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import VisibilityIcon from '@material-ui/icons/Visibility';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import green from '@material-ui/core/colors/green';
import 'fontsource-roboto';



export interface ISalesProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}


const useStyles = makeStyles({
  table: {
    minWidth: 800,
  },
  paperStyle: {
    backgroundColor: "#EBEBEB",
    padding: "2rem 2rem"

  },
  headerStyle: {
    marginBottom: "1rem",
  },
  buttonStyle: {
    backgroundColor: "#004f87",
    '&:hover': {
      background: "#5E99C5",
     },
  },
  TableCellStyle: {
    backgroundColor: "#2a6a9a",
    color: "#FFFFFF",
  },
  RowCellStyle: {
    backgroundColor: "#FFFFFF",
    '&:hover': {
      background: "#5e98c57c",
    },
  },
  EditButton: {
    color: "green",
  },

  LinkStyle:{
    textDecoration: "none",
  }
})

export const Sales = (props: ISalesProps) => {
  const classes = useStyles()


  useEffect(() => {
    props.getEntities();
  }, []);

  const { salesList, match, loading } = props;
  return (
    <div className={classes.paperStyle}>

      <Grid container
          justify="space-between"
          alignItems="center"
          className={classes.headerStyle}
        >
          <Grid item>
            <Typography variant="h4" >
              Sales
            </Typography>
          </Grid>
          <Grid item>
          <Link to={`${match.url}/new`} style={{ textDecoration: 'none' }}  >
            <Button2
              variant="contained"
              color="primary"
              className={classes.buttonStyle}
              startIcon={<AddIcon />}
            >
              Agregar Nueva Venta
            </Button2>
            </Link>
          </Grid>
        </Grid>


        {salesList && salesList.length > 0 ? (
          <Paper >
           <Grid container>
          <TableContainer component={Paper} >
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className={classes.TableCellStyle}> <Typography >
                    ID
                  </Typography> </TableCell>
                  <TableCell className={classes.TableCellStyle} align="left"><Typography  >
                    DESCRIPCION
                  </Typography> </TableCell>
                  <TableCell className={classes.TableCellStyle} align="left"><Typography  >
                    ESTADO
                  </Typography> </TableCell>
                  <TableCell className={classes.TableCellStyle} align="left"><Typography >
                    FECHA
                  </Typography></TableCell>
                  <TableCell className={classes.TableCellStyle} align="left"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

              {salesList.map((sales, i) => (
                  <TableRow key={`entity-${i}`}  className={classes.RowCellStyle} >
                    <TableCell>
                      <Link style={{ textDecoration: 'none' }} to={`${match.url}/${sales.id}`}><Typography >
                      {sales.id}
                      </Typography></Link>
                    </TableCell>
                    <TableCell align="left" >{sales.description}</TableCell>
                    <TableCell align="left" >{sales.state}</TableCell>
                    <TableCell align="left" > {sales.date ? <TextFormat type="date" value={sales.date} format={APP_LOCAL_DATE_FORMAT} /> : null}</TableCell>
                    <TableCell align="right" >
                      <Link to={`${match.url}/${sales.id}`}><IconButton color="primary" aria-label="ver la venta">
                      <VisibilityIcon />
                      </IconButton>
                      </Link>

                      <Link to={`${match.url}/${sales.id}/edit`}><IconButton className={classes.EditButton} aria-label="Editar la venta">
                      <EditIcon />
                      </IconButton>
                      </Link>

                      <Link to={`${match.url}/${sales.id}/delete`} >
                        <IconButton color="secondary" aria-label="Eliminar  la venta">
                      <DeleteOutlineIcon />
                      </IconButton>
                      </Link>
                  </TableCell>
                  </TableRow>
              ))}
                </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        </Paper>
      )  : (
                  <div className="alert alert-warning">
            <Translate contentKey="testApp.sales.home.notFound">No Sales found</Translate>
          </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ sales }: IRootState) => ({
  salesList: sales.entities,
  loading: sales.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Sales);
