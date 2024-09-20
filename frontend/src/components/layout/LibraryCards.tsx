import { Typography, Box } from "@mui/material";
import WorksheetGrid from "./WorksheetGrid";
import { Worksheet } from "../../config/worksheetType";

interface LibraryCardsProps {
    headerText?: string;
    worksheets: Worksheet[];
}

const LibraryCards = ({headerText, worksheets}: LibraryCardsProps) => {
	return (
		<Box width="100%" alignItems='center' display='flex' flexDirection='column'>
			{headerText && <Typography variant="h6" gutterBottom>{headerText}</Typography>}
			<WorksheetGrid worksheets={worksheets} includeInstructor={false} gridSpace={4} />
		</Box>
	);
};

export default LibraryCards;
