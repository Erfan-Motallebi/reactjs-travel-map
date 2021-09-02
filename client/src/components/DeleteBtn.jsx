import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Flash from "react-reveal/Flash";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

const DeleteBtn = React.memo(({ pinId, currentUser }) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const mutation = useMutation(async (id) => {
    const { data } = await axios.request({
      url: "api/pin",
      method: "DELETE",
      params: {
        pinId: id,
      },
    });
    return data;
  });

  const handleClickOpen = () => {
    if (currentUser === JSON.parse(localStorage.getItem("User"))) setOpen(true);
    toast.warn(
      <Flash>
        <h5>Permission denied.</h5>
      </Flash>,
      { position: toast.POSITION.TOP_CENTER }
    );
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteHandler = () => {
    handleClose();
    mutation.mutate(pinId);
  };

  if (mutation.isLoading) return <h5>takes some time to be removed </h5>;
  if (mutation.isError)
    return <h5>Something went wrong while being deleted</h5>;
  if (mutation.isSuccess) {
    queryClient.invalidateQueries("allPins");
    toast.success(
      <Flash>
        <h5>successfully deleted.</h5>
      </Flash>,
      { position: toast.POSITION.TOP_CENTER }
    );
  }
  return (
    <>
      <Button
        fullWidth
        color="secondary"
        className="delete-btn"
        onClick={handleClickOpen}
      >
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Assertion</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to delete your pin from database?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteHandler} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </>
  );
});

export default DeleteBtn;
