import NextLink from "next/link";
import PropTypes from "prop-types";
import { Box, ButtonBase } from "@mui/material";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export const SideNavItem = (props) => {
  const { active = false, disabled, external, icon, path, title } = props;

  const [isAdmin, setIsAdmin] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.uid === "ZkGmab3GT8VpBlTyW82ujTpzXDs2") {
        setIsAdmin(false);
      } else {
        setIsAdmin(true);
      }
    });
    return () => unsubscribe();
    // Component unmounted olduğunda event listener'ı kaldır
  }, []);

  const linkProps = path
    ? external
      ? {
          component: "a",
          href: path,
          target: "_blank",
        }
      : {
          component: NextLink,
          href: path,
        }
    : {};

  if (isAdmin && title !== "Müşteriler") {
    return (
      <li>
        <ButtonBase
          sx={{
            alignItems: "center",
            borderRadius: 1,
            display: "flex",
            justifyContent: "flex-start",
            pl: "16px",
            pr: "16px",
            py: "6px",
            textAlign: "left",
            width: "100%",
            ...(active && {
              backgroundColor: "rgba(255, 255, 255, 0.04)",
            }),
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.04)",
            },
          }}
          {...linkProps}
        >
          {icon && (
            <Box
              component="span"
              sx={{
                alignItems: "center",
                color: "neutral.400",
                display: "inline-flex",
                justifyContent: "center",
                mr: 2,
                ...(active && {
                  color: "primary.main",
                }),
              }}
            >
              {icon}
            </Box>
          )}
          <Box
            component="span"
            sx={{
              color: "neutral.400",
              flexGrow: 1,
              fontFamily: (theme) => theme.typography.fontFamily,
              fontSize: 14,
              fontWeight: 600,
              lineHeight: "24px",
              whiteSpace: "nowrap",
              ...(active && {
                color: "common.white",
              }),
              ...(disabled && {
                color: "neutral.500",
              }),
            }}
          >
            {title}
          </Box>
        </ButtonBase>
      </li>
    );
  }
  if (!isAdmin) {
    return (
      <li>
        <ButtonBase
          sx={{
            alignItems: "center",
            borderRadius: 1,
            display: "flex",
            justifyContent: "flex-start",
            pl: "16px",
            pr: "16px",
            py: "6px",
            textAlign: "left",
            width: "100%",
            ...(active && {
              backgroundColor: "rgba(255, 255, 255, 0.04)",
            }),
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.04)",
            },
          }}
          {...linkProps}
        >
          {icon && (
            <Box
              component="span"
              sx={{
                alignItems: "center",
                color: "neutral.400",
                display: "inline-flex",
                justifyContent: "center",
                mr: 2,
                ...(active && {
                  color: "primary.main",
                }),
              }}
            >
              {icon}
            </Box>
          )}
          <Box
            component="span"
            sx={{
              color: "neutral.400",
              flexGrow: 1,
              fontFamily: (theme) => theme.typography.fontFamily,
              fontSize: 14,
              fontWeight: 600,
              lineHeight: "24px",
              whiteSpace: "nowrap",
              ...(active && {
                color: "common.white",
              }),
              ...(disabled && {
                color: "neutral.500",
              }),
            }}
          >
            {title}
          </Box>
        </ButtonBase>
      </li>
    ); // Condition sağlanmazsa hiçbir şey render etme
  }
};

SideNavItem.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  external: PropTypes.bool,
  icon: PropTypes.node,
  path: PropTypes.string,
  title: PropTypes.string.isRequired,
  condition: PropTypes.bool, // Condition prop'u eklenmiş
};