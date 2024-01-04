import PropTypes from "prop-types";
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from "@mui/material";

export const OverviewTotalProfit = (props) => {
  const { value, sx, kilo } = props;

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline">
              Boy
            </Typography>
            <Typography variant="h4">{value}</Typography>
            <Typography color="text.secondary" variant="overline">
              Kilo
            </Typography>
            <Typography variant="h4">{kilo}</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "primary.main",
              height: 56,
              width: 56,
            }}
          ></Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

OverviewTotalProfit.propTypes = {
  value: PropTypes.string,
  sx: PropTypes.object,
};
