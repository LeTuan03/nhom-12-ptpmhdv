

import { useState } from "react";

// Authentication layout components
import ClientLayout from "layouts/authentication/components/ClientLayout";
import { Card, Grid } from "@mui/material";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import SoftBox from "components/SoftBox";

function DetailPlace() {


  return (
    <ClientLayout>
        <SoftBox mb={3}>
            <Card sx={{width: "100%"}}>
                <SoftBox p={2}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6} xl={3}>
                            <DefaultProjectCard
                            image={homeDecor1}
                            label="project #2"
                            title="modern"
                            description="As Uber works through a huge amount of internal management turmoil."
                            action={{
                                type: "internal",
                                route: "/pages/profile/profile-overview",
                                color: "info",
                                label: "view project",
                            }}
                            authors={[
                                { image: team1, name: "Elena Morison" },
                                { image: team2, name: "Ryan Milly" },
                                { image: team3, name: "Nick Daniel" },
                                { image: team4, name: "Peterson" },
                            ]}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} xl={3}>
                            <DefaultProjectCard
                            image={homeDecor2}
                            label="project #1"
                            title="scandinavian"
                            description="Music is something that every person has his or her own specific opinion about."
                            action={{
                                type: "internal",
                                route: "/pages/profile/profile-overview",
                                color: "info",
                                label: "view project",
                            }}
                            authors={[
                                { image: team3, name: "Nick Daniel" },
                                { image: team4, name: "Peterson" },
                                { image: team1, name: "Elena Morison" },
                                { image: team2, name: "Ryan Milly" },
                            ]}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} xl={3}>
                            <DefaultProjectCard
                            image={homeDecor3}
                            label="project #3"
                            title="minimalist"
                            description="Different people have different taste, and various types of music."
                            action={{
                                type: "internal",
                                route: "/pages/profile/profile-overview",
                                color: "info",
                                label: "view project",
                            }}
                            authors={[
                                { image: team4, name: "Peterson" },
                                { image: team3, name: "Nick Daniel" },
                                { image: team2, name: "Ryan Milly" },
                                { image: team1, name: "Elena Morison" },
                            ]}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} xl={3}>
                            <DefaultProjectCard
                            image={homeDecor3}
                            label="project #3"
                            title="minimalist"
                            description="Different people have different taste, and various types of music."
                            action={{
                                type: "internal",
                                route: "/pages/profile/profile-overview",
                                color: "info",
                                label: "view project",
                            }}
                            authors={[
                                { image: team4, name: "Peterson" },
                                { image: team3, name: "Nick Daniel" },
                                { image: team2, name: "Ryan Milly" },
                                { image: team1, name: "Elena Morison" },
                            ]}
                            />
                        </Grid>
                    </Grid>
                </SoftBox>
            </Card>
      </SoftBox>
    </ClientLayout>
  );
}

export default DetailPlace;
