import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { OverviewBudget } from "src/sections/overview/overview-budget";
import { OverviewSales } from "src/sections/overview/overview-sales";
import { OverviewTasksProgress } from "src/sections/overview/overview-tasks-progress";
import { OverviewTotalCustomers } from "src/sections/overview/overview-total-customers";
import { OverviewTotalProfit } from "src/sections/overview/overview-total-profit";
import { OverviewTraffic } from "src/sections/overview/overview-traffic";
import { useState, useEffect } from "react";
import { getFirestore, collection, onSnapshot, query, getDocs } from "firebase/firestore";

const Page = () => {
  const [movements, setMovements] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const db = getFirestore();
        const movesCollection = collection(db, "Moves");
        const moveQuerySnapshot = await getDocs(query(movesCollection));

        if (isMounted) {
          const movesData = moveQuerySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          const filteredMovesData = movesData.filter(
            (move) => move.move !== "Nabiz" && move.move !== "Stop"
          );

          console.log(filteredMovesData);
          setMovements(filteredMovesData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);
  function mergeCounters(movements) {
    // movesData'dan counter değerlerini al ve birleştir
    const counters = movements.map((move) => move.counter);

    return counters;
  }
  function mergeMoves(movements) {
    const moves = movements.map((move) => move.move);

    return moves;
  }
  const movesArray = mergeMoves(movements);
  const countersArray = mergeCounters(movements);
  const totalCalories = movements.reduce((total, move) => total + move.calorie * move.counter, 0);
  const percentageCompleted = ((totalCalories / 7500) * 100).toFixed(2);

  return (
    <>
      <Head>
        <title>Ana Sayfa</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={3} justifyContent="space-around" alignItems="center">
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTotalCustomers
                difference={1}
                positive={true}
                sx={{ height: "100%" }}
                value={`${totalCalories} Kalori`}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTasksProgress sx={{ height: "100%" }} value={percentageCompleted} />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTotalProfit sx={{ height: "100%" }} value="1.75 m" kilo="70 kg" />
            </Grid>
            <Grid xs={12} lg={8}>
              <OverviewSales
                chartSeries={[
                  {
                    name: "Bu Hafta",
                    data: countersArray,
                  },
                  {
                    name: "Geçen Hafta",
                    data: countersArray,
                  },
                ]}
                sx={{ height: "100%" }}
                categories={movesArray}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4}>
              <OverviewTraffic
                chartSeries={countersArray}
                labels={movesArray}
                sx={{ height: "100%" }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
