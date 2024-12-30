// react-router-dom components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Tooltip from "@mui/material/Tooltip";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import SoftAvatar from "components/SoftAvatar";

function DefaultProjectCard({
  image,
  label,
  title,
  description,
  action,
  authors,
}) {
  const renderAuthors = authors.map(({ image: media, name }) => (
    <Tooltip key={name} title={name} placement="bottom">
      <SoftAvatar
        src={media}
        alt={name}
        size="xs"
        sx={({ borders: { borderWidth }, palette: { white } }) => ({
          border: `${borderWidth[2]} solid ${white.main}`,
          cursor: "pointer",
          position: "relative",
          ml: -1.25,

          "&:hover, &:focus": {
            zIndex: "10",
          },
        })}
      />
    </Tooltip>
  ));

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "transparent",
        boxShadow: "none",
        overflow: "visible",
      }}
    >
      <SoftBox
        position="relative"
        width="100.25%"
        shadow="xl"
        borderRadius="xl"
        sx={{
          display: "flex",
          justifyContent: "center",
          minWidth: "22.5rem",
        }}
      >
        <CardMedia
          src={image}
          component="img"
          title={title}
          sx={{
            margin: 0,
            height: "15rem",
            width: "100%",
            minWidth: "22.5rem",
            boxShadow: ({ boxShadows: { md } }) => md,
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </SoftBox>
      <SoftBox pt={3} px={0.5}>
        {label && (
          <SoftBox mb={1}>
            <SoftTypography
              variant="button"
              fontWeight="regular"
              textTransform="capitalize"
              textGradient
            >
              {label}
            </SoftTypography>
          </SoftBox>
        )}
        <SoftBox mb={1}>
          {action.type === "internal" ? (
            <SoftTypography
              component={Link}
              to={action.route}
              variant="h5"
              textTransform="capitalize"
            >
              {title}
            </SoftTypography>
          ) : (
            <SoftTypography
              component="a"
              href={action.route}
              target="_blank"
              rel="noreferrer"
              variant="h5"
              textTransform="capitalize"
            >
              {title}
            </SoftTypography>
          )}
        </SoftBox>
        {description && (
          <SoftBox mb={3} lineHeight={0}>
            <SoftTypography variant="button" fontWeight="regular" color="text">
              {description}
            </SoftTypography>
          </SoftBox>
        )}
        <SoftBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          {action.type === "internal" ? (
            <SoftButton
              component={Link}
              to={action.route}
              variant="outlined"
              size="small"
              color={action.color}
            >
              {action.label}
            </SoftButton>
          ) : (
            <SoftButton
              component="a"
              href={action.route}
              target="_blank"
              rel="noreferrer"
              variant="outlined"
              size="small"
              color={action.color}
            >
              {action.label}
            </SoftButton>
          )}
          <SoftBox display="flex">{renderAuthors}</SoftBox>
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

// Setting default values for the props of DefaultProjectCard
DefaultProjectCard.defaultProps = {
  authors: [],
};

// Typechecking props for the DefaultProjectCard
DefaultProjectCard.propTypes = {
  image: PropTypes.string,
  label: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  action: PropTypes.shape({
    type: PropTypes.oneOf(["external", "internal"]),
    route: PropTypes.string,
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "light",
      "dark",
      "white",
    ]),
    label: PropTypes.string,
  }),
  authors: PropTypes.arrayOf(PropTypes.object),
};

export default DefaultProjectCard;
