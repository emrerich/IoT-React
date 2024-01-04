import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { getAuth } from "firebase/auth";
import * as Yup from "yup";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { useFormik } from "formik";
import { updateProfile } from "firebase/auth";
import { useRouter } from "next/router";

export const AccountProfileDetails = () => {
  const auth = getAuth();
  const router = useRouter();
  const cUser = auth.currentUser;
  const formik = useFormik({
    initialValues: {
      email: cUser.email,
      password: "",
      submit: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        console.log(values);
        await createUserWithEmailAndPassword(auth, values.email, values.password);
        const user = auth.currentUser;
        const additionalInfo = {
          firstName: "",
          lastName: "",
          phone: "",
          weight: "",
          height: "",
          email: cUser.email,
        };
        const userDocRef = doc(firestore, "users", user.uid);
        await setDoc(userDocRef, { additionalInfo }, { merge: true });

        router.push("/");
      } catch (err) {
        console.log(err);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    weight: "",
    height: "",
  });
  const fetchData = async () => {
    try {
      const user = auth.currentUser;

      // Fetch additional user information from Firestore
      const userDocRef = doc(firestore, "users", user.uid);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        setValues(userData);
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch user data when the component mounts
  }, []);
  const firestore = getFirestore();
  const handleChange = (event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      const user = auth.currentUser;

      // Step 3: Store additional information in Firestore
      const additionalInfo = {
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        weight: values.weight,
        height: values.height,
      };
      updateProfile(auth.currentUser, {
        displayName: values.firstName + " " + values.lastName,
        additionalInfo: additionalInfo,
      });
      const userDocRef = doc(firestore, "users", user.uid);
      setDoc(userDocRef, additionalInfo, { merge: true });
      router.push("/");
    } catch (err) {
      console.log(err);
      formik.setStatus({ success: false });
      formik.setErrors({ submit: err.message });
      formik.setSubmitting(false);
    }
  };

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Please specify the first name"
                  label="Ad"
                  name="firstName"
                  onChange={handleChange}
                  required
                  value={values.firstName}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Soy İsim"
                  name="lastName"
                  onChange={handleChange}
                  required
                  value={values.lastName}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email Adresi"
                  name="email"
                  onChange={handleChange}
                  required
                  value={cUser.email}
                  disabled
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Telefon"
                  name="phone"
                  onChange={handleChange}
                  type="number"
                  value={values.phone}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Kilo"
                  name="weight"
                  onChange={handleChange}
                  type="number"
                  value={values.weight}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Boy"
                  name="height"
                  onChange={handleChange}
                  value={values.height}
                ></TextField>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button type="submit" variant="contained">
            Güncelle
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
