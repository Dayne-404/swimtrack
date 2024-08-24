import { Paper, Box, Typography } from "@mui/material"

type WorksheetCard = {
    level: string,
    session: string,
    day: string,
    time: string,
    year: string,
    createdOn: string,
}

const WorksheetCard = ({level, session, day, time, year, createdOn}: WorksheetCard) => {
  return (
    <Paper elevation={2}>
        <Box p={2}>
            <Typography variant="h6">{level}</Typography>
            <Typography variant="body1">{session} {year}</Typography>
            <Typography variant="body1" gutterBottom>{day} {time}</Typography>
            <Typography variant="body1" color='text.secondary'>Created on: {createdOn}</Typography>
        </Box>
    </Paper>
  )
}

export default WorksheetCard