import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Grid, Modal, Box } from "@mui/material";
import { useState, useEffect } from "react";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";

const Moves = () => {
  const [movements, setMovements] = useState([]);
  const [selectedMove, setSelectedMove] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const db = getFirestore();
    const movesCollection = collection(db, "Moves");

    // Firestore koleksiyonundaki değişikliklere anlık olarak tepki ver
    const unsubscribe = onSnapshot(movesCollection, (querySnapshot) => {
      const movesData = [];
      querySnapshot.forEach((doc) => {
        movesData.push({ id: doc.id, ...doc.data() });
      });
      const filteredMovesData = movesData.filter((move) => move.move !== "Stop");

      console.log(filteredMovesData);
      setMovements(filteredMovesData);
    });

    // Temizleme fonksiyonunu döndür, bileşenin unmount edildiğinde çalıştırılacak
    return () => unsubscribe();
  }, []);

  const handleOpenModal = (move) => {
    setSelectedMove(move);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedMove(null);
    setOpenModal(false);
  };

  return (
    <Grid container spacing={3}>
      {movements.map((move, index) => (
        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea onClick={() => handleOpenModal(move)}>
              <CardMedia
                component="img"
                height="200"
                image="https://cdn-icons-png.flaticon.com/512/4721/4721119.png"
                alt={move.move}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {move.move}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {move.description}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary" onClick={() => handleOpenModal(move)}>
                Hareket geçmişini gör
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="div">
            {selectedMove?.move} Counter
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Counter: {selectedMove?.counter}
          </Typography>
        </Box>
      </Modal>
    </Grid>
  );
};

export default Moves;
