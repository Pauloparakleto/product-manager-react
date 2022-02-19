import React, {Component} from "react";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyle = makeStyles({
    root: {
        height: "3em",
        padding: "2em",
        margin: "1em",
    }
})

export default function Product(props){
    const classes = useStyle();
    function handleDelete(){
        props.deleteProduct(props.item)
    };

    return (
        <Grid container spacing={0}>
            <Grid item xs={9}>
                <Paper elevation={3} className={classes.root}>
                    {props.item.name}
                    <hr/>
                    <Button 
                        variant="contained"
                        color="secondary"
                        onClick={handleDelete}>
                        Delete
                        <DeleteIcon className={classes.rightIcon} />
                    </Button>
                </Paper>
            </Grid>
            
        </Grid>
        
    )
}